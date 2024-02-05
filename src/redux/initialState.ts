import { CommonAsset } from "./Cryptocurency.types";

export interface CryptoState {
  isLoading: boolean;
  isModalOpen: boolean;
  assets: CommonAsset[];
  showCoins: boolean;
  isDrawerOpen: boolean;
  filterValue: string;
}

export const initialState: CryptoState = {
  isLoading: false,
  isModalOpen: false,
  assets: [],
  showCoins: false,
  isDrawerOpen: false,
  filterValue: "",
};
