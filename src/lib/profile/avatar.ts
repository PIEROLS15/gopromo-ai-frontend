import type { Supplier, User } from "@/types/login";

type CurrentUser = User | Supplier | null;

function isUser(u: unknown): u is User {
  if (typeof u !== "object" || u === null) return false;
  const obj = u as Record<string, unknown>;
  return typeof obj.fullName === "string";
}

function isSupplier(u: unknown): u is Supplier {
  if (typeof u !== "object" || u === null) return false;
  const obj = u as Record<string, unknown>;
  return typeof obj.representativeName === "string";
}

export type AvatarData = {
  displayName: string;
  initials: string;
  roleNameDisplay: string;
};

export function getProfileAvatarData(currentUser: CurrentUser, role?: string): AvatarData {
  const displayName = (() => {
    if (isUser(currentUser)) return currentUser.fullName;
    if (isSupplier(currentUser)) return currentUser.representativeName;
    if (role === "Supplier") return "Proveedor";
    return "Usuario";
  })();

  const initials = displayName
    .split(/\s+/)
    .slice(0, 2)
    .map((name) => name.charAt(0))
    .join("")
    .toUpperCase();

  const roleNameRaw = (currentUser as { role?: { name?: string } } | null)?.role?.name;
  const roleNameDisplay = (() => {
    if (typeof roleNameRaw !== "string") return "Usuario";
    const upper = roleNameRaw.toUpperCase();
    if (upper === "USER") return "Usuario";
    if (upper === "SUPPLIER") return "Proveedor de Servicios";
    return roleNameRaw;
  })();

  return { displayName, initials, roleNameDisplay };
}
