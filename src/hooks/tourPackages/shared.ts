import { capitalize } from "@/lib/text";
import type { TourPackageResponse } from "@/types/tourPackage";

export const CATALOG_PAGE_SIZE = 9;

export const getPackageDestination = (pkg: TourPackageResponse) => {
  const department = capitalize(pkg.district?.province?.department?.name);
  const province = capitalize(pkg.district?.province?.name);
  const district = capitalize(pkg.district?.name);
  return [department, province, district].filter(Boolean).join(", ");
};
