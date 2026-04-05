import { useMemo } from "react";
import type { User, Supplier } from "@/types/login";

type CurrentUser = User | Supplier | null;

function isUser(u: unknown): u is User {
  if (typeof u !== "object" || u === null) return false;
  const o = u as Record<string, unknown>;
  return typeof o["fullName"] === "string";
}

function isSupplier(u: unknown): u is Supplier {
  if (typeof u !== "object" || u === null) return false;
  const o = u as Record<string, unknown>;
  return typeof o["representativeName"] === "string";
}

export interface AvatarData {
  displayName: string;
  initials: string;
  roleNameDisplay: string;
}

export function useProfileAvatar(currentUser: CurrentUser, role?: string): AvatarData {
  const displayName = useMemo(() => {
    if (isUser(currentUser)) {
      return (currentUser as User).fullName;
    }
    if (isSupplier(currentUser)) {
      return (currentUser as Supplier).representativeName;
    }
    if (typeof role === "string" && role === "Supplier") {
      return "Proveedor";
    }
    return "Usuario";
  }, [currentUser, role]);

  const initials = useMemo(() => {
    return displayName
      .split(/\s+/)
      .slice(0, 2)
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase();
  }, [displayName]);

  const roleNameRaw = (currentUser as { role?: { name?: string } } | null)?.role?.name ?? null;
  const roleNameDisplay = useMemo(() => {
    if (typeof roleNameRaw === "string") {
      const r = roleNameRaw.toUpperCase();
      if (r === "USER") return "Usuario";
      if (r === "SUPPLIER") return "Proveedor de Servicios";
      return roleNameRaw;
    }
    return "Usuario";
  }, [roleNameRaw]);

  return { displayName, initials, roleNameDisplay };
}
