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

export const TourPackageService = {
  getAll: (page: number, limit: number) =>
    apiFetch<TourPackageListResponse>(
      `/api/v1/tour-packages?page=${page}&limit=${limit}`
    ),

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
