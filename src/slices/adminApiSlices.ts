import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ADMIN_URL = "";

export const adminApiSlice = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: ADMIN_URL }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/auth",
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

  }),
});

export const {
  reducer: adminApiReducer,
  middleware: adminApiMiddleware,
  useAdminLoginMutation,
  useAdminLogoutMutation,
} = adminApiSlice;
