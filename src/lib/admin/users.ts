import type { AdminUserRow } from "@/types/adminViews";

export const ADMIN_USERS_PAGE_SIZE = 10;
export const ADMIN_USERS_FETCH_LIMIT = 100;

export function normalizeAdminRoleName(roleName: string): "Admin" | "Supplier" | "User" {
  if (roleName === "Admin" || roleName === "Supplier") {
    return roleName;
  }

  return "User";
}

export function filterUsers(users: AdminUserRow[], rawSearch: string, roleFilter: string) {
  const normalizedSearch = rawSearch.trim().toLowerCase();

  return users.filter((user) => {
    const matchesSearch =
      !normalizedSearch ||
      user.fullName.toLowerCase().includes(normalizedSearch) ||
      user.email.toLowerCase().includes(normalizedSearch);

    const matchesRole = roleFilter === "all" || user.roleName.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });
}

export function createUsersMeta(total: number, page: number, limit: number) {
  return {
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export function paginateUsers(users: AdminUserRow[], page: number, limit: number) {
  const meta = createUsersMeta(users.length, page, limit);
  const safePage = Math.min(Math.max(1, page), meta.totalPages);
  const from = (safePage - 1) * limit;

  return {
    data: users.slice(from, from + limit),
    meta: createUsersMeta(users.length, safePage, limit),
  };
}
