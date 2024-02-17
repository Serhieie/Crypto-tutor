import { CommonAsset } from "../../redux/crypto/Cryptocurency.types";
import { FormEvent, useState } from "react";
import { FaPlusMinus } from "react-icons/fa6";
import { Typography, List, Tag } from "antd";

interface CardListProps {
  asset: CommonAsset;
  handleChangeAmount: (event: number) => void;
}

export const CardList: React.FC<CardListProps> = ({ asset, handleChangeAmount }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const formSubmit = (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const inputValue = form.elements.namedItem("assetAmount") as HTMLInputElement;
    handleChangeAmount(Number(inputValue.value));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

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
              <form onSubmit={formSubmit} action="submit" className="flex items-center">
                <label htmlFor="assetAmount">
                  <input
                    onChange={onChange}
                    className="custom-inpt w-28  placeholder:text-slate-800 h-8 text-md text-center  bg-blue-100 pl-1 rounded-l-md text-slate-900 m-0 "
                    type="number"
                    inputMode="numeric"
                    name="assetAmount"
                    placeholder={String(item.value)}
                    id={`amount-of-asset`}
                    value={inputValue}
                  />
                </label>
                <button
                  id="addRemoveAmount"
                  className=" py-[10px] pr-2 h-8 rounded-r-md flex justify-center items-center "
                  type="submit"
                >
                  <FaPlusMinus className=" pointer-events-none" />
                </button>
              </form>
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
