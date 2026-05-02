import type { AdminPackage } from "@/types/adminViews";
import type { PackagesActiveFilter } from "@/types/adminViews";

export const ADMIN_PACKAGES_PAGE_SIZE = 10;
export const ADMIN_PACKAGES_FETCH_LIMIT = 100;

export function createPackagesMeta(total: number, page: number, limit: number) {
  return {
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}

export function filterPackagesBySearch(packages: AdminPackage[], rawSearch: string) {
  const normalizedSearch = rawSearch.trim().toLowerCase();

  if (!normalizedSearch) return packages;

  return packages.filter((item) => {
    return (
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.providerName.toLowerCase().includes(normalizedSearch) ||
      item.destination.toLowerCase().includes(normalizedSearch)
    );
  });
}

export function filterPackages(
  packages: AdminPackage[],
  params: {
    search: string;
    activeFilter: PackagesActiveFilter;
    departmentFilter: string;
    provinceFilter: string;
    districtFilter: string;
  },
) {
  const searched = filterPackagesBySearch(packages, params.search);

  return searched.filter((item) => {
    const matchesActive =
      params.activeFilter === "all" ||
      (params.activeFilter === "active" ? item.active : !item.active);

    const matchesDepartment =
      params.departmentFilter === "all" || item.departmentName === params.departmentFilter;

    const matchesProvince =
      params.provinceFilter === "all" || item.provinceName === params.provinceFilter;

    const matchesDistrict =
      params.districtFilter === "all" || item.districtName === params.districtFilter;

    return matchesActive && matchesDepartment && matchesProvince && matchesDistrict;
  });
}

export function getPackageZoneOptions(packages: AdminPackage[]) {
  const departments = Array.from(new Set(packages.map((item) => item.departmentName))).sort();
  const provinces = Array.from(new Set(packages.map((item) => item.provinceName))).sort();
  const districts = Array.from(new Set(packages.map((item) => item.districtName))).sort();

  return { departments, provinces, districts };
}

export function paginatePackages(packages: AdminPackage[], page: number, limit: number) {
  const meta = createPackagesMeta(packages.length, page, limit);
  const safePage = Math.min(Math.max(1, page), meta.totalPages);
  const from = (safePage - 1) * limit;

  return {
    data: packages.slice(from, from + limit),
    meta: createPackagesMeta(packages.length, safePage, limit),
  };
}
