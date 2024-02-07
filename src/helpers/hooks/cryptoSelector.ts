import { useSelector } from "react-redux";
import { getAssets } from "../../redux/crypto/dashboardSlice";
import type { CryptoState } from "../../redux/crypto/initialState";
import type { Cryptocurrency } from "../../redux/crypto/Cryptocurency.types";
import { CommonAsset } from "../../redux/crypto/Cryptocurency.types";
import {
  getIsLoading,
  getIsModalOpen,
  getIsDeleteModalOpen,
  getIsCoinsShowed,
  getIsDrawerOpen,
  getFilterValue,
  getCoinForUpdate,
  getAssetToShow,
  getIsChartLineOpen,
  getIsChartPieOpen,
  getIsTableOpen,
  getShowPassword,
  getCoin,
} from "../../redux/crypto/cryptoSelectors";

export const useCryptoState = (): CryptoState => {
  const assets: CommonAsset[] = useSelector(getAssets);
  const isLoading: boolean = useSelector(getIsLoading);
  const isModalOpen: boolean = useSelector(getIsModalOpen);
  const isDeleteModalOpen: boolean = useSelector(getIsDeleteModalOpen);
  const isCoinShowed: boolean = useSelector(getIsCoinsShowed);
  const isDrawerOpen: boolean = useSelector(getIsDrawerOpen);
  const filterValue: string = useSelector(getFilterValue);
  const coinForUpdate: Cryptocurrency | null = useSelector(getCoinForUpdate);
  const assetToShowId: string | null = useSelector(getAssetToShow);
  const isChartLineOpen: boolean = useSelector(getIsChartLineOpen);
  const isChartPieOpen: boolean = useSelector(getIsChartPieOpen);
  const isTableOpen: boolean = useSelector(getIsTableOpen);
  const showPassword: boolean = useSelector(getShowPassword);
  const coin: Cryptocurrency | null = useSelector(getCoin);
  return {
    assets,
    isLoading,
    isModalOpen,
    isDeleteModalOpen,
    isCoinShowed,
    isDrawerOpen,
    filterValue,
    coinForUpdate,
    assetToShowId,
    isChartLineOpen,
    isChartPieOpen,
    isTableOpen,
    showPassword,
    coin,
  };
};
