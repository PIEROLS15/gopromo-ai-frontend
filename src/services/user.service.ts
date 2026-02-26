import { apiFetch } from "@/services/api";
import type { ApiSuccessResponse } from "@/types/api";

export interface ChangePasswordPayload {
  password: string;
  currentPassword?: string;
}

export interface UpdateMePayload {
  fullName?: string;
  phone?: string;
  avatar?: string;
  educationalInstitution?: string;
  representativeName?: string;
  companyName?: string;
  ruc?: string;
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
};

export default UserService;
