import { apiFetch } from "@/services/api";
import type { ApiSuccessResponse } from "@/types/api";

export const UserService = {
  updateMe: (
    payload: {
      fullName?: string;
      phone?: string;
      avatar?: string;
      educationalInstitution?: string;
      representativeName?: string;
      companyName?: string;
      ruc?: string;
    }
  ) => apiFetch<ApiSuccessResponse<unknown>>("/api/v1/users/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  }),
};

export default UserService;
