"use client";

import { useState } from "react";

import { useToast } from "@/hooks/use-toast";
import { TourPackageService } from "@/services/tourPackage.service";
import { mapPackageDetailsFromApi, type AdminPackageDetails } from "@/types/adminPackages";
import type { AdminPackage } from "@/types/adminViews";

type UseAdminPackageActionsParams = {
  refresh: () => Promise<void>;
};

export function useAdminPackageActions({ refresh }: UseAdminPackageActionsParams) {
  const { toast } = useToast();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<AdminPackageDetails | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deletingPackage, setDeletingPackage] = useState<AdminPackage | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  const handleOpenDetails = async (packageId: number) => {
    try {
      setDetailsOpen(true);
      setDetailsLoading(true);
      const detail = await TourPackageService.getById(packageId);
      setSelectedPackage(mapPackageDetailsFromApi(detail));
    } catch (cause) {
      setDetailsOpen(false);
      toast({
        title: "No se pudo cargar el detalle",
        description:
          cause instanceof Error ? cause.message : "Error inesperado al obtener el paquete.",
        variant: "destructive",
      });
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleActivateToggle = async (pkg: AdminPackage) => {
    try {
      setActionLoadingId(pkg.id);

      if (pkg.active) {
        const response = await TourPackageService.deactivate(pkg.id);
        toast({
          title: "Paquete actualizado",
          description: response.message,
          variant: "success",
        });
      } else {
        const response = await TourPackageService.activate(pkg.id);
        toast({
          title: "Paquete actualizado",
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

  const requestDeletePackage = (pkg: AdminPackage) => {
    setDeletingPackage(pkg);
    setDeleteOpen(true);
  };

  const handleDeleteOpenChange = (open: boolean) => {
    setDeleteOpen(open);
    if (!open) {
      setDeletingPackage(null);
    }
  };

  const handleDeletePackage = async () => {
    if (!deletingPackage) return;

    try {
      setActionLoadingId(deletingPackage.id);
      const response = await TourPackageService.remove(deletingPackage.id);
      toast({
        title: "Paquete eliminado",
        description: response.message,
        variant: "success",
      });
      setDeleteOpen(false);
      setDeletingPackage(null);
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

  return {
    detailsOpen,
    setDetailsOpen,
    detailsLoading,
    selectedPackage,
    deleteOpen,
    setDeleteOpen: handleDeleteOpenChange,
    deletingPackage,
    actionLoadingId,
    handleOpenDetails,
    handleActivateToggle,
    requestDeletePackage,
    handleDeletePackage,
  };
}
