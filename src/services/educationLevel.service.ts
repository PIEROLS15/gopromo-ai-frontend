import { apiFetch } from "@/services/api";
import type { EducationLevel, EducationLevelListResponse } from "@/types/educationLevel";

export const EducationLevelService = {
  getAll: (page: number, limit: number) =>
    apiFetch<EducationLevelListResponse>(`/api/v1/education-levels?page=${page}&limit=${limit}`),

  getAllPages: async (limit: number = 100): Promise<EducationLevel[]> => {
    const first = await EducationLevelService.getAll(1, limit);
    let merged = [...first.data];

    if (first.meta.totalPages > 1) {
      for (let page = 2; page <= first.meta.totalPages; page += 1) {
        const response = await EducationLevelService.getAll(page, limit);
        merged = [...merged, ...response.data];
      }
    }

    return merged;
  },
};
