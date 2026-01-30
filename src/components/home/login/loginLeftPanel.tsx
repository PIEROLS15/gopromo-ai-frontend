import Link from "next/link";
import { Ticket, Star, Headphones } from "lucide-react";

const LoginLeftPanel = () => {
  return (
    <div className="hidden lg:block space-y-8 pr-10">
      {/* Logo + Title */}
      <div>
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-primary mb-6"
        >
          <span className="text-3xl">✈️</span>
          GoPromo AI
        </Link>

        <h1 className="text-4xl font-bold mb-4">
          Bienvenido de vuelta
        </h1>

        <p className="text-muted-foreground text-lg">
          Inicia sesión en tu cuenta para acceder a tus reservas,
          promociones y más.
        </p>
      </div>

      {/* Benefits */}
      <div className="space-y-6">
        <Benefit
          icon={<Ticket className="h-6 w-6 text-primary" />}
          title="Acceso a tus reservas"
          description="Gestiona todos tus viajes en un solo lugar"
        />

        <Benefit
          icon={<Star className="h-6 w-6 text-yellow-500" />}
          title="Promociones exclusivas"
          description="Descuentos especiales para miembros"
        />

        <Benefit
          icon={<Headphones className="h-6 w-6 text-emerald-500" />}
          title="Soporte prioritario"
          description="Atención 24/7 para tus consultas"
        />
      </div>
    </div>
  );
}

export default LoginLeftPanel;


function Benefit({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-border bg-card/50">
      <div className="p-2 rounded-lg bg-primary/10">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
