import React from "react";
import { Cryptocurrency } from "../../components/AppSidebar/AppSideBar.types";
import { CommonAsset } from "../../constants/fakeApi";

interface CryptoContextProviderProps {
  children: React.ReactNode;
}

export interface CryptoContextProps {
  assets: CommonAsset[];
  data: Cryptocurrency[] | undefined;
  isLoading: boolean;
  addAsset: (newAsset: CommonAsset) => void;
}

declare const CryptoContext: React.Context<CryptoContextProps>;

declare const CryptoContextProvider: React.FC<CryptoContextProviderProps>;

export { CryptoContext, CryptoContextProvider };
