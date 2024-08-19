import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { IErrorResponse } from "../../types";

const apiUrl = "http://localhost:5000";

const baseQuery = fetchBaseQuery({
  baseUrl: `${apiUrl}/api/v1`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status) {
    const errorData = result.error.data as IErrorResponse;

    if (result.error.status === 404) {
      toast.error(errorData.message);
    }
    if (result.error.status === 400) {
      toast.error(errorData.errorSources?.[0]?.message);
    }
    if (result.error.status === 409) {
      toast.error(errorData.message);
    }

    console.log(result.error);
    if (result.error.status === 401) {
      const res = await fetch(`${apiUrl}/api/v1/auth/refresh-token`, {
        method: "POST",
        credentials: "include", // Ensure cookies are included
      });

      const refreshData = await res.json();

      if (refreshData?.data?.accessToken) {
        const user = (api.getState() as RootState).auth?.user;
        const token = refreshData?.data?.accessToken;

        api.dispatch(
          setUser({
            user,
            token: token,
          })
        );

        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error("Failed to refresh token:", refreshData.message);
        api.dispatch(logout());
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
