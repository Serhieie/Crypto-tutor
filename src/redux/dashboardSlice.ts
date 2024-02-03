import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { initialState } from "./initialState";
import type { CommonAsset } from "../constants/fakeApi";
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
    changeAssets(state, action: PayloadAction<CommonAsset[]>) {
      state.assets = [...state.assets, ...action.payload];
    },
  },
});

const persistConfig = {
  key: "dashboard",
  storage,
  blacklist: ["isLoading", "isModalOpen"],
};

export const persistedDashboardReducer = persistReducer(
  persistConfig,
  dashboardSlice.reducer
);

export const { setIsLoading, changeAssets, setIsModalOpen } = dashboardSlice.actions;
export const getAssets = (state: { dashboard: CryptoState }) => state.dashboard.assets;
export const getIsLoading = (state: { dashboard: CryptoState }) =>
  state.dashboard.isLoading;
export const getIsModalOpen = (state: { dashboard: CryptoState }) =>
  state.dashboard.isModalOpen;

export default dashboardSlice.reducer;
