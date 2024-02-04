import { CommonAsset } from "./Cryptocurency.types";

export interface CryptoState {
  isLoading: boolean;
  isModalOpen: boolean;
  assets: CommonAsset[];
}

export const initialState: CryptoState = {
  isLoading: false,
  isModalOpen: false,
  assets: [],
};
