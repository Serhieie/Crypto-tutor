import { Flex, Typography } from "antd";

interface CoinLabelProps {
  coinIcon: string | undefined;
  coinSymbol: string | undefined;
  coinName: string | undefined;
  size?: number;
  level?: 1 | 5 | 2 | 3 | 4 | undefined;
  marg?: number;
}

export const CoinLabel: React.FC<CoinLabelProps> = ({
  coinIcon,
  coinSymbol,
  coinName,
  size,
  level,
  marg,
}) => {
  return (
    <Flex>
      {coinIcon && (
        <img
          src={coinIcon}
          alt={coinName}
          style={{ marginRight: marg, height: size, width: size }}
        />
      )}
      <Typography.Title style={{ margin: 0 }} level={level}>
        <span>({coinSymbol ? coinSymbol : null})</span> {coinName ? coinName : null}
      </Typography.Title>
    </Flex>
  );
};
