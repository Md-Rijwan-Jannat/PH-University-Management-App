import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.types";
import { TFaculty } from "./userManagement.types";

export type TRegisteredSemester = {
  _id: string;
  academicSemester: TAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredits: number;
  maxCredits: number;
  createdAt: string;
  updatedAt: string;
};

export type TPreRequisitesCourse = {
  course: TCourse;
  isDeleted: boolean;
  _id: string;
};

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisitesCourses: TPreRequisitesCourse2[];
  __v: number;
};

export type TPreRequisitesCourse2 = {
  course: string;
  isDeleted: boolean;
  _id: string;
};

export type TOfferedCourse = {
  _id: string;
  semesterRegistration: TRegisteredSemester;
  academicSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  course: TCourse;
  faculty: TFaculty;
  maxCapacity: number;
  days: string[];
  session: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};
