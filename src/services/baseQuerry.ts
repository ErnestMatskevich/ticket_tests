import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

export const baseQuery = fetchBaseQuery({
  // baseUrl: process.env.REACT_APP_BACKEND_URL
  baseUrl: "http://localhost:3001/api",
  prepareHeaders: (headers, { getState }) => {
    const {
      persistedReducer: {
        authSlice: { token },
      },
    } = getState() as RootState;

    headers.set("Authorization", `${token}`);

    return headers;
  },
});
