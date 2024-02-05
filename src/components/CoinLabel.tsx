import { Flex, Typography } from "antd";

interface CoinLabelProps {
  coinIcon: string | undefined;
  coinSymbol: string | undefined;
  coinName: string | undefined;
  size?: number;
  level?: 1 | 5 | 2 | 3 | 4 | undefined;
  marg?: number;
  color?: string;
}

export const CoinLabel: React.FC<CoinLabelProps> = ({
  coinIcon,
  coinSymbol,
  coinName,
  size,
  level,
  marg,
  color,
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
      <Typography.Title
        style={{
          margin: 0,
          color: color,
          fontFamily: "Montserrat, sans-serif",
          userSelect: "none",
        }}
        level={level}
      >
        <span>({coinSymbol ? coinSymbol : null})</span> {coinName ? coinName : null}
      </Typography.Title>
    </Flex>
  );
};
