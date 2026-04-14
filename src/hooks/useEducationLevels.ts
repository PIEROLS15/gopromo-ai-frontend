"use client";

import { useEffect, useState } from "react";

import { EducationLevelService } from "@/services/educationLevel.service";
import type { EducationLevel } from "@/types/educationLevel";

export function useEducationLevels() {
  const [educationLevels, setEducationLevels] = useState<EducationLevel[]>([]);

  useEffect(() => {
    const fetchEducationLevels = async () => {
      try {
        const data = await EducationLevelService.getAllPages(100);
        setEducationLevels(data);
      } catch (error) {
        console.error("Error loading education levels:", error);
        setEducationLevels([]);
      }
    };

    fetchEducationLevels();
  }, []);

  return { educationLevels };
}
