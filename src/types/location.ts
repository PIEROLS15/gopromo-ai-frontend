export type Department = {
  id: number;
  name: string;
};

export type Province = {
  id: number;
  name: string;
  departmentId: number;
};

export type District = {
  id: number;
  name: string;
  provinceId: number;
};
