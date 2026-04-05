export interface TravelPackage {
  id: string;
  name: string;
  destination: string;
  duration: string;
  price: number;
  description: string;
  image: string;
  category: "aventura" | "educativo" | "cultural" | "relajacion";
  level: "primaria" | "secundaria" | "superior";
  provider: {
    id: string;
    name: string;
    verified: boolean;
    ruc: string;
  };
  included: string[];
  highlights: string[];
}

export interface Promotion {
  id: string;
  packageId: string;
  name: string;
  description: string;
  price: number;
}

export interface Partner {
  name: string;
  logo: string;
}
