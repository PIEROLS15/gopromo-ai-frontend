import type { AdminUserRow } from "@/types/adminViews";

export type UserListItem = {
  id: number;
  email: string;
  fullName: string;
  phone: string | null;
  educationalInstitution: string | null;
  role: {
    name: string;
  };
  createdAt: string;
};

export type UsersApiListResponse = {
  data: UserListItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type UserDetails = {
  id: number;
  email: string;
  fullName: string;
  phone: string | null;
  educationalInstitution: string | null;
  avatar: string | null;
  role: {
    name: string;
  };
  createdAt: string;
};

export type UpdateUserPayload = {
  fullName?: string;
  phone?: string;
  password?: string;
};

export function mapUserFromApi(user: UserListItem, roleName: "Admin" | "Supplier" | "User"): AdminUserRow {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone || "-",
    institution: user.educationalInstitution || "-",
    roleName,
    createdAt: user.createdAt,
  };
}
