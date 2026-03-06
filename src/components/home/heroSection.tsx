"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, Sparkles, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TourPackageService } from "@/services/tourPackage.service";
import { TourPackageResponse } from "@/types/tourPackage";

interface HeroSectionProps {
  onOpenChat: () => void;
  onSearchActiveChange?: (isActive: boolean) => void;
}

interface PackageSuggestion {
  id: number;
  title: string;
  destination: string;
  price: number;
  duration: string;
  image: string;
}

const HeroSection = ({ onOpenChat, onSearchActiveChange }: HeroSectionProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<PackageSuggestion[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const isSearchActive = searchQuery.trim().length > 0 || showSuggestions;

  useEffect(() => {
    onSearchActiveChange?.(isSearchActive);
  }, [isSearchActive, onSearchActiveChange]);

  // ✅ NUEVO: Conectado al endpoint real
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      try {
        const response = await TourPackageService.search(searchQuery);

        const cap = (s?: string) => {
          if (!s) return "";
          const t = String(s);
          return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
        };
        const mapped = response.map((pkg: TourPackageResponse) => {
          const deptName = cap(pkg.district?.province?.department?.name);
          const provName = cap(pkg.district?.province?.name);
          const distName = cap(pkg.district?.name);
          const dest = [deptName, provName, distName].filter((n) => n).join(", ");
          return {
            id: pkg.id,
            title: pkg.name,
            destination: dest,
            price: pkg.pricePersona,
            duration: `${pkg.days ?? 0} días`,
            image: pkg.images?.[0]?.url || "/placeholder.svg",
          };
        });

        setSuggestions(mapped);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 400);

    return () => clearTimeout(debounce);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectSuggestion = (pkg: PackageSuggestion) => {
    router.push(`/paquete/${pkg.id}`);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/paquetes?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/paquetes");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-visible pt-20 z-40">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-students.jpg"
          alt="Estudiantes peruanos disfrutando de un viaje escolar en Cañete"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-foreground/60 via-foreground/40 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center relative z-50">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-md">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-foreground">
              Powered by Inteligencia Artificial
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            Descubre el viaje perfecto para{" "}
            <span className="text-secondary">tus estudiantes</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-md">
            Encuentra y reserva paquetes turísticos educativos de proveedores
            verificados en Cañete, Perú. Proceso simple, seguro y guiado por IA.
          </p>

          {/* Search */}
          <div className="px-4 mb-6 relative z-60">
            <div
              ref={searchRef}
              className="bg-card/95 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-lg max-w-2xl mx-auto relative"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="¿A dónde te gustaría viajar?"
                    className="pl-12 h-14 text-base border-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => searchQuery && setShowSuggestions(true)}
                  />
                </div>

                <Button
                  variant="turquoise"
                  size="xl"
                  className="gap-2 w-full sm:w-auto"
                  onClick={handleSearch}
                >
                  <Search className="w-5 h-5" />
                  <span>Buscar</span>
                </Button>
              </div>

              {/* Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-4 right-4 md:left-6 md:right-6 top-full mt-2 bg-card rounded-xl shadow-2xl border border-border overflow-hidden z-[9999]">
                  <div className="p-2">
                    <p className="text-xs text-muted-foreground px-3 py-2">
                      Sugerencias
                    </p>

                    {suggestions.map((pkg) => (
                      <button
                        key={pkg.id}
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                        onClick={() => handleSelectSuggestion(pkg)}
                      >
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={pkg.image}
                            alt={pkg.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground text-sm truncate">
                            {pkg.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {pkg.destination}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <p className="font-bold text-primary text-sm">
                            S/{pkg.price}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {pkg.duration}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-border p-2">
                    <button
                      className="w-full text-center text-sm text-primary font-medium py-2 hover:underline"
                      onClick={handleSearch}
                    >
                      Ver todos los resultados
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {!showSuggestions && (
            <Button
              variant="hero"
              size="xl"
              onClick={onOpenChat}
              className="animate-bounce-gentle"
            >
              <Sparkles className="w-5 h-5" />
              Habla con PromoTrip AI
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

