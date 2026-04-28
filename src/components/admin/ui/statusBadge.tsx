import { Badge } from "@/components/ui/badge";
import type { BadgeProps } from "@/components/ui/badge";

const statusVariantMap: Record<string, NonNullable<BadgeProps["variant"]>> = {
  Confirmada: "success",
  Pagado: "success",
  Verificado: "primary",
  Activo: "success",
  Pendiente: "orange",
  Inactivo: "destructive",
  Admin: "destructive",
  Supplier: "secondary",
  User: "outline",
  Cancelada: "destructive",
  Fallido: "destructive",
};

const StatusBadge = ({ label }: { label: string }) => {
  const variant = statusVariantMap[label] ?? "outline";

  return <Badge variant={variant}>{label}</Badge>;
};

export default StatusBadge;
