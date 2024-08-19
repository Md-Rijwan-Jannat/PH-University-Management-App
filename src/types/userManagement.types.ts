import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "./academicManagement.types";

// student related type
export type TStudent = {
  _id: string;
  id: string;
  user: TUser;
  name: TName;
  gander: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage: string;
  admissionSemester: TAcademicSemester;
  isDeleted: boolean;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  fullName: string;
};

export type TUser = {
  _id: string;
  id: string;
  email: string;
  needsChangePassword: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TName = {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
};

export type TMetaData = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

// faculty related type
export type TFaculty = {
  _id: string;
  id: string;
  user: TUser;
  name: TName;
  gander: string;
  religion: string;
  bloodGroup: string;
  email: string;
  contactNo: string;
  emergencyNo: string;
  dateOfBirth: string;
  occupation: string;
  presentAddress: string;
  permanentAddress: string;
  academicDepartment: TAcademicDepartment;
  academicFaculty: TAcademicFaculty;
  profileImage: string;
  fullName?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

// admin related type
export type TAdmin = {
  _id: string;
  id: string;
  user: string;
  name: TName;
  gender: string;
  religion: string;
  bloodGroup: string;
  email: string;
  contactNo: string;
  emergencyNo: string;
  dateOfBirth: string;
  occupation: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  fullName?: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};
