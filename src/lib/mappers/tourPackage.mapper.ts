import { TourPackageResponse } from "@/types/tourPackage";
import { Package } from "@/components/home/featuredPackage";

export const mapTourPackageToHome = (
  pkg: TourPackageResponse
): Package => {
  return {
    id: pkg.id,
    title: pkg.name,
    destination: `${pkg.district.province.department.name} - ${pkg.district.name}`,
    image: pkg.images?.[0]?.url || "/placeholder.jpg",
    price: pkg.pricePersona,
    duration: "2 días", // temporal hasta que backend lo tenga
    groupSize: "20-40 estudiantes", // temporal
    rating: 4.8, // temporal
    reviews: 0,
    level: pkg.educationLevel.name,
    verified: true,
    type: pkg.category.name.toLowerCase() as any,
  };
};
