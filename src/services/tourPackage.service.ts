import { apiFetch } from "./api";
import { TourPackageResponse } from "@/types/tourPackage";

export const TourPackageService = {
  getFeatured: () =>
    apiFetch<{
      data: TourPackageResponse[];
      meta: any;
    }>("/api/v1/tour-packages?page=1&limit=3"),

  search: (keyword: string) =>
    apiFetch<TourPackageResponse[]>(
      `/api/v1/tour-packages/search?keyword=${keyword}`
    ),
};
