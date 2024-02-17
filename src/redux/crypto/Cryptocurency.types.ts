export interface Explorer {
  name: string;
  url: string;
}

export interface CommonAsset {
  _id?: string;
  assetId?: string;
  amount: number;
  price: number;
  date?: string;
  growPercent?: number;
  totalAmount?: number;
  totalProfit?: number;
  grow?: boolean;
  name?: string;
  priceAverage?: number;
  icon?: string;
  symbol?: string;
}

export interface Cryptocurrency {
  id: string;
  icon: string;
  name: string;
  symbol: string;
  rank: number;
  price: number;
  priceBtc: number;
  volume: number;
  marketCap: number;
  availableSupply: number;
  totalSupply: number;
  priceChange1h: number;
  priceChange1d: number;
  priceChange1w: number;
  redditUrl: string;
  websiteUrl: string;
  twitterUrl: string;
  explorers: Explorer[];
  contractAddress: string;
}

export interface AppData {
  result: Cryptocurrency[];
}
