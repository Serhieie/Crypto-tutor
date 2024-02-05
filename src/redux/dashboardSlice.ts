import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { initialState } from "./initialState";
import { createSelector } from "reselect";
import type { CommonAsset } from "./Cryptocurency.types";
import type { CryptoState } from "./initialState";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setIsLoading(state) {
      state.isLoading = !state.isLoading;
    },
    setIsModalOpen(state) {
      state.isModalOpen = !state.isLoading;
    },
    setIsCoinsShowed(state) {
      state.showCoins = !state.showCoins;
    },
    setIsDrawerOpen(state, action: PayloadAction<boolean>) {
      state.isDrawerOpen = action.payload;
    },
    changeAssets(state, action: PayloadAction<CommonAsset[]>) {
      state.assets = [...action.payload];
    },
    removeAsset(state, action: PayloadAction<string>) {
      state.assets = state.assets.filter((asset) => asset.id !== action.payload);
    },
    changeFilterValue(state, action: PayloadAction<string>) {
      state.filterValue = action.payload;
    },
  },
});

const persistConfig = {
  key: "dashboard",
  storage,
};

export const persistedDashboardReducer = persistReducer(
  persistConfig,
  dashboardSlice.reducer
);

export const getDashboardState = (state: { dashboard: CryptoState }) => state.dashboard;

export const getAssets = createSelector(
  getDashboardState,
  (dashboard) => dashboard.assets
);

export const {
  setIsLoading,
  changeAssets,
  setIsModalOpen,
  removeAsset,
  setIsCoinsShowed,
  setIsDrawerOpen,
  changeFilterValue,
} = dashboardSlice.actions;
// export const getAssets = (state: { dashboard: CryptoState }) => ({
//   assets: state.dashboard.assets,
// });
export const getIsLoading = (state: { dashboard: CryptoState }) =>
  state.dashboard.isLoading;
export const getIsModalOpen = (state: { dashboard: CryptoState }) =>
  state.dashboard.isModalOpen;
export const getIsCoinsShowed = (state: { dashboard: CryptoState }) =>
  state.dashboard.showCoins;
export const getIsDrawerOpen = (state: { dashboard: CryptoState }) =>
  state.dashboard.isDrawerOpen;
export const getFilterValue = (state: { dashboard: CryptoState }) =>
  state.dashboard.filterValue;

export default dashboardSlice.reducer;
