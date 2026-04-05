import { apiFetch } from "./api";
import { Contact, CreateContactPayload } from "@/types/contact";
import { ApiSuccessResponse } from "@/types/api";

export const ContactService = {
  create: (payload: CreateContactPayload) =>
    apiFetch<ApiSuccessResponse<Contact>>("/api/v1/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getAll: () => apiFetch<Contact[]>("/api/v1/contact"),

  getById: (id: number) => apiFetch<Contact[]>(`/api/v1/contact/${id}`),
};
