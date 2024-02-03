export interface CommonAsset {
  id?: string;
  amount: number;
  price: number;
  date?: number;
  growPercent?: number;
  totalAmount?: number;
  totalProfit?: number;
  grow?: boolean;
  name?: string;
  priceAvg?: number;
}

export const cryptoAssets: CommonAsset[] = [
  {
    id: "bitcoin",
    amount: 0.02,
    price: 26244,
    date: new Date().getTime(),
  },
  {
    id: "ethereum",
    amount: 5,
    price: 2400,
    date: new Date().getTime(),
  },
  {
    id: "dogecoin",
    amount: 10000,
    price: 0.055,
    date: new Date().getTime(),
  },
];

export function fetchAssets(): Promise<CommonAsset[]> {
  return new Promise<CommonAsset[]>((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 700);
  });
}
