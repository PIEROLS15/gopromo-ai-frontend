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
  category: {
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
}
