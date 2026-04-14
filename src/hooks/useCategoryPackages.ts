"use client";

import { useEffect, useState } from "react";

import { CategoryPackageService } from "@/services/categoryPackage.service";
import type { CategoryPackage } from "@/types/categoryPackage";

export function useCategoryPackages() {
  const [categories, setCategories] = useState<CategoryPackage[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await CategoryPackageService.getAllPages(100);
        setCategories(data);
      } catch (error) {
        console.error("Error loading category packages:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return { categories };
}
