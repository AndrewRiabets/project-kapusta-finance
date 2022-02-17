import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportAPI = createApi({
  reducerPath: "reportAPI",
  tagTypes: ["Report"],
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://kapusta-finance.herokuapp.com/api/statistic",
    baseUrl: 'http://localhost:3001/api/statistic',
  }),
  endpoints: (builder) => ({
    fetchSummary: builder.mutation({
      query: ({ accessToken }) => ({
        url: `/summary/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Report"],
    }),

    fetchCategoryProfit: builder.mutation({
      query: ({ accessToken, date }) => ({
        url: `/category-grouping/profit/${date}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Report"],
    }),

    fetchCategoryCosts: builder.mutation({
      query: ({ accessToken, date }) => ({
        url: `/category-grouping/costs/${date}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Report"],
    }),

    fetchCategoryItems: builder.mutation({
      query: ({ accessToken, categoryId, date }) => ({
        url: `/items-grouping/${categoryId}?date=${date}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Report"],
    }),
  }),
});

export const {
  useFetchSummaryMutation,
  useFetchCategoryProfitMutation,
  useFetchCategoryCostsMutation,
  useFetchCategoryItemsMutation,
} = reportAPI;
