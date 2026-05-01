import type { AdminPackage } from "@/types/adminViews";
import type { TourPackageResponse } from "@/types/tourPackage";

type PackageServices = TourPackageResponse["services"];
type ReservationDays = TourPackageResponse["reservation_days"];
type ItineraryDays = TourPackageResponse["itinerary"]["days"];

export interface AdminPackageDetails {
  id: number;
  name: string;
  description: string;
  destination: string;
  supplierName: string;
  categoryName: string;
  educationLevelName: string;
  price: number;
  days: number;
  minStudents: number;
  active: boolean;
  createdAt: string;
  imagesCount: number;
  promotionsCount: number;
  services: PackageServices;
  images: string[];
  reservationDays: ReservationDays;
  itineraryDays: ItineraryDays;
  supplierVerified?: boolean;
  supplierRuc?: string | null;
}

export function buildPackageDestination(item: Pick<TourPackageResponse, "district">) {
  return [
    item.district.name,
    item.district.province.name,
    item.district.province.department.name,
  ].join(", ");
}

export function mapPackageFromApi(item: TourPackageResponse): AdminPackage {
  return {
    id: item.id,
    name: item.name,
    destination: buildPackageDestination(item),
    providerName: item.supplier.companyName,
    price: item.pricePersona,
    active: item.active,
    categoryName: item.category.name,
    educationLevelName: item.educationLevel.name,
    days: item.days,
    minStudents: item.minStudents,
    createdAt: item.createdAt,
    districtName: item.district.name,
    provinceName: item.district.province.name,
    departmentName: item.district.province.department.name,
  };
}

export function mapPackageDetailsFromApi(item: TourPackageResponse): AdminPackageDetails {
  const supplier = item.supplier as TourPackageResponse["supplier"] & {
    verified?: boolean;
    ruc?: string;
  };

  return {
    id: item.id,
    name: item.name,
    description: item.description,
    destination: buildPackageDestination(item),
    supplierName: item.supplier.companyName,
    categoryName: item.category.name,
    educationLevelName: item.educationLevel.name,
    price: item.pricePersona,
    days: item.days,
    minStudents: item.minStudents,
    active: item.active,
    createdAt: item.createdAt,
    imagesCount: item.images.length,
    promotionsCount: item.promotions.length,
    services: item.services,
    images: item.images.map((image) => image.url),
    reservationDays: item.reservation_days,
    itineraryDays: item.itinerary.days,
    supplierVerified: supplier.verified,
    supplierRuc: supplier.ruc,
  };
}
