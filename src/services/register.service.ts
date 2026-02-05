import { apiFetch } from "./api";
import {
  PublicRegisterPayload,
  ProviderRegisterPayload,
} from "@/types/register";
import { ApiSuccessResponse } from "@/types/api";

export const RegisterService = {
  registerPublic: (payload: Omit<PublicRegisterPayload, "roleId">) =>
    apiFetch<ApiSuccessResponse<any>>("/api/v1/auth/register-general", {
      method: "POST",
      body: JSON.stringify({
        ...payload,
      }),
    }),

  registerProvider: (
    payload: Omit<ProviderRegisterPayload, "roleId">
  ) =>
    apiFetch<ApiSuccessResponse<any>>(
      "/api/v1/auth/register-supplier",
      {
        method: "POST",
        body: JSON.stringify({
          ...payload,
        }),
      }
    ),
};
