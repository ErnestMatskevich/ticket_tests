import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Ticket } from "./types";
import { baseQuery } from "../baseQuerry";

export const ticketsApi = createApi({
  reducerPath: "tickets",
  tagTypes: ["tickets"],
  baseQuery,
  endpoints: (builder) => ({
    fetchTickets: builder.query<Ticket[], string>({
      query: (post) => ({
        url: "/tickets",
        params: {},
      }),
      providesTags: () => ["tickets"],
    }),
    createTicket: builder.mutation<string, Ticket>({
      query: (data) => ({
        url: `/tickets`,
        method: "post",
        body: data,
      }),

      invalidatesTags: ["tickets"],
    }),
    updateTicket: builder.mutation<string, Ticket>({
      query: (data) => ({
        url: `/tickets/${data.id}`,
        method: "put",
        body: data,
      }),

      invalidatesTags: ["tickets"],
    }),
  }),
});
export const {
  useCreateTicketMutation,
  useFetchTicketsQuery,
  useLazyFetchTicketsQuery,
  useUpdateTicketMutation,
} = ticketsApi;
