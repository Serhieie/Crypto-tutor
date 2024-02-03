import { Flex, Typography } from "antd";
import { Cryptocurrency } from "../redux/Cryptocurency.types";

interface CoinLabel {
  coin: Cryptocurrency | null;
}

export const CoinLabel: React.FC<CoinLabel> = ({ coin }) => {
  return (
    <Flex>
      <img
        src={coin?.icon}
        alt={coin?.name}
        style={{ marginRight: 20, height: 40, width: 40 }}
      />
      <Typography.Title style={{ margin: 0 }} level={2}>
        <span>({coin?.symbol})</span> {coin?.name}
      </Typography.Title>
    </Flex>
  );
};
