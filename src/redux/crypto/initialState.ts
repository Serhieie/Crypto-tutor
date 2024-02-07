import { CommonAsset, Cryptocurrency } from "./Cryptocurency.types";

export interface CryptoState {
  isLoading: boolean;
  isModalOpen: boolean;
  assets: CommonAsset[];
  isCoinShowed: boolean;
  isDrawerOpen: boolean;
  filterValue: string;
  coinForUpdate: Cryptocurrency | null;
  assetToShowId: string | null;
  isChartLineOpen: boolean;
  isChartPieOpen: boolean;
  isTableOpen: boolean;
  isDeleteModalOpen: boolean;
  showPassword: boolean;
  coin: Cryptocurrency | null;
}

export const initialState: CryptoState = {
  isLoading: false,
  isModalOpen: false,
  assets: [],
  isCoinShowed: false,
  isDrawerOpen: false,
  filterValue: "",
  coinForUpdate: null,
  assetToShowId: null,
  isChartLineOpen: false,
  isChartPieOpen: true,
  isTableOpen: false,
  isDeleteModalOpen: false,
  showPassword: false,
  coin: null,
};
