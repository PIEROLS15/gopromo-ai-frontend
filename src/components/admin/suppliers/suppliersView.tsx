"use client";

import SupplierDetailsDialog from "@/components/admin/suppliers/supplierDetailsDialog";
import SuppliersFilters from "@/components/admin/suppliers/suppliersFilters";
import SuppliersTable from "@/components/admin/suppliers/suppliersTable";
import { useAdminFilters } from "@/context/adminFiltersContext";
import { useAdminSupplierActions } from "@/hooks/useAdminSupplierActions";
import { useAdminSuppliers } from "@/hooks/useAdminSuppliers";

const SuppliersView = () => {
  const { suppliers, meta, page, setPage, loading, error, refresh } = useAdminSuppliers();
  const {
    suppliersSearch,
    setSuppliersSearch,
    suppliersVerifiedFilter,
    setSuppliersVerifiedFilter,
    suppliersActiveFilter,
    setSuppliersActiveFilter,
  } = useAdminFilters();
  const {
    detailsOpen,
    setDetailsOpen,
    detailsLoading,
    selectedSupplier,
    actionLoadingId,
    handleOpenDetails,
    handleActivateToggle,
    handleApprove,
  } = useAdminSupplierActions({ refresh });

  return (
    <div className="space-y-4">
      <SuppliersFilters
        suppliersSearch={suppliersSearch}
        onSuppliersSearchChange={setSuppliersSearch}
        verifiedFilter={suppliersVerifiedFilter}
        onVerifiedFilterChange={setSuppliersVerifiedFilter}
        activeFilter={suppliersActiveFilter}
        onActiveFilterChange={setSuppliersActiveFilter}
      />

      <SuppliersTable
        suppliers={suppliers}
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
        onViewDetails={(supplierId) => void handleOpenDetails(supplierId)}
        onApprove={(supplier) => void handleApprove(supplier)}
        onToggleActive={(supplier) => void handleActivateToggle(supplier)}
      />

      <SupplierDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        loading={detailsLoading}
        supplier={selectedSupplier}
      />
    </div>
  );
};

export default SuppliersView;
