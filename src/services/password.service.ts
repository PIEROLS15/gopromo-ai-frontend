import { apiFetch } from "@/services/api";
import type { ApiSuccessResponse } from "@/types/api";

// Payload for password change
export interface ChangePasswordPayload {
  password: string;
  currentPassword?: string;
}

export const PasswordService = {
  changePassword: async (payload: ChangePasswordPayload) => {
    const body = {
      password: payload.password,
      ...(payload.currentPassword ? { currentPassword: payload.currentPassword } : {}),
    };
    return apiFetch<ApiSuccessResponse<unknown>>("/api/v1/users/me", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  },
};

export default PasswordService;
