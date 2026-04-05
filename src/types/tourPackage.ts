export interface TourPackageResponse {
  id: number;
  name: string;
  pricePersona: number;
  days: number;
  minStudents: number;
  description: string;
  active: boolean;
  services: {
    travel_insurance: boolean;
    transport: boolean;
    feeding: boolean;
    lodging: boolean;
  };
  reservation_days: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  itinerary: {
    days: {
      day: number;
      title: string;
      steps: {
        title: string;
        hour: string;
        description: string | null;
        order: number;
      }[];
    }[];
  };
  district: {
    name: string;
    province: {
      name: string;
      department: {
        name: string;
      };
    };
  };
  category: {
    id: number;
    name: string;
  };
  educationLevel: {
    id: number;
    name: string;
  };
  supplier: {
    id: number;
    companyName: string;
  };
  promotions: {
    id: number;
    price: number;
    name: string;
    description: string;
    supplier: {
      id: number;
      companyName: string;
    };
  }[];
  offers: {
    id: number;
    price: number;
    name: string;
    description: string | null;
    discountPercent: number;
    startDate: string;
    endDate: string;
    isGlobal: boolean;
  }[];
  images: {
    id: number;
    url: string;
  }[];
  createdAt: string;
}

export interface TourPackageListResponse {
  data: TourPackageResponse[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface TourPackageMutationResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface TourPackageStatusResponse {
  status: string;
  message: string;
}

export interface UpdateTourPackageData {
  id: number;
  pricePersona: number;
}

export interface TourPackageCreateRequest {
  name: string;
  districtId: number;
  pricePersona: number;
  days: number;
  minStudents: number;
  categoryPackageId: number;
  educationLevelId: number;
  description: string;
  supplierId: number;
  services: {
    travel_insurance: boolean;
    transport: boolean;
    feeding: boolean;
    lodging: boolean;
  };
  reservation_days: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  itinerary: {
    days: {
      day: number;
      title: string;
      steps: {
        title: string;
        hour: string;
        description: string;
        order: number;
      }[];
    }[];
  };
}

export interface TourPackageUpdateRequest {
  name?: string;
  districtId?: number;
  pricePersona?: number;
  days?: number;
  minStudents?: number;
  categoryPackageId?: number;
  educationLevelId?: number;
  description?: string;
  supplierId?: number;
  services?: {
    travel_insurance?: boolean;
    transport?: boolean;
    feeding?: boolean;
    lodging?: boolean;
  };
  reservation_days?: {
    monday?: boolean;
    tuesday?: boolean;
    wednesday?: boolean;
    thursday?: boolean;
    friday?: boolean;
    saturday?: boolean;
    sunday?: boolean;
  };
}
