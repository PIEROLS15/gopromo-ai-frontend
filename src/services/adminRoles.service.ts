import { apiFetch } from "@/services/api";
import type { RoleItem, RolesApiListResponse } from "@/types/adminRoles";

const PAGE_LIMIT = 100;

const AdminRolesService = {
  getRolesCollection: async (): Promise<RoleItem[]> => {
    const firstPage = await apiFetch<RolesApiListResponse>(`/api/v1/roles?page=1&limit=${PAGE_LIMIT}`);
    let roles = [...firstPage.data];

    if (firstPage.meta.totalPages > 1) {
      for (let page = 2; page <= firstPage.meta.totalPages; page += 1) {
        const response = await apiFetch<RolesApiListResponse>(`/api/v1/roles?page=${page}&limit=${PAGE_LIMIT}`);
        roles = [...roles, ...response.data];
      }
    }

    return roles;
  },
};

export default AdminRolesService;
