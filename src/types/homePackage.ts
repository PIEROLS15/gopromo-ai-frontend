export interface Package {
  id: number;
  title: string;
  destination: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  minStudentsLabel: string;
  level: string;
  verified: boolean;
  type: "aventura" | "educativo" | "cultural" | "relajación";
}
