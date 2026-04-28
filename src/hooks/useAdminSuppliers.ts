"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useAdminFilters } from "@/context/adminFiltersContext";
import {
  ADMIN_SUPPLIERS_PAGE_SIZE,
  filterSuppliersBySearch,
  paginateSuppliers,
} from "@/lib/admin/suppliers";
import AdminSuppliersService from "@/services/adminSuppliers.service";
import type { AdminSupplier } from "@/types/adminViews";

export function useAdminSuppliers() {
  const {
    suppliersSearch,
    suppliersVerifiedFilter,
    suppliersActiveFilter,
  } = useAdminFilters();

  const [suppliersCollection, setSuppliersCollection] = useState<AdminSupplier[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [suppliersActiveFilter, suppliersVerifiedFilter, suppliersSearch]);

  const loadSuppliers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await AdminSuppliersService.getSuppliersCollection({
        activeFilter: suppliersActiveFilter,
        verifiedFilter: suppliersVerifiedFilter,
      });

      setSuppliersCollection(response);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo cargar proveedores.");
      setSuppliersCollection([]);
    } finally {
      setLoading(false);
    }
  }, [suppliersActiveFilter, suppliersVerifiedFilter]);

  useEffect(() => {
    void loadSuppliers();
  }, [loadSuppliers]);

  const filteredSuppliers = useMemo(
    () => filterSuppliersBySearch(suppliersCollection, suppliersSearch),
    [suppliersCollection, suppliersSearch],
  );

  const paginated = useMemo(
    () => paginateSuppliers(filteredSuppliers, page, ADMIN_SUPPLIERS_PAGE_SIZE),
    [filteredSuppliers, page],
  );

  useEffect(() => {
    if (page > paginated.meta.totalPages) {
      setPage(paginated.meta.totalPages);
    }
  }, [page, paginated.meta.totalPages]);

  return {
    suppliers: paginated.data,
    meta: paginated.meta,
    page: paginated.meta.page,
    setPage,
    loading,
    error,
    refresh: loadSuppliers,
  };
}
