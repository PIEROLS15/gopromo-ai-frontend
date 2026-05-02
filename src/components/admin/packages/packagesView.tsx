"use client";

import PackageDeleteDialog from "@/components/admin/packages/packageDeleteDialog";
import PackageDetailsDialog from "@/components/admin/packages/packageDetailsDialog";
import PackagesFilters from "@/components/admin/packages/packagesFilters";
import PackagesTable from "@/components/admin/packages/packagesTable";
import { useAdminFilters } from "@/context/adminFiltersContext";
import { useAdminPackageActions } from "@/hooks/useAdminPackageActions";
import { useAdminPackages } from "@/hooks/useAdminPackages";

const PackagesView = () => {
  const { packages, meta, page, setPage, loading, error, refresh, zoneOptions } = useAdminPackages();
  const {
    packagesSearch,
    setPackagesSearch,
    packagesActiveFilter,
    setPackagesActiveFilter,
    packagesDepartmentFilter,
    setPackagesDepartmentFilter,
    packagesProvinceFilter,
    setPackagesProvinceFilter,
    packagesDistrictFilter,
    setPackagesDistrictFilter,
  } = useAdminFilters();

  const {
    detailsOpen,
    setDetailsOpen,
    detailsLoading,
    selectedPackage,
    deleteOpen,
    setDeleteOpen,
    deletingPackage,
    actionLoadingId,
    handleOpenDetails,
    handleActivateToggle,
    requestDeletePackage,
    handleDeletePackage,
  } = useAdminPackageActions({ refresh });

  return (
    <div className="space-y-4">
      <PackagesFilters
        packagesSearch={packagesSearch}
        onPackagesSearchChange={setPackagesSearch}
        activeFilter={packagesActiveFilter}
        onActiveFilterChange={setPackagesActiveFilter}
        departmentFilter={packagesDepartmentFilter}
        onDepartmentFilterChange={(value) => {
          setPackagesDepartmentFilter(value);
          setPackagesProvinceFilter("all");
          setPackagesDistrictFilter("all");
        }}
        provinceFilter={packagesProvinceFilter}
        onProvinceFilterChange={(value) => {
          setPackagesProvinceFilter(value);
          setPackagesDistrictFilter("all");
        }}
        districtFilter={packagesDistrictFilter}
        onDistrictFilterChange={setPackagesDistrictFilter}
        departmentOptions={zoneOptions.departments}
        provinceOptions={zoneOptions.provinces}
        districtOptions={zoneOptions.districts}
      />

      <PackagesTable
        packages={packages}
        meta={meta}
        page={page}
        loading={loading}
        error={error}
        actionLoadingId={actionLoadingId}
        onRetry={() => void refresh()}
        onFirstPage={() => setPage(1)}
        onPrevPage={() => setPage((current) => Math.max(1, current - 1))}
        onNextPage={() => setPage((current) => Math.min(meta.totalPages || 1, current + 1))}
        onLastPage={() => setPage(meta.totalPages || 1)}
        onViewDetails={(packageId) => void handleOpenDetails(packageId)}
        onToggleActive={(pkg) => void handleActivateToggle(pkg)}
        onDelete={(pkg) => requestDeletePackage(pkg)}
      />

      <PackageDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        loading={detailsLoading}
        pkg={selectedPackage}
      />

      <PackageDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        pkg={deletingPackage}
        deleting={Boolean(actionLoadingId)}
        onConfirm={() => void handleDeletePackage()}
      />
    </div>
  );
};

export default PackagesView;
