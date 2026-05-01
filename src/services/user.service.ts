import { apiFetch } from "@/services/api";
import type { ApiSuccessResponse } from "@/types/api";
import type { UpdateMePayload } from "@/types/login";
import type { ChangePasswordPayload } from "@/types/user";
import {
  mapUserFromApi,
  type UpdateUserPayload,
  type UserDetails,
  type UsersApiListResponse,
} from "@/types/adminUsers";
import { ADMIN_USERS_FETCH_LIMIT, normalizeAdminRoleName } from "@/lib/admin/users";
import type { AdminUserRow } from "@/types/adminViews";

async function fetchAllUsersPages(limit: number) {
  const firstPage = await apiFetch<UsersApiListResponse>(`/api/v1/users?page=1&limit=${limit}`);

  let merged = [...firstPage.data];

  if (firstPage.meta.totalPages > 1) {
    for (let page = 2; page <= firstPage.meta.totalPages; page += 1) {
      const response = await apiFetch<UsersApiListResponse>(`/api/v1/users?page=${page}&limit=${limit}`);
      merged = [...merged, ...response.data];
    }
  }

  return merged;
}

export const UserService = {
  updateMe: (
    payload: UpdateMePayload
  ) => apiFetch<ApiSuccessResponse<unknown>>("/api/v1/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  }),
  changePassword: (payload: ChangePasswordPayload) => apiFetch<ApiSuccessResponse<unknown>>(
    "/api/v1/users/me",
    {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: payload.password,
        ...(payload.currentPassword ? { currentPassword: payload.currentPassword } : {}),
      }),
    }
  ),

  getUsers: (page: number, limit: number) =>
    apiFetch<UsersApiListResponse>(`/api/v1/users?page=${page}&limit=${limit}`),

  getUsersCollection: async (limit: number = ADMIN_USERS_FETCH_LIMIT): Promise<AdminUserRow[]> => {
    const users = await fetchAllUsersPages(limit);
    return users
      .map((user) => mapUserFromApi(user, normalizeAdminRoleName(user.role.name)))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  getById: (id: number) => apiFetch<UserDetails>(`/api/v1/users/${id}`),

  updateById: (id: number, payload: UpdateUserPayload) =>
    apiFetch<ApiSuccessResponse<unknown>>(`/api/v1/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  removeById: (id: number) =>
    apiFetch<ApiSuccessResponse<unknown>>(`/api/v1/users/${id}`, {
      method: "DELETE",
    }),
};

export default UserService;
