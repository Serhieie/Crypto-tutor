import { calculateProfitPercentage } from "../../calculateProfitPercentage";
import { issAssetInStateIfLogic } from "./ifStates";
import type { CommonAsset } from "../../../redux/crypto/Cryptocurency.types";
import type { Cryptocurrency } from "../../../redux/crypto/Cryptocurency.types";

export const isAssetMustBeChanged = (
  stateAssets: CommonAsset[] | undefined,
  newAsset: CommonAsset,
  coin: Cryptocurrency | undefined,
  existingAssetIndex: number
) => {
  const updatedAssets: CommonAsset[] = stateAssets ? [...stateAssets] : [];

  if (
    issAssetInStateIfLogic(updatedAssets, existingAssetIndex, newAsset, coin) &&
    coin?.price
  ) {
    const growPercent = calculateProfitPercentage(
      updatedAssets[existingAssetIndex].price + newAsset.amount * newAsset.price,
      (updatedAssets[existingAssetIndex].totalAmount || 0) + newAsset.amount * coin?.price
    );
    updatedAssets[existingAssetIndex] = {
      ...updatedAssets[existingAssetIndex],
      amount: +(updatedAssets[existingAssetIndex].amount + newAsset.amount).toFixed(4),
      growPercent,
      icon: coin.icon,
      symbol: coin.symbol,
      totalAmount: +(
        (updatedAssets[existingAssetIndex].amount + newAsset.amount) *
        coin?.price
      ).toFixed(4),
      priceAverage: +(
        (updatedAssets[existingAssetIndex].price + newAsset.amount * newAsset.price) /
        (updatedAssets[existingAssetIndex].amount + newAsset.amount)
      ).toFixed(4),
      price: +(
        updatedAssets[existingAssetIndex].price +
        newAsset.price * newAsset.amount
      ).toFixed(4),

      totalProfit:
        (updatedAssets[existingAssetIndex].totalAmount || 0) +
        newAsset.amount * coin?.price -
        (updatedAssets[existingAssetIndex].price + newAsset.amount * newAsset.price),
    };
    return updatedAssets[existingAssetIndex];
  }
};
