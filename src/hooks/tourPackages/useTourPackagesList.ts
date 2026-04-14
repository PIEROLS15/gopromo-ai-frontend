"use client";

import { useEffect, useState } from "react";

import { TourPackageService } from "@/services/tourPackage.service";
import type { TourPackageResponse } from "@/types/tourPackage";

export const useTourPackages = (page: number = 1, limit: number = 3) => {
  const [packages, setPackages] = useState<TourPackageResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await TourPackageService.getAll(page, limit);
        setPackages(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  return { packages, loading };
};
