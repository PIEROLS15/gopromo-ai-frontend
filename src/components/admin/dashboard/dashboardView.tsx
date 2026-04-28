"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAdminData } from "@/hooks/useAdminData";
import { formatAdminDate } from "@/services/adminData.service";
import StatusBadge from "@/components/admin/ui/statusBadge";
import StatsGrid from "@/components/admin/dashboard/statsGrid";

const DashboardView = () => {
  const { stats, bookings, suppliers, role, loading, error, refresh } = useAdminData();

  const pendingSuppliers = suppliers.filter((item) => !item.verified);

  if (loading) {
    return (
      <div className="h-[40vh] grid place-items-center">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6 space-y-3">
          <p className="font-medium text-foreground">No se pudo cargar el dashboard.</p>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={() => void refresh()} size="sm">
            Reintentar
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Reservas recientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bookings.map((booking) => (
              <div key={booking.id} className="rounded-lg border border-border p-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-foreground">{booking.code}</p>
                  <p className="text-sm text-muted-foreground">{booking.clientName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    S/{booking.totalAmount.toLocaleString("es-PE")}
                  </p>
                  <StatusBadge label={booking.status} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Proveedores pendientes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {role === "Supplier" ? (
              <p className="text-sm text-muted-foreground">
                Esta seccion aplica solo para cuentas con rol Admin.
              </p>
            ) : pendingSuppliers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No hay proveedores pendientes de verificacion.</p>
            ) : (
              pendingSuppliers.map((provider) => (
                <div key={provider.id} className="rounded-lg border border-border p-3">
                  <p className="font-medium text-foreground">{provider.companyName}</p>
                  <p className="text-sm text-muted-foreground">RUC: {provider.ruc}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Registro: {formatAdminDate(provider.createdAt)}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
