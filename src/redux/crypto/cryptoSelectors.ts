import { CryptoState } from "./initialState";

export const getIsLoading = (state: { dashboard: CryptoState }) =>
  state.dashboard.isLoading;
export const getIsModalOpen = (state: { dashboard: CryptoState }) =>
  state.dashboard.isModalOpen;
export const getIsDeleteModalOpen = (state: { dashboard: CryptoState }) =>
  state.dashboard.isDeleteModalOpen;
export const getIsCoinsShowed = (state: { dashboard: CryptoState }) =>
  state.dashboard.isCoinShowed;
export const getIsDrawerOpen = (state: { dashboard: CryptoState }) =>
  state.dashboard.isDrawerOpen;
export const getFilterValue = (state: { dashboard: CryptoState }) =>
  state.dashboard.filterValue;
export const getCoinForUpdate = (state: { dashboard: CryptoState }) =>
  state.dashboard.coinForUpdate;
export const getAssetToShow = (state: { dashboard: CryptoState }) =>
  state.dashboard.assetToShowId;
export const getIsChartLineOpen = (state: { dashboard: CryptoState }) =>
  state.dashboard.isChartLineOpen;
export const getIsChartPieOpen = (state: { dashboard: CryptoState }) =>
  state.dashboard.isChartPieOpen;
export const getIsTableOpen = (state: { dashboard: CryptoState }) =>
  state.dashboard.isTableOpen;
export const getShowPassword = (state: { dashboard: CryptoState }) =>
  state.dashboard.showPassword;
export const getCoin = (state: { dashboard: CryptoState }) => state.dashboard.coin;
