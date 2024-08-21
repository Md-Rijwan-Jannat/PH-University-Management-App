import { TCourse, TRegisteredSemester, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch academic Semester
    getAllRegisteredSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TRegisteredSemester[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ["semester"],
    }),
    // Create academic Semester
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),
    // Create academic Semester
    updateSemesterRegistrationStatus: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),
    // Fetch All preRequisitesCourses
    getAllPreRequisitesCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ["courses"],
    }),
    // Create academic Semester
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
    // Assign faculty on course
    assignFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.id}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["courses"],
    }),
    // Assign faculty on course
    deleteFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.id}/remove-faculties`,
        method: "DELETE",
        body: args.data,
      }),
      invalidatesTags: ["courses"],
    }),
    // Fetch All assign faculties
    getAllAssignFaculties: builder.query({
      query: (courseId) => {
        return {
          url: `/courses/${courseId}/get-assign-faculties`,
          method: "GET",
        };
      },

      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ["courses"],
    }),
    // Create a offered course
    addOfferedCourse: builder.mutation({
      query: (data) => ({
        url: "/offered-courses/create-offered-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["offeredCourse"],
    }),
    // Fetch All preRequisitesCourses
    getAllOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/offered-courses",
          method: "GET",
          params: params,
        };
      },

      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ["offeredCourse"],
    }),
    // update offered course
    updateOfferedCourse: builder.mutation({
      query: (args) => ({
        url: `/offered-courses/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["offeredCourse"],
    }),
    // delete offered course
    deleteOfferedCourse: builder.mutation({
      query: (offeredCourseId) => ({
        url: `/offered-courses/${offeredCourseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["offeredCourse"],
    }),
  }),
});

export const {
  useGetAllRegisteredSemesterQuery,
  useAddSemesterRegistrationMutation,
  useUpdateSemesterRegistrationStatusMutation,
  useGetAllPreRequisitesCoursesQuery,
  useAddCourseMutation,
  useAssignFacultiesMutation,
  useDeleteFacultiesMutation,
  useGetAllAssignFacultiesQuery,
  useAddOfferedCourseMutation,
  useGetAllOfferedCoursesQuery,
  useUpdateOfferedCourseMutation,
  useDeleteOfferedCourseMutation,
}: any = courseManagementApi;
