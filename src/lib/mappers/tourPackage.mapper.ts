import { TourPackageResponse } from "@/types/tourPackage";
import { Package } from "@/types/homePackage";

export const mapTourPackageToHome = (
  pkg: TourPackageResponse
): Package => {
  // Helper to capitalize only the first letter of each name and lowercase the rest
  const cap = (s?: string) => {
    if (!s) return "";
    const t = String(s);
    return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
  };
  const deptName = cap(pkg.district?.province?.department?.name);
  const provName = cap(pkg.district?.province?.name);
  const distName = cap(pkg.district?.name);
  const destination = [deptName, provName, distName].filter((n) => n).join(", ");

  return {
    id: pkg.id,
    title: pkg.name,
    destination,
    image: pkg.images?.[0]?.url || "/placeholder.jpg",
    price: pkg.pricePersona,
    duration: `${pkg.days ?? 0} días`,
    minStudentsLabel: `Mínimo ${pkg.minStudents ?? 0} estudiantes`,
    level: pkg.educationLevel.name,
    verified: true,
    type: pkg.category.name.toLowerCase() as any,
  } as Package;
};
