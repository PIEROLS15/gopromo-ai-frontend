"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useAdminFilters } from "@/context/adminFiltersContext";
import {
  ADMIN_PACKAGES_FETCH_LIMIT,
  ADMIN_PACKAGES_PAGE_SIZE,
  filterPackages,
  paginatePackages,
} from "@/lib/admin/packages";
import { LocationsService } from "@/services/locations.service";
import { TourPackageService } from "@/services/tourPackage.service";
import { mapPackageFromApi } from "@/types/adminPackages";
import type { AdminPackage } from "@/types/adminViews";
import type { Department, District, Province } from "@/types/location";

export function useAdminPackages() {
  const {
    packagesSearch,
    packagesActiveFilter,
    packagesDepartmentFilter,
    packagesProvinceFilter,
    packagesDistrictFilter,
  } = useAdminFilters();

  const [packagesCollection, setPackagesCollection] = useState<AdminPackage[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [
    packagesSearch,
    packagesActiveFilter,
    packagesDepartmentFilter,
    packagesProvinceFilter,
    packagesDistrictFilter,
  ]);

  const loadPackages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      if (packagesActiveFilter === "all") {
        const [activePackages, inactivePackages] = await Promise.all([
          TourPackageService.getAllPages(ADMIN_PACKAGES_FETCH_LIMIT, true),
          TourPackageService.getAllPages(ADMIN_PACKAGES_FETCH_LIMIT, false),
        ]);

        const uniqueById = new Map<number, ReturnType<typeof mapPackageFromApi>>();
        [...activePackages, ...inactivePackages].forEach((item) => {
          uniqueById.set(item.id, mapPackageFromApi(item));
        });

        setPackagesCollection(Array.from(uniqueById.values()));
      } else {
        const active = packagesActiveFilter === "active";
        const packages = await TourPackageService.getAllPages(ADMIN_PACKAGES_FETCH_LIMIT, active);
        setPackagesCollection(packages.map((item) => mapPackageFromApi(item)));
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo cargar paquetes.");
      setPackagesCollection([]);
    } finally {
      setLoading(false);
    }
  }, [packagesActiveFilter]);

  useEffect(() => {
    void loadPackages();
  }, [loadPackages]);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await LocationsService.getDepartments();
        setDepartments(data);
      } catch {
        setDepartments([]);
      }
    };

    void loadDepartments();
  }, []);

  useEffect(() => {
    const loadProvinces = async () => {
      if (packagesDepartmentFilter === "all") {
        setProvinces([]);
        setDistricts([]);
        return;
      }

      const selectedDepartment = departments.find(
        (department) => department.name === packagesDepartmentFilter,
      );

      if (!selectedDepartment) {
        setProvinces([]);
        setDistricts([]);
        return;
      }

      try {
        const data = await LocationsService.getProvincesByDepartment(selectedDepartment.id);
        setProvinces(data);
      } catch {
        setProvinces([]);
      }
    };

    void loadProvinces();
  }, [packagesDepartmentFilter, departments]);

  useEffect(() => {
    const loadDistricts = async () => {
      if (packagesProvinceFilter === "all") {
        setDistricts([]);
        return;
      }

      const selectedProvince = provinces.find((province) => province.name === packagesProvinceFilter);

      if (!selectedProvince) {
        setDistricts([]);
        return;
      }

      try {
        const data = await LocationsService.getDistrictsByProvince(selectedProvince.id);
        setDistricts(data);
      } catch {
        setDistricts([]);
      }
    };

    void loadDistricts();
  }, [packagesProvinceFilter, provinces]);

  const filteredPackages = useMemo(
    () =>
      filterPackages(packagesCollection, {
        search: packagesSearch,
        activeFilter: packagesActiveFilter,
        departmentFilter: packagesDepartmentFilter,
        provinceFilter: packagesProvinceFilter,
        districtFilter: packagesDistrictFilter,
      }),
    [
      packagesCollection,
      packagesSearch,
      packagesActiveFilter,
      packagesDepartmentFilter,
      packagesProvinceFilter,
      packagesDistrictFilter,
    ],
  );

  const zoneOptions = useMemo(
    () => ({
      departments: departments.map((item) => item.name),
      provinces: provinces.map((item) => item.name),
      districts: districts.map((item) => item.name),
    }),
    [departments, provinces, districts],
  );

  const paginated = useMemo(
    () => paginatePackages(filteredPackages, page, ADMIN_PACKAGES_PAGE_SIZE),
    [filteredPackages, page],
  );

  useEffect(() => {
    if (page > paginated.meta.totalPages) {
      setPage(paginated.meta.totalPages);
    }
  }, [page, paginated.meta.totalPages]);

  return {
    packages: paginated.data,
    meta: paginated.meta,
    page: paginated.meta.page,
    setPage,
    loading,
    error,
    refresh: loadPackages,
    zoneOptions,
  };
}
