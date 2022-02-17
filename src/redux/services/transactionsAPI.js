import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  tagTypes: ["Banking"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://kapusta-finance.herokuapp.com/api/banking",
  }),
  endpoints: (builder) => ({
    fetchResetBalance: builder.mutation({
      query: ({ accessToken, newBalance }) => ({
        url: `/reset-balance`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: {...newBalance}
      }),
      invalidatesTags: ["Banking"],
    }),

    fetchAllTransactions: builder.mutation({
      query: (accessToken) => ({
        url: `/get-transactions?reception=all`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Banking"],
    }),

    fetchProfitTransactions: builder.mutation({
      query: (accessToken) => ({
        url: `/get-transactions?reception=profit`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Banking"],
    }),

    fetchCostsTransactions: builder.mutation({
      query: (accessToken) => ({
        url: `/get-transactions?reception=costs`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Banking"],
    }),

    addTransaction: builder.mutation({
      query: ({ accessToken, newTransaction }) => ({
        url: `/add-transaction`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: { ...newTransaction },
      }),
      invalidatesTags: ["Banking"],
    }),

    deleteTransaction: builder.mutation({
      query: ({ accessToken, delTransactionId }) => ({
        url: `/remove-transaction/${delTransactionId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Banking"],
    }),
  }),
});
export const {
  useFetchResetBalanceMutation,
  useAddTransactionMutation,
  useFetchAllTransactionsMutation,
  useDeleteTransactionMutation,
  useFetchCostsTransactionsMutation,
  useFetchProfitTransactionsMutation,
} = transactionsApi;
