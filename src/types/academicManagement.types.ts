export type TAcademicSemester = {
  _id?: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type TAcademicFaculty = {
  _id: string;
  name: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
