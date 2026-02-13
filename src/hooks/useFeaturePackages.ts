"use client";

import { useEffect, useState } from "react";
import { TourPackageService } from "@/services/tourPackage.service";
import { mapTourPackageToHome } from "@/lib/mappers/tourPackage.mapper";
import { Package } from "@/components/home/featuredPackage";

export const useFeaturedPackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await TourPackageService.getFeatured();
        const mapped = res.data.map(mapTourPackageToHome);
        setPackages(mapped);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { packages, loading };
};
