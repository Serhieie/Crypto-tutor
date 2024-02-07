import type { CommonAsset } from "../../../redux/crypto/Cryptocurency.types";
import type { Cryptocurrency } from "../../../redux/crypto/Cryptocurency.types";

export const issAssetInStateIfLogic = (
  updatedAssets: CommonAsset[],
  existingAssetIndex: number,
  newAsset: CommonAsset,
  coin: Cryptocurrency | undefined
) => {
  return (
    updatedAssets[existingAssetIndex] &&
    updatedAssets[existingAssetIndex].amount !== undefined &&
    updatedAssets[existingAssetIndex].totalProfit !== undefined &&
    newAsset.amount !== undefined &&
    newAsset.price !== undefined &&
    coin?.price &&
    coin?.price !== undefined
  );
};
