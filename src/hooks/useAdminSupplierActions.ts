"use client";

import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import AdminSuppliersService from "@/services/adminSuppliers.service";
import type { AdminSupplier } from "@/types/adminViews";

type UseAdminSupplierActionsParams = {
  refresh: () => Promise<void>;
};

export function useAdminSupplierActions({
  refresh,
}: UseAdminSupplierActionsParams) {
  const { toast } = useToast();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<AdminSupplier | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const handleOpenDetails = async (supplierId: number) => {
    try {
      setDetailsOpen(true);
      setDetailsLoading(true);
      const detail = await AdminSuppliersService.getSupplierById(supplierId);
      setSelectedSupplier(detail);
    } catch (cause) {
      setDetailsOpen(false);
      toast({
        title: "No se pudo cargar el detalle",
        description:
          cause instanceof Error ? cause.message : "Error inesperado al obtener el proveedor.",
        variant: "destructive",
      });
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleActivateToggle = async (supplier: AdminSupplier) => {
    try {
      setActionLoadingId(supplier.id);

      if (supplier.active) {
        const response = await AdminSuppliersService.deactivate(supplier.id);
        toast({
          title: "Proveedor actualizado",
          description: response.message,
          variant: "success",
        });
      } else {
        const response = await AdminSuppliersService.activate(supplier.id);
        toast({
          title: "Proveedor actualizado",
          description: response.message,
          variant: "success",
        });
      }

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

  const handleApprove = async (supplier: AdminSupplier) => {
    try {
      setActionLoadingId(supplier.id);
      const response = await AdminSuppliersService.approve(supplier.id);
      toast({
        title: "Proveedor aprobado",
        description: response.message,
        variant: "success",
      });
      await refresh();
    } catch (cause) {
      toast({
        title: "No se pudo aprobar",
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
    selectedSupplier,
    actionLoadingId,
    handleOpenDetails,
    handleActivateToggle,
    handleApprove,
  };
}
