import { apiFetch } from "./api";
import { ApiSuccessResponse } from "@/types/api";

/* ===== TYPES ===== */

export interface User {
  id: number;
  email: string;
  fullName?: string;
  representativeName?: string;
  companyName?: string;
  phone?: string;
  role: {
    id: number;
    name: "USER" | "SUPPLIER";
  };
}

/* ===== PAYLOADS ===== */

export interface RegisterPublicPayload {
  email: string;
  fullName: string;
  educationalInstitution?: string | null;
  phone?: string | null;
  password: string;
}

export interface RegisterProviderPayload {
  email: string;
  ruc: string;
  representativeName: string;
  companyName: string;
  phone?: string;
  password: string;
}

/* ===== SERVICE ===== */

export const AuthService = {
  registerPublic: (payload: RegisterPublicPayload) =>
    apiFetch<ApiSuccessResponse<{ user: User }>>(
      "/api/v1/auth/register-general",
      {
        method: "POST",
        body: JSON.stringify(payload),
        credentials: "include", // 🔥 CRÍTICO
      }
    ),

  registerProvider: (payload: RegisterProviderPayload) =>
    apiFetch<ApiSuccessResponse<{ supplier: User }>>(
      "/api/v1/auth/register-supplier",
      {
        method: "POST",
        body: JSON.stringify(payload),
        credentials: "include",
      }
    ),

  me: () =>
    apiFetch<ApiSuccessResponse<{ user: User }>>(
      "/api/v1/auth/me",
      {
        credentials: "include",
      }
    ),

  logout: () =>
    apiFetch("/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    }),
};
