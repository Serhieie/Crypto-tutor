import { Typography, Tag, Statistic, List } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import type { CommonAsset } from "../redux/Cryptocurency.types";

interface CoininfoModalProps {
  coin: CommonAsset | null;
}

export const CoinCard: React.FC<CoininfoModalProps> = ({ coin }) => {
  return (
    <>
      <Statistic
        className="mt-5"
        value={coin?.totalAmount}
        precision={2}
        valueStyle={{
          color: (coin?.totalProfit || 0) >= -0.000001 ? "#3f8600" : "#cf1322",
        }}
        prefix={
          (coin?.totalProfit || 0) >= -0.000001 ? (
            <ArrowUpOutlined />
          ) : (
            <ArrowDownOutlined />
          )
        }
        suffix="$"
      />
      <List
        size="small"
        dataSource={[
          { title: "Total Profit", value: coin?.totalProfit, withTag: true },
          { title: "Asset Amount", value: coin?.amount, isPlain: true },
          {
            title: "Avr Price",
            value: coin?.priceAvg || coin?.price,
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <span className=" font-xs font-bold"> {item.title}</span>
            <span className=" font-xs font-bold">
              {item.withTag && (
                <Tag color={(coin?.totalProfit || 0) >= -0.000001 ? "green" : "red"}>
                  {coin?.growPercent}%
                </Tag>
              )}
              {item.isPlain && item.value}
              {!item.isPlain && (
                <Typography.Text
                  type={(coin?.totalProfit || 0) >= -0.000001 ? "success" : "danger"}
                >
                  {" "}
                  {item.value?.toFixed(2)}$
                </Typography.Text>
              )}
            </span>
          </List.Item>
        )}
      />
    </>
  );
};
