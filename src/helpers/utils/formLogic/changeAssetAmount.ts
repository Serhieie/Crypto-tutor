import type {
  CommonAsset,
  Cryptocurrency,
} from "../../../redux/crypto/Cryptocurency.types";
import { calculateProfitPercentage } from "../../calculateProfitPercentage";

export const changeAssetAmount = (
  stateAssets: CommonAsset[],
  coin: Cryptocurrency,
  amount: number
): CommonAsset[] | undefined => {
  if (!stateAssets || !coin) {
    return stateAssets || [];
  }

  return stateAssets.map((asset) => {
    if (asset.id === coin.id) {
      const growPercent = calculateProfitPercentage(asset.price / amount, coin.price);
      return {
        ...asset,
        growPercent: growPercent,
        amount: amount,
        totalAmount: amount * coin.price,
        totalProfit: amount * coin.price - asset.price,
      };
    }
    return asset;
  });
};
