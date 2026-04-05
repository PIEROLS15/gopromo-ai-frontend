"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { TourPackageResponse } from "@/types/tourPackage";
import { useTourPackages } from "@/hooks/useTourPackages";
import { PackageCard } from "@/components/package-card";

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
            Viajes diseñados para <span className="text-primary">aprender y disfrutar</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Explora nuestra selección de paquetes turísticos educativos con proveedores
            verificados y pagos seguros.
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
            onClick={() => router.push("/packages")}
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

export type Package = TourPackageResponse;
