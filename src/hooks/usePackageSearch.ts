"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { TourPackageService } from "@/services/tourPackage.service";
import type { TourPackageResponse } from "@/types/tourPackage";
import type { PackageSuggestion } from "@/types/search";

const normalizeText = (value?: string): string => {
  if (!value) return "";
  const text = String(value);
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const mapToSuggestion = (pkg: TourPackageResponse): PackageSuggestion => {
  const department = normalizeText(pkg.district?.province?.department?.name);
  const province = normalizeText(pkg.district?.province?.name);
  const district = normalizeText(pkg.district?.name);

  return {
    id: pkg.id,
    title: pkg.name,
    destination: [department, province, district].filter(Boolean).join(", "),
    price: pkg.pricePersona,
    duration: `${pkg.days ?? 0} dias`,
    image: pkg.images?.[0]?.url || "/placeholder.svg",
  };
};

export const usePackageSearch = (
  onSearchActiveChange?: (isActive: boolean) => void
) => {
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<PackageSuggestion[]>([]);

  const isSearchActive = searchQuery.trim().length > 0 || showSuggestions;

  useEffect(() => {
    onSearchActiveChange?.(isSearchActive);
  }, [isSearchActive, onSearchActiveChange]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const response = await TourPackageService.search(searchQuery);
        setSuggestions(response.map(mapToSuggestion));
        setShowSuggestions(true);
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 400);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (pkg: PackageSuggestion) => {
    router.push(`/paquete/${pkg.id}`);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/paquetes?q=${encodeURIComponent(searchQuery)}`);
      return;
    }

    router.push("/paquetes");
  };

  const handleInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return {
    searchRef,
    searchQuery,
    setSearchQuery,
    showSuggestions,
    setShowSuggestions,
    suggestions,
    handleSearch,
    handleSelectSuggestion,
    handleInputKeyDown,
  };
};
