"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useSession } from "@/context/sessionContext";
import AdminDataService from "@/services/adminData.service";
import type { AdminSnapshot, DashboardRole } from "@/types/adminViews";

const EMPTY_SNAPSHOT: AdminSnapshot = {
  packages: [],
  suppliers: [],
  bookings: [],
  users: [],
  payments: [],
  settings: [],
};

export function useAdminData() {
  const { roleName } = useSession();
  const [snapshot, setSnapshot] = useState<AdminSnapshot>(EMPTY_SNAPSHOT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const normalizedRole = useMemo<DashboardRole | null>(() => {
    if (!roleName) return null;

    const lower = roleName.toLowerCase();

    if (lower === "admin") return "Admin";
    if (lower === "supplier") return "Supplier";

    return null;
  }, [roleName]);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const nextSnapshot = await AdminDataService.getSnapshot(normalizedRole);
      setSnapshot(nextSnapshot);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo cargar la data del panel.");
      setSnapshot(EMPTY_SNAPSHOT);
    } finally {
      setLoading(false);
    }
  }, [normalizedRole]);

  useEffect(() => {
    void load();
  }, [load]);

  const stats = useMemo(
    () => AdminDataService.getDashboardStats(normalizedRole, snapshot),
    [normalizedRole, snapshot],
  );

  return {
    ...snapshot,
    role: normalizedRole,
    loading,
    error,
    refresh: load,
    stats,
  };
}
