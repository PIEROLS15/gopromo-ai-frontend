import { apiFetch } from "@/services/api";
import type { Department, District, Province } from "@/types/location";

export const LocationsService = {
  getDepartments: () => apiFetch<Department[]>("/api/v1/locations/departments"),

  getProvincesByDepartment: (departmentId: number) =>
    apiFetch<Province[]>(`/api/v1/locations/departments/${departmentId}/provinces`),

  getDistrictsByProvince: (provinceId: number) =>
    apiFetch<District[]>(`/api/v1/locations/provinces/${provinceId}/districts`),
};
