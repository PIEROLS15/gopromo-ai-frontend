"use client";

import { useEffect, useState } from "react";

import AdminRolesService from "@/services/adminRoles.service";
import type { RoleItem } from "@/types/adminRoles";

export function useAdminRoles() {
  const [roles, setRoles] = useState<RoleItem[]>([]);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const response = await AdminRolesService.getRolesCollection();
        setRoles(response);
      } catch {
        setRoles([]);
      }
    };

    void loadRoles();
  }, []);

  return { roles };
}
