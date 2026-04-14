import { apiFetch } from "@/services/api";
import type { CategoryPackage, CategoryPackageListResponse } from "@/types/categoryPackage";

export const CategoryPackageService = {
  getAll: (page: number, limit: number) =>
    apiFetch<CategoryPackageListResponse>(`/api/v1/category-packages?page=${page}&limit=${limit}`),

  getAllPages: async (limit: number = 100): Promise<CategoryPackage[]> => {
    const first = await CategoryPackageService.getAll(1, limit);
    let merged = [...first.data];

    if (first.meta.totalPages > 1) {
      for (let page = 2; page <= first.meta.totalPages; page += 1) {
        const response = await CategoryPackageService.getAll(page, limit);
        merged = [...merged, ...response.data];
      }
    }

    return merged;
  },
};
