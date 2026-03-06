"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, MapPin, ChevronRight } from "lucide-react";
import { TourPackageResponse } from "@/types/tourPackage";
import { useTourPackages } from "@/hooks/useTourPackages";

// Using TourPackageResponse directly from /types/tourPackage

// Removed color mapping as types are derived from backend and UI no longer uses mapper

interface PackageCardProps {
  pkg: TourPackageResponse;
  onSelect: (pkg: TourPackageResponse) => void;
}

const PackageCard = ({ pkg, onSelect }: PackageCardProps) => {
  // Build destination as Departamento, Provincia, Distrito with proper capitalization
  const cap = (s?: string) => {
    if (!s) return "";
    const t = String(s);
    return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
  };
  const deptName = cap(pkg.district?.province?.department?.name);
  const provName = cap(pkg.district?.province?.name);
  const distName = cap(pkg.district?.name);
  const destination = [deptName, provName, distName].filter((n) => n).join(", ");

  const image = pkg.images?.[0]?.url ?? "/placeholder.jpg";
  const price = pkg.pricePersona;
  const duration = `${pkg.days ?? 0} días`;
  const minLabel = `Mínimo ${pkg.minStudents ?? 0} estudiantes`;
  const level = pkg.educationLevel?.name ?? "";
  // typeKey removed to avoid lint errors; we rely on backend type display only

  return (
    <Card
      variant="package"
      className="group cursor-pointer"
      onClick={() => onSelect(pkg)}
    >
      <div className="relative h-48 md:h-56 overflow-hidden">
        <Image
          src={image}
          alt={pkg.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-3 right-3">
          <Badge variant="price" className="text-lg">
            S/{price}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />
      </div>

      <CardContent className="p-4 md:p-5">
        <h3 className="font-bold text-foreground text-base md:text-lg leading-tight line-clamp-2 mb-2">
          {pkg.name}
        </h3>

        <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{destination}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-primary" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-primary" />
            <span>{minLabel}</span>
          </div>
        </div>

        <div className="flex justify-end mb-4">
          <Badge variant="outline" className="text-xs">
            {level}
          </Badge>
        </div>

        <Button
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(pkg);
          }}
        >
          Ver detalles
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

interface FeaturedPackagesProps {
  onSelectPackage: (pkg: TourPackageResponse) => void;
}

const FeaturedPackages = ({ onSelectPackage }: FeaturedPackagesProps) => {
  const router = useRouter();
  const { packages, loading } = useTourPackages();

  const handleSelect = (pkg: TourPackageResponse) => {
    onSelectPackage?.(pkg);
    router.push(`/paquete/${pkg.id}`);
  };

  return (
    <section className="py-16 md:py-24 bg-background flex items-center justify-center">
      <div className="container px-4">
        <div className="text-center mb-10 md:mb-14">
          <Badge variant="turquoise" className="mb-4">
            Paquetes Destacados
          </Badge>
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Viajes diseñados para{" "}
            <span className="text-primary">aprender y disfrutar</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Explora nuestra selección de paquetes turísticos educativos con
            proveedores verificados y pagos seguros.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-10">Cargando paquetes...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} onSelect={handleSelect} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button
            variant="secondary"
            size="lg"
            className="gap-2"
            onClick={() => router.push("/paquetes")}
          >
            Ver todos los paquetes
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;

// Re-export a local alias to align with existing imports that expect a 'Package' type
// This reflects the backend model TourPackageResponse for type compatibility
export type Package = TourPackageResponse;
