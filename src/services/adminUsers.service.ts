import { apiFetch } from "@/services/api";
import {
  ADMIN_USERS_FETCH_LIMIT,
  normalizeAdminRoleName,
} from "@/lib/admin/users";
import {
  mapUserFromApi,
  type UpdateUserPayload,
  type UserDetails,
  type UsersApiListResponse,
} from "@/types/adminUsers";
import type { ApiSuccessResponse } from "@/types/api";
import type { AdminUserRow } from "@/types/adminViews";

async function fetchAllUsersPages() {
  const firstPage = await apiFetch<UsersApiListResponse>(
    `/api/v1/users?page=1&limit=${ADMIN_USERS_FETCH_LIMIT}`,
  );

  let merged = [...firstPage.data];

  if (firstPage.meta.totalPages > 1) {
    for (let page = 2; page <= firstPage.meta.totalPages; page += 1) {
      const response = await apiFetch<UsersApiListResponse>(
        `/api/v1/users?page=${page}&limit=${ADMIN_USERS_FETCH_LIMIT}`,
      );

      merged = [...merged, ...response.data];
    }
  }

  return merged;
}

const AdminUsersService = {
  getUsersCollection: async (): Promise<AdminUserRow[]> => {
    const users = await fetchAllUsersPages();

    return users
      .map((user) => mapUserFromApi(user, normalizeAdminRoleName(user.role.name)))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  getUserById: async (id: number): Promise<UserDetails> => {
    return apiFetch<UserDetails>(`/api/v1/users/${id}`);
  },
  deleteUser: (id: number) =>
    apiFetch<ApiSuccessResponse<unknown>>(`/api/v1/users/${id}`, {
      method: "DELETE",
    }),
  updateUser: (id: number, payload: UpdateUserPayload) =>
    apiFetch<ApiSuccessResponse<unknown>>(`/api/v1/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};

export default AdminUsersService;
