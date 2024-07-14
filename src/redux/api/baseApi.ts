import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";

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
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
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

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
