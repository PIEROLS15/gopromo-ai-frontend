"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, MapPin, Shield, ChevronRight } from "lucide-react";
import { useFeaturedPackages } from "@/hooks/useFeaturePackages";

interface Package {
  id: number;
  title: string;
  destination: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string; // e.g. "3 días"
  minStudentsLabel: string; // e.g. "Mínimo 5 estudiantes"
  level: string;
  verified: boolean;
  type: "aventura" | "educativo" | "cultural" | "relajación";
}

const typeColors: Record<string, "turquoise" | "orange" | "success"> = {
  aventura: "orange",
  educativo: "turquoise",
  cultural: "success",
  relajación: "turquoise",
};

interface PackageCardProps {
  pkg: Package;
  onSelect: (pkg: Package) => void;
}

const PackageCard = ({ pkg, onSelect }: PackageCardProps) => (
  <Card
    variant="package"
    className="group cursor-pointer"
    onClick={() => onSelect(pkg)}
  >
    <div className="relative h-48 md:h-56 overflow-hidden">
      <Image
        src={pkg.image}
        alt={pkg.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />

      <div className="absolute top-3 left-3 flex flex-wrap gap-2">
        <Badge variant={typeColors[pkg.type]}>
          {pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)}
        </Badge>
        {pkg.verified && (
          <Badge variant="verified">
            <Shield className="w-3 h-3" />
            Verificado
          </Badge>
        )}
      </div>

      <div className="absolute bottom-3 right-3">
        <Badge variant="price" className="text-lg">
          S/{pkg.price}
          {pkg.originalPrice && (
            <span className="ml-2 text-xs line-through opacity-70">
              S/{pkg.originalPrice}
            </span>
          )}
        </Badge>
      </div>
    </div>

    <CardContent className="p-4 md:p-5">
      <h3 className="font-bold text-foreground text-base md:text-lg leading-tight line-clamp-2 mb-2">
        {pkg.title}
      </h3>

      <div className="flex flex-col gap-1 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{pkg.destination}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-primary" />
          <span>{pkg.duration}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4 text-primary" />
          <span>{pkg.minStudentsLabel}</span>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <Badge variant="outline" className="text-xs">
          {pkg.level}
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

interface FeaturedPackagesProps {
  onSelectPackage: (pkg: Package) => void;
}

const FeaturedPackages = ({ onSelectPackage }: FeaturedPackagesProps) => {
  const router = useRouter();
  const { packages, loading } = useFeaturedPackages();

  const handleSelect = (pkg: Package) => {
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
export type { Package };

