import { apiFetch } from "./api";
import {
  PublicRegisterPayload,
  PublicRegisterResponse,
  ProviderRegisterPayload,
  SupplierRegisterResponse,
} from "@/types/register";
import { ApiSuccessResponse } from "@/types/api";

export const RegisterService = {
  registerPublic: (payload: Omit<PublicRegisterPayload, "roleId">) =>
    apiFetch<ApiSuccessResponse<PublicRegisterResponse>>(
      "/api/v1/auth/register-general",
      {
        method: "POST",
        body: JSON.stringify({
          ...payload,
        }),
      }
    ),

  registerProvider: (
    payload: Omit<ProviderRegisterPayload, "roleId">
  ) =>
    apiFetch<ApiSuccessResponse<SupplierRegisterResponse>>(
      "/api/v1/auth/register-supplier",
      {
        method: "POST",
        body: JSON.stringify({
          ...payload,
        }),
      }
    ),
};
