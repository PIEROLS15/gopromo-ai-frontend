"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import PackagesCompareModal from "@/components/home/packages/packagesCompareModal";
import PackagesFilters from "@/components/home/packages/packagesFilters";
import PackagesHero from "@/components/home/packages/packagesHero";
import PackagesResults from "@/components/home/packages/packagesResults";
import { CATALOG_PAGE_SIZE, usePackagesCatalog } from "@/hooks/useTourPackages";
import { getTourPackageHref } from "@/lib/tourPackageSlug";
import { toast } from "@/hooks/use-toast";
import type { TourPackageResponse } from "@/types/tourPackage";

const PackagesView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialParams = useMemo(
    () => ({
      q: searchParams.get("q") ?? "",
      department: searchParams.get("department") ?? "all",
      province: searchParams.get("province") ?? "all",
      district: searchParams.get("district") ?? "all",
      category: searchParams.get("category") ?? "all",
      level: searchParams.get("level") ?? "all",
      min: searchParams.get("min") ? Number(searchParams.get("min")) : undefined,
      max: searchParams.get("max") ? Number(searchParams.get("max")) : undefined,
      page: searchParams.get("page") ? Number(searchParams.get("page")) : undefined,
    }),
    [searchParams]
  );

  const {
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
  } = usePackagesCatalog(initialParams);

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedDepartment !== "all" && selectedDepartmentName) params.set("department", selectedDepartmentName);
    if (selectedProvince !== "all" && selectedProvinceName) params.set("province", selectedProvinceName);
    if (selectedDistrict !== "all" && selectedDistrictName) params.set("district", selectedDistrictName);
    if (selectedCategory !== "all" && selectedCategoryName) params.set("category", selectedCategoryName);
    if (selectedLevel !== "all" && selectedLevelName) params.set("level", selectedLevelName);
    if (priceRange[0] > 0) params.set("min", String(priceRange[0]));
    if (priceRange[1] < maxPrice) params.set("max", String(priceRange[1]));
    if (currentPage > 1) params.set("page", String(currentPage));

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (nextQuery !== currentQuery) {
      router.replace(nextQuery ? `/packages?${nextQuery}` : "/packages", { scroll: false });
    }
  }, [
    currentPage,
    maxPrice,
    priceRange,
    router,
    searchParams,
    searchQuery,
    selectedCategory,
    selectedCategoryName,
    selectedDepartment,
    selectedDepartmentName,
    selectedDistrict,
    selectedDistrictName,
    selectedLevel,
    selectedLevelName,
    selectedProvince,
    selectedProvinceName,
  ]);

  const [compareMode, setCompareMode] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareSelected, setCompareSelected] = useState<TourPackageResponse[]>([]);

  const handleViewDetails = (pkg: TourPackageResponse) => {
    router.push(getTourPackageHref(pkg));
  };

  const handleToggleCompare = (pkg: TourPackageResponse) => {
    if (compareSelected.some((item) => item.id === pkg.id)) {
      setCompareSelected((prev) => prev.filter((item) => item.id !== pkg.id));
      return;
    }

    if (compareSelected.length >= 2) {
      toast({ title: "Solo puedes comparar 2 paquetes", variant: "destructive" });
      return;
    }

    setCompareSelected((prev) => [...prev, pkg]);
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <main className="pt-20">
        <PackagesHero />

        <PackagesFilters
          showFilters={showFilters}
          compareMode={compareMode}
          searchQuery={searchQuery}
          selectedDepartment={selectedDepartment}
          selectedProvince={selectedProvince}
          selectedDistrict={selectedDistrict}
          selectedCategory={selectedCategory}
          selectedLevel={selectedLevel}
          priceRange={priceRange}
          maxPrice={maxPrice}
          departments={departments}
          provinces={provinces}
          districts={districts}
          categories={categories}
          educationLevels={educationLevels}
          hasActiveFilters={hasActiveFilters}
          onToggleFilters={() => setShowFilters((prev) => !prev)}
          onToggleCompareMode={() => {
            setCompareMode((prev) => {
              const next = !prev;
              if (!next) {
                setCompareSelected([]);
                setShowCompareModal(false);
              }
              return next;
            });
          }}
          onSearchQueryChange={(value) => {
            setSearchQuery(value);
            setCurrentPage(1);
          }}
          onDepartmentChange={handleDepartmentChange}
          onProvinceChange={handleProvinceChange}
          onDistrictChange={(value) => {
            setSelectedDistrict(value);
            setCurrentPage(1);
          }}
          onCategoryChange={(value) => {
            setSelectedCategory(value);
            setCurrentPage(1);
          }}
          onLevelChange={(value) => {
            setSelectedLevel(value);
            setCurrentPage(1);
          }}
          onPriceRangeChange={(value) => {
            setPriceRange(value);
            setCurrentPage(1);
          }}
          onClearFilters={clearFilters}
        />

        <PackagesResults
          isLoading={isLoading}
          loadError={loadError}
          filteredCount={filteredPackages.length}
          packages={visiblePackages}
          compareMode={compareMode}
          compareSelected={compareSelected}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={CATALOG_PAGE_SIZE}
          onRetry={() => window.location.reload()}
          onViewDetails={handleViewDetails}
          onToggleCompare={handleToggleCompare}
          onOpenCompare={() => setShowCompareModal(true)}
          onFirstPage={() => setCurrentPage(1)}
          onPrevPage={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          onNextPage={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
          onLastPage={() => setCurrentPage(totalPages)}
        />
      </main>

      <PackagesCompareModal
        open={showCompareModal}
        packages={compareSelected}
        onOpenChange={setShowCompareModal}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
};

export default PackagesView;
