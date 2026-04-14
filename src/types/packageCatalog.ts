export type LocationOption = {
  value: string;
  label: string;
};

export type CatalogFilterState = {
  searchQuery: string;
  selectedDepartment: string;
  selectedProvince: string;
  selectedDistrict: string;
  selectedCategory: string;
  selectedLevel: string;
  priceRange: [number, number];
};
