import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cryptocurrency } from "./Cryptocurency.types";

export interface GetAllCryptoResponse {
  result: Array<Cryptocurrency>;
}

interface GetCoinInterface {
  id: string;
}

interface GetChartInterface {
  id: string;
  period: string;
}

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://openapiv1.coinstats.app/",
    headers: {
      accept: "application/json",
      "X-API-KEY": "itVnfqF7OIBB8hRd8Ph/L7P/27ZlKKtqrqNCARg/sNM=",
    },
  }),
  tagTypes: ["Crypto"],
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getAllCrypto: builder.query<GetAllCryptoResponse, void>({
      query: () => `coins?limit=120`,
      providesTags: ["Crypto"],
      keepUnusedDataFor: 60,
    }),

    getCrypto: builder.query<Cryptocurrency, GetCoinInterface>({
      query: ({ id }) => `coins/${id}`,
      providesTags: ["Crypto"],
    }),

    getCryptoChart: builder.query<number[], GetChartInterface>({
      query: ({ id, period }) => `coins/${id}/charts?period=${period}`,
      providesTags: ["Crypto"],
    }),
  }),
});

export const { useGetAllCryptoQuery, useGetCryptoQuery, useGetCryptoChartQuery } =
  cryptoApi;
