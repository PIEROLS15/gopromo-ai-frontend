import type { AdminRole, AdminRouteRule } from "@/types/admin";

export const adminRouteRules: AdminRouteRule[] = [
  { prefix: "/admin", roles: ["Admin", "Supplier"] },
  { prefix: "/admin/packages", roles: ["Supplier"] },
  { prefix: "/admin/suppliers", roles: ["Admin"] },
  { prefix: "/admin/bookings", roles: ["Admin", "Supplier"] },
  { prefix: "/admin/users", roles: ["Admin"] },
  { prefix: "/admin/payments", roles: ["Admin"] },
  { prefix: "/admin/settings", roles: ["Admin"] },
];

const sortedAdminRouteRules = [...adminRouteRules].sort(
  (a, b) => b.prefix.length - a.prefix.length
);

function isAdminRole(roleName: string): roleName is AdminRole {
  return roleName === "Admin" || roleName === "Supplier";
}

function normalizeRoleName(roleName?: string | null): AdminRole | null {
  if (!roleName) return null;

  if (isAdminRole(roleName)) {
    return roleName;
  }

  const lower = roleName.toLowerCase();

  if (lower === "admin") return "Admin";
  if (lower === "supplier") return "Supplier";

  return null;
}

export function canAccessAdminPath(pathname: string, roleName?: string | null) {
  const normalizedRole = normalizeRoleName(roleName);

  if (!normalizedRole) return false;

  const currentRule = sortedAdminRouteRules.find((rule) =>
    rule.prefix === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(rule.prefix)
  );

  if (!currentRule) {
    return true;
  }

  return currentRule.roles.includes(normalizedRole);
}
