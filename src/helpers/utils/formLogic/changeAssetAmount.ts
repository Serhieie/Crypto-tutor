import type {
  CommonAsset,
  Cryptocurrency,
} from "../../../redux/crypto/Cryptocurency.types";
import { calculateProfitPercentage } from "../../calculateProfitPercentage";

export const changeAssetAmount = (
  stateAssets: CommonAsset[] | undefined,
  coin: Cryptocurrency,
  amount: number
): CommonAsset | undefined => {
  const assetFinded = stateAssets?.find((asset) => asset.assetId === coin.id);
  if (!assetFinded) return;
  const growPercent = calculateProfitPercentage(assetFinded.price / amount, coin.price);
  const assetToUpdate = {
    ...assetFinded,
    growPercent: growPercent,
    amount: amount,
    totalAmount: amount * coin.price,
    totalProfit: amount * coin.price - assetFinded.price,
  };
  return assetToUpdate;
};
