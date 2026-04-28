export const ADMIN_ROUTE_TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/packages": "Paquetes",
  "/admin/suppliers": "Proveedores",
  "/admin/bookings": "Reservas",
  "/admin/users": "Usuarios",
  "/admin/payments": "Pagos",
  "/admin/settings": "Configuracion",
};

export function getAdminRouteTitle(pathname: string) {
  return ADMIN_ROUTE_TITLES[pathname] ?? "Admin";
}
