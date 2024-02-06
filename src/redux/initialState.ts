import { CommonAsset, Cryptocurrency } from "./Cryptocurency.types";

export interface CryptoState {
  isLoading: boolean;
  isModalOpen: boolean;
  assets: CommonAsset[];
  showCoins: boolean;
  isDrawerOpen: boolean;
  filterValue: string;
  coinForUpdate: Cryptocurrency | null;
  assetToShow: string | null;
  isChartLineOpen: boolean;
  isChartPieOpen: boolean;
  isTableOpen: boolean;
  isDeleteModalOpen: boolean;
}

export const initialState: CryptoState = {
  isLoading: false,
  isModalOpen: false,
  assets: [],
  showCoins: false,
  isDrawerOpen: false,
  filterValue: "",
  coinForUpdate: null,
  assetToShow: null,
  isChartLineOpen: false,
  isChartPieOpen: true,
  isTableOpen: false,
  isDeleteModalOpen: false,
};
