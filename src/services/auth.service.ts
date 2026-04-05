import { apiFetch } from "@/services/api";
import type { ApiSuccessResponse } from "@/types/api";
import type { LoginResponse } from "@/types/login";

export const AuthService = {
  me: () => apiFetch<ApiSuccessResponse<LoginResponse>>("/api/v1/auth/me"),
  logout: () =>
    apiFetch<{ status: "success"; message: string }>("/api/v1/auth/logout", {
      method: "POST",
    }),
};
