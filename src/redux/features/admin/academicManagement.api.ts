import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch academic Semester
    getAllAcademicSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    // Create academic Semester
    addAcademicSemester: builder.mutation<void, TAcademicSemester>({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    // Fetch academic Department
    getAllAcademicFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/academic-faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    // Create academic Department
    addAcademicFaculty: builder.mutation<void, TAcademicFaculty>({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    // Fetch academic Department
    getAllAcademicDepartments: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/academic-departments",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    // Create academic Department
    addAcademicDepartment: builder.mutation<void, TAcademicDepartment>({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllAcademicSemestersQuery,
  useAddAcademicSemesterMutation,
  useGetAllAcademicFacultiesQuery,
  useAddAcademicFacultyMutation,
  useGetAllAcademicDepartmentsQuery,
  useAddAcademicDepartmentMutation,
}: any = academicManagementApi;
