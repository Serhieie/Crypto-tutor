import { calculateProfitPercentage } from "../../calculateProfitPercentage";
import type { CommonAsset } from "../../../redux/crypto/Cryptocurency.types";
import type { Cryptocurrency } from "../../../redux/crypto/Cryptocurency.types";
import { isAssetMustBeChanged } from "./assetMustBeChanged";
import { UpdateAssetInterface } from "../../../redux/crypto/assetsApi";
import type { GetAllCryptoResponse } from "../../../redux/crypto/cryptoApi";

export const mapAssets = (
  stateAssets: CommonAsset[],
  cryptocurrencyData: GetAllCryptoResponse | undefined,
  addAssetMutation: (asset: CommonAsset) => void
): CommonAsset[] | undefined => {
  if (stateAssets && cryptocurrencyData) {
    return stateAssets.map((asset) => {
      const coin = cryptocurrencyData.result.find((c) => c.id === asset.assetId);
      if (coin) {
        const growPercent = calculateProfitPercentage(asset.price ?? 0, coin.price ?? 0);
        const obj: CommonAsset = {
          ...asset,
          date: String(asset.date),
          icon: coin.icon,
          symbol: coin.symbol,
          grow:
            asset.price !== undefined && coin.price !== undefined
              ? asset.price <= coin.price
              : false,
          price: asset.price * asset.amount,
          growPercent: growPercent,
          totalAmount: (asset.amount ?? 0) * (coin.price ?? 0),
          priceAverage: asset.price,
          totalProfit:
            (asset.amount ?? 0) * (coin.price ?? 0) -
            (asset.amount ?? 0) * (asset.price ?? 0),
          name: coin.name,
        };

        addAssetMutation(obj);
        return obj;
      }
      return asset;
    });
  }
  return undefined;
};

export const isAssetInState = (
  dataAssets: CommonAsset[] | undefined,
  newAsset: CommonAsset,
  coin: Cryptocurrency | undefined,
  addAssetMutation: (asset: CommonAsset) => void,
  updateAssetMutation: (asset: UpdateAssetInterface) => void,
  data: GetAllCryptoResponse | undefined
) => {
  if (dataAssets) {
    let dataId: string | undefined = "";
    const existingAssetIndex = dataAssets.findIndex((asset) => {
      if (asset.assetId === newAsset.assetId) {
        dataId = asset._id;
      }
      return asset.assetId === newAsset.assetId;
    });
    if (existingAssetIndex !== -1) {
      //adding asset by calculating all needed keys
      const updatedAssets = isAssetMustBeChanged(
        dataAssets,
        newAsset,
        coin,
        existingAssetIndex
      );
      updateAssetMutation({ dataId, asset: updatedAssets });
      return;
    } else {
      //creating new asset
      mapAssets([newAsset], data, addAssetMutation);
      return;
    }
  }
};
