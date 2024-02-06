import { calculateProfitPercentage } from "../../calculateProfitPercentage";
import type { CommonAsset } from "../../../redux/Cryptocurency.types";
import type { Cryptocurrency } from "../../../redux/Cryptocurency.types";
import { isAssetMustBeChanged } from "./assetMustBeChanged";
import { changeAssets } from "../../../redux/dashboardSlice";
import type { GetAllCryptoResponse } from "../../../redux/cryptoApi";
import { Dispatch } from "redux";

export const mapAssets = (
  stateAssets: CommonAsset[],
  cryptocurrencyData: GetAllCryptoResponse | undefined
): CommonAsset[] | undefined => {
  if (stateAssets && cryptocurrencyData) {
    return stateAssets.map((asset) => {
      const coin = cryptocurrencyData.result.find((c) => c.id === asset.id);
      if (coin) {
        const growPercent = calculateProfitPercentage(asset.price ?? 0, coin.price ?? 0);
        const obj: CommonAsset = {
          ...asset,
          icon: coin.icon,
          symbol: coin.symbol,
          grow:
            asset.price !== undefined && coin.price !== undefined
              ? asset.price <= coin.price
              : false,
          price: asset.price * asset.amount,
          growPercent: growPercent,
          totalAmount: (asset.amount ?? 0) * (coin.price ?? 0),
          priceAvg: asset.price,
          totalProfit:
            (asset.amount ?? 0) * (coin.price ?? 0) -
            (asset.amount ?? 0) * (asset.price ?? 0),
          name: coin.name,
        };
        return obj;
      }
      return asset;
    });
  }
  return undefined;
};

export const isAssetInState = (
  stateAssets: CommonAsset[] | undefined,
  newAsset: CommonAsset,
  coin: Cryptocurrency | undefined,
  dispatch: Dispatch,
  data: GetAllCryptoResponse | undefined
) => {
  if (stateAssets) {
    //are newAsset in Portfolio?
    const existingAssetIndex = stateAssets.findIndex((asset) => asset.id === newAsset.id);
    if (existingAssetIndex !== -1) {
      //adding asset by calculating all needed keys
      const updatedAssets = isAssetMustBeChanged(
        stateAssets,
        newAsset,
        coin,
        existingAssetIndex
      );
      return dispatch(changeAssets(updatedAssets || []));
    } else {
      //creating new asset
      const mappedAsset = mapAssets([newAsset], data);
      return dispatch(
        changeAssets(
          mappedAsset ? [...stateAssets, ...mappedAsset] : [...stateAssets, newAsset]
        )
      );
    }
  }
};
