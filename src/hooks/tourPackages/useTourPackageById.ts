"use client";

import { useEffect, useState } from "react";

import { toTourPackageSlug } from "@/lib/tourPackageSlug";
import { TourPackageService } from "@/services/tourPackage.service";
import type { TourPackageResponse } from "@/types/tourPackage";

export function useTourPackageById(routeParam?: string | number) {
  const [pkg, setPkg] = useState<TourPackageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPackage = async () => {
      if (routeParam === undefined || routeParam === null || routeParam === "") {
        setLoading(false);
        setError(true);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        let resolvedId: number | null = null;

        const value = String(routeParam);
        const numericId = Number(value);

        if (!Number.isNaN(numericId) && Number.isInteger(numericId) && numericId > 0) {
          resolvedId = numericId;
        } else {
          const allPackages = await TourPackageService.getAllPages(100);
          const slugParam = decodeURIComponent(value).toLowerCase();
          const match = allPackages.find(
            (item) => toTourPackageSlug(item.name) === slugParam
          );
          resolvedId = match?.id ?? null;
        }

        if (!resolvedId) {
          setError(true);
          setLoading(false);
          return;
        }

        const data = await TourPackageService.getById(resolvedId);
        setPkg(data);
      } catch (fetchError) {
        console.error("Error loading package detail:", fetchError);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [routeParam]);

  return { pkg, loading, error };
}
