"use client";

import UsersFilters from "@/components/admin/users/usersFilters";
import UserDetailsDialog from "@/components/admin/users/userDetailsDialog";
import UserDeleteDialog from "@/components/admin/users/userDeleteDialog";
import UserEditDialog from "@/components/admin/users/userEditDialog";
import UsersTable from "@/components/admin/users/usersTable";
import { useAdminFilters } from "@/context/adminFiltersContext";
import { useAdminRoles } from "@/hooks/useAdminRoles";
import { useAdminUserActions } from "@/hooks/useAdminUserActions";
import { useAdminUsers } from "@/hooks/useAdminUsers";

const UsersView = () => {
  const { users, meta, page, setPage, loading, error, refresh } = useAdminUsers();
  const { usersSearch, setUsersSearch, usersRoleFilter, setUsersRoleFilter } = useAdminFilters();
  const { roles } = useAdminRoles();
  const {
    detailsOpen,
    setDetailsOpen,
    detailsLoading,
    selectedUser,
    editOpen,
    setEditOpen,
    editLoading,
    editingUser,
    deleteOpen,
    setDeleteOpen,
    deletingUser,
    actionLoadingId,
    handleOpenDetails,
    handleOpenEdit,
    handleSaveEdit,
    requestDeleteUser,
    handleDeleteUser,
  } = useAdminUserActions({ refresh });

  return (
    <div className="space-y-4">
      <UsersFilters
        usersSearch={usersSearch}
        onUsersSearchChange={setUsersSearch}
        usersRoleFilter={usersRoleFilter}
        onUsersRoleFilterChange={setUsersRoleFilter}
        roles={roles}
      />

      <UsersTable
        users={users}
        meta={meta}
        page={page}
        loading={loading}
        error={error}
        actionLoadingId={actionLoadingId}
        onRetry={() => void refresh()}
        onFirstPage={() => setPage(1)}
        onPrevPage={() => setPage((current) => Math.max(1, current - 1))}
        onNextPage={() => setPage((current) => Math.min(meta.totalPages || 1, current + 1))}
        onLastPage={() => setPage(meta.totalPages || 1)}
        onViewDetails={(userId) => void handleOpenDetails(userId)}
        onEdit={(userId) => void handleOpenEdit(userId)}
        onDelete={(user) => requestDeleteUser(user)}
      />

      <UserDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        loading={detailsLoading}
        user={selectedUser}
      />

      <UserEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        loading={editLoading}
        user={editingUser}
        saving={Boolean(actionLoadingId)}
        onSave={(payload) => void handleSaveEdit(payload)}
      />

      <UserDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        user={deletingUser}
        deleting={Boolean(actionLoadingId)}
        onConfirm={() => void handleDeleteUser()}
      />
    </div>
  );
};

export default UsersView;
