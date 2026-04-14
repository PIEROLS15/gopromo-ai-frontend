"use client";

import { useEffect, useState } from "react";

import { LocationsService } from "@/services/locations.service";
import type { Department, District, Province } from "@/types/location";

export function useLocations(departmentId: number | null, provinceId: number | null) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await LocationsService.getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Error loading departments:", error);
        setDepartments([]);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchProvinces = async () => {
      if (!departmentId) {
        setProvinces([]);
        return;
      }

      try {
        const data = await LocationsService.getProvincesByDepartment(departmentId);
        setProvinces(data);
      } catch (error) {
        console.error("Error loading provinces:", error);
        setProvinces([]);
      }
    };

    fetchProvinces();
  }, [departmentId]);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (!provinceId) {
        setDistricts([]);
        return;
      }

      try {
        const data = await LocationsService.getDistrictsByProvince(provinceId);
        setDistricts(data);
      } catch (error) {
        console.error("Error loading districts:", error);
        setDistricts([]);
      }
    };

    fetchDistricts();
  }, [provinceId]);

  return {
    departments,
    provinces,
    districts,
  };
}
