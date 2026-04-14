"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Bus,
  Building2,
  Calendar as CalendarIcon,
  Clock,
  Hotel,
  MapPin,
  Shield,
  ShieldCheck,
  Users,
  UtensilsCrossed,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { TourPackageResponse } from "@/types/tourPackage";

const DAY_MS = 24 * 60 * 60 * 1000;

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const startOfDay = (date: Date) => {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
};

const formatShortDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "short" })
    .format(date)
    .replace(".", "")
    .toLowerCase();
};

const getNextAvailableDates = (allowedDays: number[], reservedDateKeys: Set<string>, count = 4) => {
  if (!allowedDays.length) return [] as Date[];

  const result: Date[] = [];
  let cursor = startOfDay(new Date(Date.now() + DAY_MS));
  let attempts = 0;

  while (result.length < count && attempts < 365) {
    const isAllowedDay = allowedDays.includes(cursor.getDay());
    const isReserved = reservedDateKeys.has(toDateKey(cursor));
    if (isAllowedDay && !isReserved) {
      result.push(new Date(cursor));
    }
    cursor = new Date(cursor.getTime() + DAY_MS);
    attempts += 1;
  }

  return result;
};

type PackageDetailsHeroProps = {
  pkg: TourPackageResponse;
  destination: string;
  heroImage: string;
  availableDays: number[];
  reservedDates?: Date[];
  onReserve: () => void;
};

const PackageDetailsHero = (props: PackageDetailsHeroProps) => {
  const { pkg, destination, heroImage, availableDays, reservedDates = [], onReserve } = props;
  const [calendarOpen, setCalendarOpen] = useState(false);

  const reservedDateKeys = useMemo(
    () => new Set(reservedDates.map((date) => toDateKey(startOfDay(date)))),
    [reservedDates]
  );

  const nextAvailableDates = useMemo(
    () => getNextAvailableDates(availableDays, reservedDateKeys, 4),
    [availableDays, reservedDateKeys]
  );

  const isPast = (date: Date) => startOfDay(date) <= startOfDay(new Date());
  const isAllowedDay = (date: Date) => availableDays.includes(date.getDay());
  const isReservedDate = (date: Date) => reservedDateKeys.has(toDateKey(startOfDay(date)));

  const calendarDisabled = (date: Date) => isPast(date) || !isAllowedDay(date);
  const reservedModifier = (date: Date) => !isPast(date) && isAllowedDay(date) && isReservedDate(date);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden mb-8">
      <div className="relative min-h-80 sm:min-h-105 lg:min-h-115">
        <Image src={heroImage} alt={pkg.name} fill className="absolute inset-0 object-cover" priority />
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

        <div className="relative z-10 grid lg:grid-cols-[1fr_340px] h-full min-h-80 sm:min-h-105 lg:min-h-115">
          <div className="flex flex-col justify-between p-5 sm:p-8 pr-4">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs px-3 py-1 rounded-full">
                <Shield className="w-3 h-3 text-primary" /> Proveedor Verificado
              </span>
              <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm border border-white/20 text-white/80 text-xs px-3 py-1 rounded-full">
                Ideal para {pkg.educationLevel?.name}
              </span>
            </div>

            <div className="mb-3">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight drop-shadow-lg mb-3">{pkg.name}</h1>
              <div className="inline-block border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg mb-3 max-w-lg">
                <p className="text-white/90 text-sm leading-relaxed line-clamp-2">{pkg.description}</p>
              </div>
              <div className="flex items-center gap-1.5 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{destination}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white rounded-full px-3 py-1.5 text-sm border border-white/20">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span className="font-medium">{pkg.days} {pkg.days === 1 ? "Dia" : "Dias"}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white rounded-full px-3 py-1.5 text-sm border border-white/20">
                <Users className="w-3.5 h-3.5 text-primary" />
                <span>Min. {pkg.minStudents} estudiantes</span>
              </div>
              <Badge variant="turquoise" className="rounded-full px-3 py-1.5 text-sm font-semibold">{pkg.educationLevel?.name}</Badge>
              <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium px-3 py-1 rounded-full">
                <Building2 className="w-3 h-3 text-primary" /> {pkg.supplier?.companyName}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <p className="text-white text-xs uppercase tracking-wider">Fechas disponibles</p>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <button className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors">
                      <CalendarIcon className="w-3 h-3" />
                      Ver calendario
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                    <div className="p-3 border-b border-border">
                      <p className="text-xs font-semibold text-foreground mb-1">Leyenda</p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-primary inline-block" />Disponible</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-destructive/70 inline-block" />Reservado</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-muted inline-block" />Bloqueado</span>
                      </div>
                    </div>
                    <Calendar
                      mode="single"
                      disabled={calendarDisabled}
                      modifiers={{ reserved: reservedModifier }}
                      modifiersClassNames={{
                        reserved: "bg-destructive/20 text-destructive font-semibold hover:bg-destructive/30",
                      }}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                {nextAvailableDates.length > 0 ? (
                  nextAvailableDates.map((date) => (
                    <span key={toDateKey(date)} className="text-xs font-bold rounded-full px-3 py-1.5 bg-transparent border border-white/40 text-white whitespace-nowrap">
                      {formatShortDate(date)}
                    </span>
                  ))
                ) : (
                  <span className="text-white/40 text-xs">Sin fechas disponibles</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-4 sm:p-6 lg:py-8">
            <Card className="w-full max-w-75 bg-white dark:bg-card shadow-lg border border-border rounded-2xl overflow-hidden">
              <CardContent className="p-5 space-y-4">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-1">Desde</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-extrabold text-primary">S/{pkg.pricePersona}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">por estudiante</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  {[
                    { included: pkg.services.travel_insurance, label: "Seguro de viaje", Icon: ShieldCheck },
                    { included: pkg.services.feeding, label: "Alimentacion completa", Icon: UtensilsCrossed },
                    { included: pkg.services.transport, label: "Transporte ida y vuelta", Icon: Bus },
                    { included: pkg.services.lodging, label: "Hospedaje incluido", Icon: Hotel },
                  ].map(({ included, label, Icon }) => (
                    <div key={label} className="flex items-center justify-between gap-3 text-sm">
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 shrink-0 ${included ? "text-primary" : "text-destructive"}`} />
                        <span className={included ? "text-foreground font-medium" : "text-muted-foreground line-through"}>{label}</span>
                      </div>
                      <span className={included ? "text-primary text-xs font-semibold" : "text-destructive text-xs font-semibold"}>
                        {included ? "incluido" : "no incluye"}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                <Button size="lg" className="w-full gap-2 font-bold text-base rounded-xl" onClick={onReserve}>
                  <CalendarIcon className="w-5 h-5" /> Solicitar reserva
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsHero;
