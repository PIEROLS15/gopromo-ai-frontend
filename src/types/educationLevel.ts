export type EducationLevel = {
  id: number;
  name: string;
};

export type EducationLevelListResponse = {
  data: EducationLevel[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
