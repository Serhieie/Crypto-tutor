import type { CommonAsset } from "../../redux/crypto/Cryptocurency.types";

export interface AddAssetFormProps {
  onCloseResult: () => void;
}
export type FieldType = {
  amount: number;
  price?: number;
  date?: string;
  total?: string;
};

export interface ResultComponentProps {
  onCloseResult: () => void;
  onBuyMore: () => void;
  coinName: string | undefined;
  assetRef: CommonAsset | undefined;
}
