import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://p-h-u-management-apis.vercel.app/api/v1",
    credentials: "include",
  }),
  endpoints: () => ({}),
});