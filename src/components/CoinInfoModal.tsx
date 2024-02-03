import { Typography, Divider, Tag } from "antd";
import { CoinLabel } from "./CoinLabel";
import { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../context/CryptoContext";
import type { Cryptocurrency } from "../redux/Cryptocurency.types";
import type { CommonAsset } from "../constants/fakeApi";
import { CoinCard } from "./CoinCard";
interface CoininfoModalProps {
  coin: Cryptocurrency | null;
}

export const CoinInfoModal: React.FC<CoininfoModalProps> = ({ coin }) => {
  const [assetCoin, setAssetCoin] = useState<CommonAsset | null>(null);
  const { assets } = useContext(CryptoContext) || {
    isLoading: false,
    data: [],
    assets: [],
    addAsset: () => {},
  };

  const findCoinById = (assets: CommonAsset[], coin: Cryptocurrency) => {
    const isCoinInWallet = assets.find((asset) => asset.id === coin.id);

    if (isCoinInWallet) {
      setAssetCoin(isCoinInWallet);
    } else {
      setAssetCoin(null);
    }
  };

  useEffect(() => {
    if (coin) findCoinById(assets, coin);
  }, [assets, coin]);

  return (
    <div className="px-10 pt-6">
      {" "}
      <CoinLabel coin={coin} />
      {assetCoin ? (
        <CoinCard coin={assetCoin} />
      ) : (
        <Typography.Title className="mt-4" level={3}>
          {"Item is not in your wallet"}
        </Typography.Title>
      )}
      <Divider className="my-2 mx-0" />
      <Typography.Paragraph className=" flex gap-3 justify-center " style={{ margin: 0 }}>
        <Typography.Text strong>1 Hour:</Typography.Text>
        {coin && (
          <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>{coin.priceChange1h}</Tag>
        )}
        <Typography.Text strong>1 Day:</Typography.Text>
        {coin && (
          <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>{coin.priceChange1d}</Tag>
        )}
        <Typography.Text strong>1 Week:</Typography.Text>
        {coin && (
          <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>{coin.priceChange1w}</Tag>
        )}
      </Typography.Paragraph>
      <Divider className="mt-2" />
      {coin?.price && (
        <Typography.Paragraph>
          <Typography.Text className="mr-2" strong>
            Price:{" "}
          </Typography.Text>
          {coin?.price.toFixed(6)}$
        </Typography.Paragraph>
      )}
      {coin?.priceBtc && (
        <Typography.Paragraph>
          <Typography.Text className="mr-2" strong>
            Price BTC:{" "}
          </Typography.Text>
          {coin?.priceBtc}
        </Typography.Paragraph>
      )}
      {coin?.marketCap && (
        <Typography.Paragraph>
          <Typography.Text className="mr-2" strong>
            Market Cup:{" "}
          </Typography.Text>
          {coin?.marketCap}$
        </Typography.Paragraph>
      )}
      {coin?.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text className="mr-2" strong>
            Contract Adress:{" "}
          </Typography.Text>
          {coin?.contractAddress}
        </Typography.Paragraph>
      )}
      <Divider />
    </div>
  );
};
