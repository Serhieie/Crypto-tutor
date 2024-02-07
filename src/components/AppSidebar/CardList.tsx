import { CommonAsset } from "../../redux/crypto/Cryptocurency.types";
import { Typography, List, Tag } from "antd";

interface CardListProps {
  asset: CommonAsset;
  handleChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CardList: React.FC<CardListProps> = ({ asset, handleChangeAmount }) => {
  return (
    <List
      size="small"
      dataSource={[
        { title: "Total Profit", value: asset.totalProfit, withTag: true },
        { title: "Amount", value: asset.amount, isPlain: true },
      ]}
      renderItem={(item) => (
        <List.Item className=" p-0 m-0">
          <span className=" text-xs md3:text-lg font-semibold"> {item.title}</span>
          <span className=" text-xs md3:text-lg font-semibold">
            {item.withTag && (
              <Tag color={(asset.totalProfit || 0) >= -0.000001 ? "green" : "red"}>
                {asset.growPercent}%
              </Tag>
            )}

            {item.isPlain && (
              <input
                onChange={handleChangeAmount}
                className="custom-inpt w-28  h-8 text-md text-center  bg-blue-100 pl-1 rounded-md text-slate-900 m-0 "
                type="number"
                inputMode="numeric"
                name="assetAmount"
                id={`amount-of-asset`}
                value={item.value}
              />
            )}
            {!item.isPlain && (
              <Typography.Text
                type={(asset.totalProfit || 0) >= -0.000001 ? "success" : "danger"}
              >
                {" "}
                {item.value?.toFixed(2)}$
              </Typography.Text>
            )}
          </span>
        </List.Item>
      )}
    />
  );
};
