"use client";

import Image from "next/image";
import { Clock, MapPin, Users, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TourPackageResponse } from "@/types/tourPackage";

interface PackageCardProps {
  pkg: TourPackageResponse;
  onSelect?: (pkg: TourPackageResponse) => void;
  ctaLabel?: string;
}

const cap = (s?: string) => {
  if (!s) return "";
  const t = String(s);
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
};

export function PackageCard({
  pkg,
  onSelect,
  ctaLabel = "Ver detalles",
}: PackageCardProps) {
  const deptName = cap(pkg.district?.province?.department?.name);
  const provName = cap(pkg.district?.province?.name);
  const distName = cap(pkg.district?.name);
  const destination = [deptName, provName, distName].filter((n) => n).join(", ");

  const image = pkg.images?.[0]?.url ?? "/placeholder.jpg";
  const price = pkg.pricePersona;
  const days = pkg.days ?? 0;
  const duration = `${days} ${days === 1 ? "día" : "días"}`;
  const minLabel = `Mínimo ${pkg.minStudents ?? 0} estudiantes`;
  const categoryName = pkg.category?.name ?? "";
  const educationLevelName = pkg.educationLevel?.name ?? "";
  const promotionDiscounts = pkg.promotions.map((promotion) => {
    if (price <= 0 || promotion.price >= price) return 0;
    return Math.round(((price - promotion.price) / price) * 100);
  });
  const discount = Math.max(
    ...(pkg.offers?.map((offer) => offer.discountPercent ?? 0) ?? [0]),
    ...(promotionDiscounts.length > 0 ? promotionDiscounts : [0])
  );
  const originalPrice = discount > 0 ? Math.round(price / (1 - discount / 100)) : null;

  return (
    <Card
      variant="package"
      className="group cursor-pointer"
      onClick={() => onSelect?.(pkg)}
    >
      <div className="relative h-48 md:h-56 overflow-hidden">
        <Image
          src={image}
          alt={pkg.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
          {categoryName && <Badge variant="orange">{categoryName}</Badge>}
        </div>
        <div className="absolute bottom-3 right-3 z-10">
          <Badge variant="orange" className="text-lg px-4 py-1.5">
            S/{price}
            {originalPrice && originalPrice > price && (
              <span className="ml-2 text-xs line-through opacity-70">S/{originalPrice}</span>
            )}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-foreground/60 to-transparent" />
      </div>

      <CardContent className="p-4 md:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-foreground text-base md:text-lg leading-tight line-clamp-2">
            {pkg.name}
          </h3>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{destination}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            {duration}
          </span>
          {educationLevelName && (
            <Badge variant="turquoise" className="ml-auto text-xs">
              {educationLevelName}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-primary" />
            <span>{minLabel}</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.(pkg);
          }}
        >
          {ctaLabel}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
