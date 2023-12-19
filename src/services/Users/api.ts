import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "./types";
import { baseQuery } from "../baseQuerry";

export const usersApi = createApi({
  reducerPath: "users",
  tagTypes: ["users"],
  baseQuery,
  endpoints: (builder) => ({
    fetchUsers: builder.query<User[], string>({
      query: (post) => ({
        url: "/users",
        params: {},
      }),
      providesTags: () => ["users"],
    }),
    createUser: builder.mutation<string, User>({
      query: (data) => ({
        url: `/users`,
        method: "post",
        body: data,
      }),

      invalidatesTags: ["users"],
    }),
  }),
});
export const {
  useCreateUserMutation,
  useFetchUsersQuery,
  useLazyFetchUsersQuery,
} = usersApi;
