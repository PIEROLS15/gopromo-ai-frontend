export interface TourPackageResponse {
  id: number;
  name: string;
  pricePersona: number;
  description: string;
  active: boolean;
  district: {
    name: string;
    province: {
      name: string;
      department: {
        name: string;
      };
    };
  };
  // Prisma: categoryPackage, not category
  categoryPackage?: {
    id: number;
    name: string;
  };
  educationLevel: {
    id: number;
    name: string;
  };
  images: {
    url: string;
  }[];
  days?: number;
  minStudents?: number;
  supplier?: {
    id: number;
    companyName?: string;
  };
  promotions?: any[];
  offers?: any[];
  createdAt?: string;
  updatedAt?: string;
}
