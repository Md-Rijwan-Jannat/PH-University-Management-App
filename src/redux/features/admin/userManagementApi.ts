import { TAdmin, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch Admins
    getAllAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/admins",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    // Create Admin
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),

    // Fetch Faculties
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAdmin[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    // Create Admin
    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),

    // Fetch Students
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),
    // Create Student
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddAdminMutation,
  useAddFacultyMutation,
  useAddStudentMutation,
  useGetAllAdminsQuery,
  useGetAllFacultiesQuery,
  useGetAllStudentsQuery,
}: any = userManagementApi;
