"use client";

import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import UserService from "@/services/user.service";
import type { UserDetails } from "@/types/adminUsers";
import type { AdminUserRow } from "@/types/adminViews";

type UseAdminUserActionsParams = {
  refresh: () => Promise<void>;
};

export function useAdminUserActions({ refresh }: UseAdminUserActionsParams) {
  const { toast } = useToast();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<UserDetails | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState<AdminUserRow | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const handleOpenDetails = async (userId: number) => {
    try {
      setDetailsOpen(true);
      setDetailsLoading(true);
      const detail = await UserService.getById(userId);
      setSelectedUser(detail);
    } catch (cause) {
      setDetailsOpen(false);
      toast({
        title: "No se pudo cargar el detalle",
        description: cause instanceof Error ? cause.message : "Error inesperado",
        variant: "destructive",
      });
    } finally {
      setDetailsLoading(false);
    }
  };

  const requestDeleteUser = (user: AdminUserRow) => {
    setDeletingUser(user);
    setDeleteOpen(true);
  };

  const handleDeleteOpenChange = (open: boolean) => {
    setDeleteOpen(open);
    if (!open) {
      setDeletingUser(null);
    }
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) return;

    try {
      setActionLoadingId(deletingUser.id);
      const response = await UserService.removeById(deletingUser.id);
      toast({
        title: "Usuario eliminado",
        description: response.message,
        variant: "success",
      });
      setDeleteOpen(false);
      setDeletingUser(null);
      await refresh();
    } catch (cause) {
      toast({
        title: "No se pudo eliminar",
        description: cause instanceof Error ? cause.message : "Error inesperado",
        variant: "destructive",
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleOpenEdit = async (userId: number) => {
    try {
      setEditOpen(true);
      setEditLoading(true);
      const detail = await UserService.getById(userId);
      setEditingUser(detail);
    } catch (cause) {
      setEditOpen(false);
      toast({
        title: "No se pudo cargar usuario",
        description: cause instanceof Error ? cause.message : "Error inesperado",
        variant: "destructive",
      });
    } finally {
      setEditLoading(false);
    }
  };

  const handleSaveEdit = async (params: {
    userId: number;
    fullName: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (params.password && params.password !== params.confirmPassword) {
      toast({
        title: "Contraseñas no coinciden",
        description: "La confirmacion no coincide con la contraseña.",
        variant: "destructive",
      });
      return;
    }

    if (params.password && params.password.length < 8) {
      toast({
        title: "Contraseña invalida",
        description: "La contraseña debe tener al menos 8 caracteres.",
        variant: "destructive",
      });
      return;
    }

    try {
      setActionLoadingId(params.userId);
      const response = await UserService.updateById(params.userId, {
        fullName: params.fullName,
        phone: params.phone,
        ...(params.password ? { password: params.password } : {}),
      });

      toast({
        title: "Usuario actualizado",
        description: response.message,
        variant: "success",
      });

      setEditOpen(false);
      await refresh();
    } catch (cause) {
      toast({
        title: "No se pudo actualizar",
        description: cause instanceof Error ? cause.message : "Error inesperado",
        variant: "destructive",
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  return {
    detailsOpen,
    setDetailsOpen,
    detailsLoading,
    selectedUser,
    editOpen,
    setEditOpen,
    editLoading,
    editingUser,
    deleteOpen,
    setDeleteOpen: handleDeleteOpenChange,
    deletingUser,
    actionLoadingId,
    handleOpenDetails,
    handleOpenEdit,
    handleSaveEdit,
    requestDeleteUser,
    handleDeleteUser,
  };
}
