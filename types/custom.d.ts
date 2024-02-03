import React from "react";
import { CommonAsset } from "../../constants/fakeApi";

interface CryptoContextProviderProps {
  children: React.ReactNode;
}

export interface CryptoContextProps {
  assets: CommonAsset[];
  data: {
    result: [];
  };
  isLoading: boolean;
}

declare const CryptoContext: React.Context<CryptoContextProps>;

declare const CryptoContextProvider: React.FC<CryptoContextProviderProps>;

export { CryptoContext, CryptoContextProvider };
