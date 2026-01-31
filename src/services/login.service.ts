import { apiFetch } from "@/services/api";
import { LoginPayload, LoginResponse } from "@/types/login";
import { ApiSuccessResponse } from "@/types/api";

export const LoginService = {
  login: (payload: LoginPayload) =>
    apiFetch<ApiSuccessResponse<LoginResponse>>("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
