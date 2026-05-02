import { apiFetch } from "@/services/api";
import type { ApiSuccessResponse } from "@/types/api";
import type { AdminSupplier, SuppliersActiveFilter, SuppliersVerificationFilter } from "@/types/adminViews";
import {
  mapSupplierFromApi,
  type SupplierDetails,
  type SupplierListItem,
  type SuppliersApiListResponse,
} from "@/types/adminSuppliers";
import {
  ADMIN_SUPPLIERS_FETCH_LIMIT,
  buildSuppliersQueryParams,
} from "@/lib/admin/suppliers";

// Shared service for suppliers (admin/public can reuse)

async function fetchAllPagesByFilters(params: {
  activeFilter: SuppliersActiveFilter;
  verifiedFilter: SuppliersVerificationFilter;
}) {
  const firstQuery = buildSuppliersQueryParams({
    page: 1,
    limit: ADMIN_SUPPLIERS_FETCH_LIMIT,
    activeFilter: params.activeFilter,
    verifiedFilter: params.verifiedFilter,
  });

  const firstPage = await apiFetch<SuppliersApiListResponse>(`/api/v1/suppliers?${firstQuery}`);
  let merged = [...firstPage.data];

  if (firstPage.meta.totalPages > 1) {
    for (let page = 2; page <= firstPage.meta.totalPages; page += 1) {
      const nextQuery = buildSuppliersQueryParams({
        page,
        limit: ADMIN_SUPPLIERS_FETCH_LIMIT,
        activeFilter: params.activeFilter,
        verifiedFilter: params.verifiedFilter,
      });

      const response = await apiFetch<SuppliersApiListResponse>(`/api/v1/suppliers?${nextQuery}`);
      merged = [...merged, ...response.data];
    }
  }

  return merged;
}

async function fetchSuppliersForActiveFilter(params: {
  activeFilter: SuppliersActiveFilter;
  verifiedFilter: SuppliersVerificationFilter;
}) {
  if (params.activeFilter !== "all") {
    return fetchAllPagesByFilters(params);
  }

  const [activeSuppliers, inactiveSuppliers] = await Promise.all([
    fetchAllPagesByFilters({ ...params, activeFilter: "active" }),
    fetchAllPagesByFilters({ ...params, activeFilter: "inactive" }),
  ]);

  const uniqueById = new Map<number, SupplierListItem>();
  [...activeSuppliers, ...inactiveSuppliers].forEach((item) => {
    uniqueById.set(item.id, item);
  });

  return Array.from(uniqueById.values());
}

const SuppliersService = {
  getSuppliersCollection: async (params: {
    activeFilter: SuppliersActiveFilter;
    verifiedFilter: SuppliersVerificationFilter;
  }): Promise<AdminSupplier[]> => {
    const suppliers = await fetchSuppliersForActiveFilter(params);

    const details = await Promise.allSettled(
      suppliers.map((item) => apiFetch<SupplierDetails>(`/api/v1/suppliers/${item.id}`)),
    );

    const detailsById = new Map<number, SupplierDetails>();
    details.forEach((result) => {
      if (result.status === "fulfilled") {
        detailsById.set(result.value.id, result.value);
      }
    });

    return suppliers
      .map((item) => mapSupplierFromApi(item, detailsById))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getSupplierById: async (id: number): Promise<AdminSupplier> => {
    const detail = await apiFetch<SupplierDetails>(`/api/v1/suppliers/${id}`);
    return {
      id: detail.id,
      companyName: detail.companyName,
      ruc: detail.ruc,
      representativeName: detail.representativeName,
      email: detail.email,
      phone: detail.phone,
      createdAt: detail.createdAt,
      verified: detail.verified,
      active: detail.active,
    };
  },

  activate: (id: number) =>
    apiFetch<ApiSuccessResponse<unknown>>(`/api/v1/suppliers/${id}/activate`, {
      method: "PATCH",
    }),

  deactivate: (id: number) =>
    apiFetch<ApiSuccessResponse<unknown>>(`/api/v1/suppliers/${id}/deactivate`, {
      method: "PATCH",
    }),

  approve: (id: number) =>
    apiFetch<ApiSuccessResponse<unknown>>(`/api/v1/suppliers/${id}/approve`, {
      method: "PATCH",
    }),
};

export default SuppliersService;
