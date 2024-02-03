import type { Cryptocurrency } from "../redux/Cryptocurency.types";
import { CoinLabel } from "./CoinLabel";
import type { CommonAsset } from "../constants/fakeApi";
import { useState, useContext, useRef, useEffect } from "react";
import { CryptoContext } from "../context/CryptoContext";
// import { ValidateErrorEntity } from "rc-field-form/es/interface";
import {
  Select,
  Space,
  Divider,
  Form,
  DatePicker,
  Button,
  InputNumber,
  Result,
} from "antd";

type FieldType = {
  amount: number;
  price?: number;
  date?: number;
  total?: string;
};

const validateMessages = {
  required: "${label} is Required!",
  types: { number: "${label} is valid number!" },
  member: {
    range: "${label} must be between ${min} and ${max}",
  },
};

interface AddAssetFormProps {
  onCloseResult: () => void;
}

export const AddAssetForm: React.FC<AddAssetFormProps> = ({ onCloseResult }) => {
  const { data, addAsset } = useContext(CryptoContext) || {
    isLoading: false,
    data: [],
    assets: [],
    addAsset: () => {},
  };

  const [form] = Form.useForm<FieldType>();
  const [select, setSelect] = useState<boolean>(false);
  const [coin, setCoin] = useState<Cryptocurrency>();

  const [issResultVisible, setIsResultVisible] = useState<boolean>(false);
  const assetRef = useRef<CommonAsset | undefined>();

  useEffect(() => {
    if (coin?.price) {
      form.setFieldsValue({
        price: +coin?.price?.toFixed(6),
      });
    }
  }, [coin, form]);

  const onBuyMore = () => {
    setIsResultVisible(false);
  };

  const handleSelect = (value: string | number) => {
    const selectedCoin = data?.find((coin) => coin.id === value);
    setCoin(selectedCoin);
  };

  const onFinish = (values: FieldType) => {
    const newAsset: CommonAsset = {
      id: coin?.id,
      amount: values.amount,
      price: values.price || 0,
      date: values.date ? values.date : new Date().getTime(),
    };
    assetRef.current = newAsset;
    addAsset(newAsset);
    setIsResultVisible((state) => !state);
  };

  if (issResultVisible) {
    return (
      <Result
        className="mt-10"
        status="success"
        title="New Asset Added"
        subTitle={`Added ${assetRef.current?.amount} of ${coin?.name} at price ${assetRef.current?.price}`}
        extra={[
          <Button
            onClick={onCloseResult}
            type="primary"
            key="console"
            className=" bg-[#1677ff] hover:bg-[#346ab5] "
          >
            Close
          </Button>,
          <Button
            onClick={onBuyMore}
            type="primary"
            key="buy"
            className=" bg-[#1677ff] hover:bg-[#346ab5] "
          >
            Buy More
          </Button>,
        ]}
      />
    );
  }

  const handleAmountChange = (value: number | null) => {
    if (value !== null) {
      const price = form.getFieldValue("price");
      form.setFieldValue("total", (value * price).toFixed(4));
    }
  };
  const handleAmountPrice = (value: number | null) => {
    if (value !== null) {
      const amount = form.getFieldValue("amount");
      form.setFieldValue("total", (amount * value).toFixed(4));
    }
  };

  return (
    <>
      {" "}
      <Select
        open={select}
        style={{ width: "100%" }}
        placeholder={["Select Coin"]}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        options={data?.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img src={option.data.icon} alt={option.data.label} width={30} />
            {option.data.label}
          </Space>
        )}
      />
      {coin && (
        <Form
          form={form}
          style={{ paddingTop: 50 }}
          className="w-full m-0"
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValues={{
            remember: true,
            price: coin.price.toFixed(6),
            total: "",
          }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={validateMessages}
        >
          <CoinLabel coin={coin} />
          <Divider />
          <Form.Item<FieldType>
            style={{ width: "100%", minWidth: 290 }}
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
              },
            ]}
          >
            <InputNumber
              placeholder="Enter coin amount"
              onChange={handleAmountChange}
              size={"large"}
              style={{ width: "100%", minWidth: 250, marginLeft: 12 }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            style={{ width: "100%", minWidth: 290 }}
            label="Price"
            name="price"
          >
            <InputNumber
              onChange={handleAmountPrice}
              size={"large"}
              style={{ width: "100%", minWidth: 250, marginLeft: 12 }}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Date & Time"
            name="date"
            style={{ width: "100%", minWidth: 290 }}
          >
            <DatePicker
              size={"large"}
              showTime
              style={{ width: "100%", minWidth: 250, marginLeft: 12 }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Total"
            name="total"
            style={{ width: "100%", minWidth: 290 }}
          >
            <InputNumber
              size={"large"}
              disabled
              style={{ width: "100%", minWidth: 250, marginLeft: 12 }}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              size={"large"}
              className=" bg-[#1677ff] hover:bg-[#346ab5] "
              type="primary"
              htmlType="submit"
            >
              Add Asset
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
