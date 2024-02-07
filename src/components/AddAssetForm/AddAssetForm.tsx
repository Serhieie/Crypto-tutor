import type { Cryptocurrency } from "../../redux/crypto/Cryptocurency.types";
import { PiHandCoinsLight } from "react-icons/pi";
import { CoinLabel } from "../CoinLabel";
import type { CommonAsset } from "../../redux/crypto/Cryptocurency.types";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useGetAllCryptoQuery } from "../../redux/crypto/cryptoApi";
import { getAssets } from "../../redux/crypto/dashboardSlice";
import { isAssetInState } from "../../helpers/utils/formLogic/formFunctionLogic";
import type { AddAssetFormProps, FieldType } from "./AddAssetForm.types";
import { validateMessages } from "./validationMessages";
import { Select, Space, Divider, Form, DatePicker, Button, InputNumber } from "antd";
import { ResultComponent } from "./ResultComponent";

//This Component Response for adding asset at the drawer from right sight
//For Form used librery ant design
//At submit two logic 1) we have no coin 2) we are adding more coins
//This Prop is close drower function witch is trigger it after submitting

export const AddAssetForm: React.FC<AddAssetFormProps> = ({ onCloseResult }) => {
  const dispatch = useDispatch();
  const { data } = useGetAllCryptoQuery();
  const [form] = Form.useForm<FieldType>();
  const [select, setSelect] = useState<boolean>(false);
  const [coin, setCoin] = useState<Cryptocurrency>();
  const assets = useSelector(getAssets);
  const [issResultVisible, setIsResultVisible] = useState<boolean>(false);
  const assetRef = useRef<CommonAsset | undefined>();

  useEffect(() => {
    if (coin?.price) {
      form.setFieldsValue({
        price: +coin?.price?.toFixed(6),
      });
    }
  }, [coin, form]);

  const onFinish = (values: FieldType) => {
    const newAsset: CommonAsset = {
      id: coin?.id,
      amount: values.amount,
      price: values.price || 0,
      date: values.date ? values.date : new Date().getTime(),
    };
    assetRef.current = newAsset;
    isAssetInState(assets, newAsset, coin, dispatch, data);
    setIsResultVisible((state) => !state);
  };

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
  const onBuyMore = () => {
    setIsResultVisible(false);
  };
  const handleSelect = (value: string | number) => {
    const selectedCoin = data?.result.find((coin) => coin.id === value);
    setCoin(selectedCoin);
  };

  //Operation Result Message
  if (issResultVisible) {
    return (
      <ResultComponent
        onCloseResult={onCloseResult}
        onBuyMore={onBuyMore}
        coinName={coin?.name}
        assetRef={assetRef.current}
      />
    );
  }

  return (
    <>
      {" "}
      <Select
        showSearch
        open={select}
        style={{ width: "100%", outline: "none", fontFamily: "Montserrat, sans-serif" }}
        placeholder={["Select Coin"]}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        options={data?.result.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space className=" font-montserrat">
            <img src={option.data.icon} alt={option.data.label} width={30} />
            {option.data.label}
          </Space>
        )}
      />
      {coin ? (
        <Form
          form={form}
          style={{ paddingTop: 50, backgroundColor: "#334155", color: "white" }}
          className="w-full m-0 form"
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
          {coin && (
            <CoinLabel
              coinName={coin.name}
              coinSymbol={coin.symbol}
              coinIcon={coin.icon}
              size={55}
              marg={20}
              color="#CBD5E1"
            />
          )}
          <Divider className="custom-form-item" />
          <Form.Item<FieldType>
            className="custom-form-item"
            style={{ width: "100%", minWidth: 250, fontFamily: "Montserrat, sans-serif" }}
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
              style={{
                width: "100%",
                minWidth: 250,
                marginLeft: 6,
                backgroundColor: "#F8FAFC",
                fontFamily: "Montserrat, sans-serif",
              }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            className="custom-form-item"
            style={{ width: "100%", minWidth: 290, fontFamily: "Montserrat, sans-serif" }}
            label="Price"
            name="price"
          >
            <InputNumber
              onChange={handleAmountPrice}
              size={"large"}
              style={{
                width: "100%",
                minWidth: 250,
                marginLeft: 6,
                backgroundColor: "#F8FAFC",
                fontFamily: "Montserrat, sans-serif",
              }}
            />
          </Form.Item>
          <Form.Item<FieldType>
            className="custom-form-item"
            label="Date & Time"
            name="date"
            style={{ width: "100%", minWidth: 290, fontFamily: "Montserrat, sans-serif" }}
          >
            <DatePicker
              className="custom-datePicker"
              size={"large"}
              showTime
              style={{
                width: "100%",
                minWidth: 250,
                marginLeft: 6,
                backgroundColor: "#F8FAFC",
                fontFamily: "Montserrat, sans-serif",
              }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            className="custom-form-item"
            label="Total"
            name="total"
            style={{ width: "100%", minWidth: 290, fontFamily: "Montserrat, sans-serif" }}
          >
            <InputNumber
              size={"large"}
              disabled
              style={{
                backgroundColor: "#F8FAFC",
                width: "100%",
                minWidth: 250,
                marginLeft: 6,
                fontFamily: "Montserrat, sans-serif",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              size={"large"}
              className="ssm2:ml-16 md:ml-24 ml-28 w-52 mx-auto bg-[#1677ff] hover:bg-[#346ab5] font-montserrat "
              type="primary"
              htmlType="submit"
            >
              Add Asset
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div className="w-full font-montserrat text-center flex flex-col mt-32 items-center text-slate-400">
          <PiHandCoinsLight size={200} />
          <p className="text-slate-400 text-3xl select-none ">
            Add Asset to Your Portfolio
          </p>
        </div>
      )}
    </>
  );
};
