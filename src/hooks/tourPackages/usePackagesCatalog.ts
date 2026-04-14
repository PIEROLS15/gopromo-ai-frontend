"use client";

import { useEffect, useMemo, useState } from "react";

import { useCategoryPackages } from "@/hooks/useCategoryPackages";
import { useEducationLevels } from "@/hooks/useEducationLevels";
import { useLocations } from "@/hooks/useLocations";
import { CATALOG_PAGE_SIZE, getPackageDestination } from "@/hooks/tourPackages/shared";
import { capitalize, normalize } from "@/lib/text";
import { isNumeric } from "@/lib/validators";
import { TourPackageService } from "@/services/tourPackage.service";
import type { LocationOption } from "@/types/packageCatalog";
import type { TourPackageCatalogParams } from "@/types/tourPackageFilters";
import type { TourPackageResponse } from "@/types/tourPackage";

export function usePackagesCatalog(initialParams: TourPackageCatalogParams = {}) {
  const hasInitialPriceRange =
    typeof initialParams.min === "number" || typeof initialParams.max === "number";

  const [allPackages, setAllPackages] = useState<TourPackageResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [searchQuery, setSearchQuery] = useState(initialParams.q ?? "");
  const [selectedDepartment, setSelectedDepartment] = useState(initialParams.department ?? "all");
  const [selectedProvince, setSelectedProvince] = useState(initialParams.province ?? "all");
  const [selectedDistrict, setSelectedDistrict] = useState(initialParams.district ?? "all");
  const [selectedCategory, setSelectedCategory] = useState(initialParams.category ?? "all");
  const [selectedLevel, setSelectedLevel] = useState(initialParams.level ?? "all");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Math.max(0, initialParams.min ?? 0),
    Math.max(0, initialParams.max ?? 5000),
  ]);
  const [showFilters, setShowFilters] = useState(Boolean(initialParams.q));
  const [currentPage, setCurrentPage] = useState(
    initialParams.page && initialParams.page > 0 ? initialParams.page : 1
  );

  const [didInitPriceRange, setDidInitPriceRange] = useState(hasInitialPriceRange);

  const selectedDepartmentId = selectedDepartment !== "all" ? Number(selectedDepartment) : null;
  const selectedProvinceId = selectedProvince !== "all" ? Number(selectedProvince) : null;

  const {
    departments: allDepartments,
    provinces: allProvinces,
    districts: allDistricts,
  } = useLocations(selectedDepartmentId, selectedProvinceId);

  const { categories } = useCategoryPackages();
  const { educationLevels } = useEducationLevels();

  useEffect(() => {
    if (selectedDepartment === "all") return;
    if (isNumeric(selectedDepartment) && allDepartments.some((item) => String(item.id) === selectedDepartment)) {
      return;
    }

    const match = allDepartments.find((item) => normalize(item.name) === normalize(selectedDepartment));
    if (match) {
      setSelectedDepartment(String(match.id));
    }
  }, [allDepartments, selectedDepartment]);

  useEffect(() => {
    if (selectedProvince === "all") return;
    if (isNumeric(selectedProvince) && allProvinces.some((item) => String(item.id) === selectedProvince)) {
      return;
    }

    const match = allProvinces.find((item) => normalize(item.name) === normalize(selectedProvince));
    if (match) {
      setSelectedProvince(String(match.id));
    }
  }, [allProvinces, selectedProvince]);

  useEffect(() => {
    if (selectedDistrict === "all") return;
    if (isNumeric(selectedDistrict) && allDistricts.some((item) => String(item.id) === selectedDistrict)) {
      return;
    }

    const match = allDistricts.find((item) => normalize(item.name) === normalize(selectedDistrict));
    if (match) {
      setSelectedDistrict(String(match.id));
    }
  }, [allDistricts, selectedDistrict]);

  useEffect(() => {
    const fetchAllPackages = async () => {
      setIsLoading(true);
      setLoadError(false);

      try {
        const data = await TourPackageService.getAllPages(50);
        setAllPackages(data);
      } catch (error) {
        console.error("Error loading packages:", error);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPackages();
  }, []);

  const maxPrice = useMemo(() => {
    const maxFromData = Math.max(...allPackages.map((pkg) => Number(pkg.pricePersona) || 0), 0);
    return Math.max(maxFromData, 5000);
  }, [allPackages]);

  useEffect(() => {
    if (!didInitPriceRange && !isLoading) {
      setPriceRange([0, maxPrice]);
      setDidInitPriceRange(true);
    }
  }, [didInitPriceRange, isLoading, maxPrice]);

  const departments = useMemo<LocationOption[]>(
    () => allDepartments.map((department) => ({ value: String(department.id), label: department.name })),
    [allDepartments]
  );

  const provinces = useMemo<LocationOption[]>(
    () => allProvinces.map((province) => ({ value: String(province.id), label: province.name })),
    [allProvinces]
  );

  const districts = useMemo<LocationOption[]>(
    () => allDistricts.map((district) => ({ value: String(district.id), label: district.name })),
    [allDistricts]
  );

  const selectedDepartmentName = useMemo(
    () =>
      allDepartments.find(
        (item) =>
          String(item.id) === selectedDepartment ||
          normalize(item.name) === normalize(selectedDepartment)
      )?.name ?? null,
    [allDepartments, selectedDepartment]
  );

  const selectedProvinceName = useMemo(
    () =>
      allProvinces.find(
        (item) =>
          String(item.id) === selectedProvince || normalize(item.name) === normalize(selectedProvince)
      )?.name ?? null,
    [allProvinces, selectedProvince]
  );

  const selectedDistrictName = useMemo(
    () =>
      allDistricts.find(
        (item) =>
          String(item.id) === selectedDistrict || normalize(item.name) === normalize(selectedDistrict)
      )?.name ?? null,
    [allDistricts, selectedDistrict]
  );

  const selectedCategoryName = useMemo(
    () =>
      categories.find(
        (item) =>
          String(item.id) === selectedCategory || normalize(item.name) === normalize(selectedCategory)
      )?.name ?? null,
    [categories, selectedCategory]
  );

  const selectedLevelName = useMemo(
    () =>
      educationLevels.find(
        (item) =>
          String(item.id) === selectedLevel || normalize(item.name) === normalize(selectedLevel)
      )?.name ?? null,
    [educationLevels, selectedLevel]
  );

  useEffect(() => {
    if (selectedCategory === "all") return;
    if (isNumeric(selectedCategory) && categories.some((item) => String(item.id) === selectedCategory)) {
      return;
    }

    const match = categories.find((item) => normalize(item.name) === normalize(selectedCategory));
    if (match) {
      setSelectedCategory(String(match.id));
    }
  }, [categories, selectedCategory]);

  useEffect(() => {
    if (selectedLevel === "all") return;
    if (isNumeric(selectedLevel) && educationLevels.some((item) => String(item.id) === selectedLevel)) {
      return;
    }

    const match = educationLevels.find((item) => normalize(item.name) === normalize(selectedLevel));
    if (match) {
      setSelectedLevel(String(match.id));
    }
  }, [educationLevels, selectedLevel]);

  const filteredPackages = useMemo(() => {
    const query = normalize(searchQuery.trim());

    return allPackages.filter((pkg) => {
      const department = capitalize(pkg.district?.province?.department?.name);
      const province = capitalize(pkg.district?.province?.name);
      const district = capitalize(pkg.district?.name);
      const pkgPrice = Number(pkg.pricePersona) || 0;

      const matchQuery =
        !query ||
        normalize(pkg.name).includes(query) ||
        normalize(pkg.description).includes(query) ||
        normalize(getPackageDestination(pkg)).includes(query);

      const matchDepartment =
        !selectedDepartmentName || normalize(department) === normalize(selectedDepartmentName);
      const matchProvince =
        !selectedProvinceName || normalize(province) === normalize(selectedProvinceName);
      const matchDistrict =
        !selectedDistrictName || normalize(district) === normalize(selectedDistrictName);
      const matchCategory =
        selectedCategory === "all" ||
        String(pkg.category?.id) === selectedCategory ||
        normalize(pkg.category?.name) === normalize(selectedCategory);
      const matchLevel =
        selectedLevel === "all" ||
        String(pkg.educationLevel?.id) === selectedLevel ||
        normalize(pkg.educationLevel?.name) === normalize(selectedLevel);
      const matchPrice = pkgPrice >= priceRange[0] && pkgPrice <= priceRange[1];

      return (
        matchQuery &&
        matchDepartment &&
        matchProvince &&
        matchDistrict &&
        matchCategory &&
        matchLevel &&
        matchPrice
      );
    });
  }, [
    allPackages,
    priceRange,
    searchQuery,
    selectedCategory,
    selectedDepartmentName,
    selectedDistrictName,
    selectedLevel,
    selectedProvinceName,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredPackages.length / CATALOG_PAGE_SIZE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const visiblePackages = useMemo(() => {
    const start = (currentPage - 1) * CATALOG_PAGE_SIZE;
    return filteredPackages.slice(start, start + CATALOG_PAGE_SIZE);
  }, [currentPage, filteredPackages]);

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    selectedDepartment !== "all" ||
    selectedProvince !== "all" ||
    selectedDistrict !== "all" ||
    selectedCategory !== "all" ||
    selectedLevel !== "all" ||
    priceRange[0] > 0 ||
    priceRange[1] < maxPrice;

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedDepartment("all");
    setSelectedProvince("all");
    setSelectedDistrict("all");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setPriceRange([0, maxPrice]);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    setSelectedProvince("all");
    setSelectedDistrict("all");
    setCurrentPage(1);
  };

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedDistrict("all");
    setCurrentPage(1);
  };

  return {
    isLoading,
    loadError,
    showFilters,
    setShowFilters,
    searchQuery,
    setSearchQuery,
    selectedDepartment,
    selectedProvince,
    selectedDistrict,
    selectedCategory,
    selectedLevel,
    priceRange,
    maxPrice,
    setSelectedDistrict,
    setSelectedCategory,
    setSelectedLevel,
    setPriceRange,
    departments,
    provinces,
    districts,
    categories,
    educationLevels,
    selectedDepartmentName,
    selectedProvinceName,
    selectedDistrictName,
    selectedCategoryName,
    selectedLevelName,
    hasActiveFilters,
    clearFilters,
    handleDepartmentChange,
    handleProvinceChange,
    filteredPackages,
    visiblePackages,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
