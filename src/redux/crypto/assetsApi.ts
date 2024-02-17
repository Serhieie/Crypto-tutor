import { createApi } from "@reduxjs/toolkit/query/react";
import { CommonAsset } from "./Cryptocurency.types";
import axios, { AxiosError } from "axios";

export interface GetAllAssetsResponse {
  result: Array<CommonAsset>;
}

interface GetCoinInterface {
  id: string;
}

export interface UpdateAssetInterface {
  asset: CommonAsset | undefined;
  dataId: string | undefined;
}
export interface UpdateAllAssetsInterface {
  assets: CommonAsset[];
}
export const assetApi = createApi({
  reducerPath: "assetsApi",
  baseQuery: async ({ url, method, body }, { signal }) => {
    try {
      await axios.defaults.headers.common.Authorization;

      const result = await axios.request({
        url,
        method,
        data: body,
        signal,
      });

      return { data: result.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return { error: axiosError.message || "Something went wrong!" };
    }
  },
  tagTypes: ["Assets"],
  endpoints: (builder) => ({
    getAllAssets: builder.query<CommonAsset[], void>({
      query: () => ({ url: "assets" }),
      providesTags: ["Assets"],
    }),

    getAsset: builder.query<CommonAsset, GetCoinInterface>({
      query: ({ id }) => ({ url: `assets/${id}` }),
      providesTags: ["Assets"],
    }),

    addAsset: builder.mutation<CommonAsset, CommonAsset>({
      query: (asset) => ({
        url: "assets",
        method: "POST",
        body: asset,
      }),
      invalidatesTags: ["Assets"],
    }),

    updateAsset: builder.mutation<CommonAsset, UpdateAssetInterface>({
      query: ({ dataId, asset }) => ({
        url: `assets/${dataId}`,
        method: "PUT",
        body: { ...asset },
      }),
      invalidatesTags: ["Assets"],
    }),
    updateAllAssets: builder.mutation<CommonAsset[], CommonAsset[]>({
      query: (assets) => ({
        url: `assets/updateAll`,
        method: "PUT",
        body: assets,
      }),
      invalidatesTags: ["Assets"],
    }),

    deleteAsset: builder.mutation<void, string>({
      query: (id) => ({
        url: `assets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assets"],
    }),
  }),
});

export const {
  useGetAllAssetsQuery,
  useGetAssetQuery,
  useAddAssetMutation,
  useUpdateAssetMutation,
  useUpdateAllAssetsMutation,
  useDeleteAssetMutation,
} = assetApi;
