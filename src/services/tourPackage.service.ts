import { apiFetch } from "./api";
import {
  TourPackageCreateRequest,
  TourPackageListResponse,
  TourPackageMutationResponse,
  TourPackageResponse,
  TourPackageStatusResponse,
  TourPackageUpdateRequest,
  UpdateTourPackageData,
} from "@/types/tourPackage";

function buildTourPackagesQuery(params: { page: number; limit: number; active?: boolean }) {
  const query = new URLSearchParams();
  query.set("page", String(params.page));
  query.set("limit", String(params.limit));

  if (typeof params.active === "boolean") {
    query.set("active", String(params.active));
  }

  return query.toString();
}

export const TourPackageService = {
  getAll: (page: number, limit: number, active?: boolean) =>
    apiFetch<TourPackageListResponse>(`/api/v1/tour-packages?${buildTourPackagesQuery({ page, limit, active })}`),

  getAllPages: async (limit: number = 50, active?: boolean) => {
    const firstPage = await apiFetch<TourPackageListResponse>(`/api/v1/tour-packages?${buildTourPackagesQuery({ page: 1, limit, active })}`);

    let merged = [...firstPage.data];

    if (firstPage.meta.totalPages > 1) {
      for (let page = 2; page <= firstPage.meta.totalPages; page += 1) {
        const response = await apiFetch<TourPackageListResponse>(`/api/v1/tour-packages?${buildTourPackagesQuery({ page, limit, active })}`);
        merged = [...merged, ...response.data];
      }
    }

    return merged;
  },

  getById: (id: number) => apiFetch<TourPackageResponse>(`/api/v1/tour-packages/${id}`),

  search: (keyword: string) =>
    apiFetch<TourPackageResponse[]>(
      `/api/v1/tour-packages/search?keyword=${keyword}`
    ),

  create: (payload: TourPackageCreateRequest) =>
    apiFetch<TourPackageMutationResponse<TourPackageResponse>>(
      `/api/v1/tour-packages`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    ),

  update: (id: number, payload: TourPackageUpdateRequest) =>
    apiFetch<TourPackageMutationResponse<UpdateTourPackageData>>(
      `/api/v1/tour-packages/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    ),

  activate: (id: number) =>
    apiFetch<TourPackageStatusResponse>(`/api/v1/tour-packages/${id}/activate`, {
      method: "PATCH",
    }),

  deactivate: (id: number) =>
    apiFetch<TourPackageStatusResponse>(
      `/api/v1/tour-packages/${id}/deactivate`,
      {
        method: "PATCH",
      }
    ),

  remove: (id: number) =>
    apiFetch<TourPackageStatusResponse>(`/api/v1/tour-packages/${id}`, {
      method: "DELETE",
    }),
};
