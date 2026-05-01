"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useAdminFilters } from "@/context/adminFiltersContext";
import {
  ADMIN_USERS_PAGE_SIZE,
  filterUsers,
  paginateUsers,
} from "@/lib/admin/users";
import UserService from "@/services/user.service";
import type { AdminUserRow } from "@/types/adminViews";

export function useAdminUsers() {
  const { usersSearch, usersRoleFilter } = useAdminFilters();

  const [usersCollection, setUsersCollection] = useState<AdminUserRow[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [usersSearch, usersRoleFilter]);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const users = await UserService.getUsersCollection();
      setUsersCollection(users);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo cargar usuarios.");
      setUsersCollection([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const filteredUsers = useMemo(
    () => filterUsers(usersCollection, usersSearch, usersRoleFilter),
    [usersCollection, usersSearch, usersRoleFilter],
  );

  const paginated = useMemo(
    () => paginateUsers(filteredUsers, page, ADMIN_USERS_PAGE_SIZE),
    [filteredUsers, page],
  );

  useEffect(() => {
    if (page > paginated.meta.totalPages) {
      setPage(paginated.meta.totalPages);
    }
  }, [page, paginated.meta.totalPages]);

  return {
    users: paginated.data,
    meta: paginated.meta,
    page: paginated.meta.page,
    setPage,
    loading,
    error,
    refresh: loadUsers,
  };
}
