import { CommonAsset } from "../constants/fakeApi";
import { cryptoAssets } from "../constants/fakeApi";

export interface CryptoState {
  isLoading: boolean;
  isModalOpen: boolean;
  assets: CommonAsset[];
}

export const initialState: CryptoState = {
  isLoading: false,
  isModalOpen: false,
  assets: cryptoAssets,
};
