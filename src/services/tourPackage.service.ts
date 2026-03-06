import { apiFetch } from "./api";
import { TourPackageResponse } from "@/types/tourPackage";

export const TourPackageService = {
  getAll: (page: number, limit: number) =>
    apiFetch<{
      data: TourPackageResponse[];
    }>(`/api/v1/tour-packages?page=${page}&limit=${limit}`),

  search: (keyword: string) =>
    apiFetch<TourPackageResponse[]>(
      `/api/v1/tour-packages/search?keyword=${keyword}`
    ),
};
