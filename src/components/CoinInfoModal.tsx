import { Typography, Divider, Tag } from "antd";
import { CoinLabel } from "./CoinLabel";
import { useEffect, useState } from "react";
import type { Cryptocurrency } from "../redux/crypto/Cryptocurency.types";
import type { CommonAsset } from "../redux/crypto/Cryptocurency.types";
import { CoinCard } from "./CoinCard";
import { useCryptoState } from "../helpers/hooks/cryptoSelector";

interface CoininfoModalProps {
  coin: Cryptocurrency | null;
}

export const CoinInfoModal: React.FC<CoininfoModalProps> = ({ coin }) => {
  const { assets } = useCryptoState();
  const [assetCoin, setAssetCoin] = useState<CommonAsset | null>(null);

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
    <div className="px-10 md:px-2 pt-6 md:pt-2">
      {" "}
      {coin && (
        <CoinLabel
          coinName={coin.name}
          coinSymbol={coin.symbol}
          coinIcon={coin.icon}
          size={44}
          level={3}
          marg={20}
        />
      )}
      {assetCoin ? (
        <CoinCard coin={assetCoin} />
      ) : (
        <Typography.Title className="mt-4  font-montserrat" level={3}>
          {"Item is not in your wallet"}
        </Typography.Title>
      )}
      <Divider className="my-2 ssm2:hidden mx-0" />
      <Typography.Paragraph
        className="ssm2:hidden flex gap-3 justify-center font-montserrat "
        style={{ margin: 0 }}
      >
        <Typography.Text className=" font-montserrat" strong>
          1 Hour:
        </Typography.Text>
        {coin && (
          <Tag color={coin.priceChange1h >= -0.000001 ? "green" : "red"}>
            {coin.priceChange1h}
          </Tag>
        )}
        <Typography.Text className="font-montserrat" strong>
          1 Day:
        </Typography.Text>
        {coin && (
          <Tag color={coin.priceChange1d >= -0.000001 ? "green" : "red"}>
            {coin.priceChange1d}
          </Tag>
        )}
        <Typography.Text className="font-montserrat" strong>
          1 Week:
        </Typography.Text>
        {coin && (
          <Tag color={coin.priceChange1w >= -0.000001 ? "green" : "red"}>
            {coin.priceChange1w}
          </Tag>
        )}
      </Typography.Paragraph>
      <Divider className="mt-2 font-montserrat " />
      {coin?.price && (
        <Typography.Paragraph>
          <Typography.Text className="mr-2 font-montserrat " strong>
            Price:{" "}
          </Typography.Text>
          {coin?.price.toFixed(6)}$
        </Typography.Paragraph>
      )}
      {coin?.priceBtc && (
        <Typography.Paragraph>
          <Typography.Text className="mr-2 font-montserrat " strong>
            Price BTC:{" "}
          </Typography.Text>
          {coin?.priceBtc}
        </Typography.Paragraph>
      )}
      {coin?.marketCap && (
        <Typography.Paragraph>
          <Typography.Text className="mr-2 font-montserrat " strong>
            Market Cup:{" "}
          </Typography.Text>
          {coin?.marketCap}$
        </Typography.Paragraph>
      )}
      {coin?.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text className="mr-2 font-montserrat " strong>
            Contract Adress:{" "}
          </Typography.Text>
          {coin?.contractAddress}
        </Typography.Paragraph>
      )}
      <Divider />
    </div>
  );
};
