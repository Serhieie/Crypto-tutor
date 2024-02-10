import { Layout, Select, Space, Drawer } from "antd";
import { ButtonSet } from "./ButtonSet";
import { Filter } from "../Fliter";
import { CloseOutlined } from "@ant-design/icons";
import { FaCalculator } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AddAssetForm } from "../AddAssetForm/AddAssetForm";
import { useGetAllCryptoQuery } from "../../redux/crypto/cryptoApi";
import { RxDividerVertical } from "react-icons/rx";
import { useCryptoState } from "../../helpers/hooks/cryptoSelector";
import { useCalculatorState } from "../../helpers/hooks/calculatorSelectors";
import { setIsCalculatorOpen } from "../../redux/calculator/calculatorSlice";
import { CiBitcoin } from "react-icons/ci";
import {
  setIsDrawerOpen,
  setCoin,
  setIsModalOpen,
} from "../../redux/crypto/dashboardSlice";
import { useDispatch } from "react-redux";
import { Calculator } from "../calculator/components/App/Calculator";

export const AppHeader: React.FC = () => {
  const dispatch = useDispatch();
  const { isCalculatorOpen } = useCalculatorState();
  const { isDrawerOpen, assets } = useCryptoState();
  const [select, setSelect] = useState<boolean>(false);
  const { data } = useGetAllCryptoQuery();

  const onCloseDrawer = () => {
    dispatch(setIsDrawerOpen(false));
  };

  useEffect(() => {
    const keyPress = (event: KeyboardEvent) => {
      if (event.key === "/") {
        setSelect((state) => !state);
      }
    };
    document.addEventListener("keypress", keyPress);
    return () => document.removeEventListener("keypress", keyPress);
  }, [select]);

  const handleSelect = (value: string | number) => {
    const selectedCoin = data?.result.find((crypto) => crypto.id === value);
    if (selectedCoin) dispatch(setCoin(selectedCoin));
    dispatch(setIsModalOpen(true));
  };

  const cryptoCardMap: Record<string, number> | undefined = data?.result.reduce(
    (acc: Record<string, number>, coin) => {
      acc[coin.id] = coin.price;
      return acc;
    },
    {}
  );

  const portfolioValue = assets
    .map((asset) => {
      if (data?.result.length && asset.id && cryptoCardMap) {
        return Number((asset.amount ?? 0) * cryptoCardMap[asset.id]);
      }
      return 0;
    })
    .reduce((acc, value) => acc + value, 0);

  const portfolioProffit = assets
    .map((asset) => {
      if (data?.result.length) {
        return Number(asset.price);
      }
      return 0;
    })
    .reduce((acc, value) => acc + value, 0);

  const toggleShowCalculator = () => {
    dispatch(setIsCalculatorOpen());
  };

  return (
    <Layout.Header
      className={`
      ${
        !assets.length ? " md:h-[105px]  md2:h-32" : " md:h-40 md2:h-28 lg2:h-28 "
      }  sm:gap-1 sm:px-1 md:py-2   md:gap-3 gap-0  flex md:flex-col 
      md3:flex-wrap  shadow-md  shadow-shadowBoxDark  `}
      style={{
        textAlign: "center",
        backgroundColor: "#0F172A",
        alignItems: "center",
        color: "white",
        boxShadow: "",
      }}
    >
      <div className="sm:mx-auto flex  gap-3 items-center ">
        <div
          className="  bg-slate-800  
        items-center rounded-lg p-1 px-3 md:px-2  mr-1  flex gap-1 py-2 md:py-1"
        >
          <p
            className="font-montserrat 
           font-bold  text-blue-200 text-sm md:text-xs min-w-[110px]  flex items-center gap-1 "
          >
            Value :{" "}
            <span
              className={`${
                portfolioValue - portfolioProffit >= 0
                  ? " text-green-400 "
                  : " text-red-400 "
              } text-lg md:text-xs`}
            >
              {portfolioValue.toFixed(2)}$
            </span>
          </p>
          <RxDividerVertical size={26} className=" text-blue-500 " />
          <p
            className="font-montserrat 
           font-bold  text-blue-200 min-w-[110px]  text-sm md:text-xs  flex items-center gap-1 "
          >
            Profit :{" "}
            <span
              className={`${
                portfolioValue - portfolioProffit >= 0
                  ? " text-green-400 "
                  : " text-red-400 "
              }  text-lg  md:text-xs`}
            >
              {(portfolioValue - portfolioProffit).toFixed(2)}$
            </span>
          </p>
        </div>

        <Select
          showSearch
          className="sm:hidden "
          open={select}
          style={{
            width: "240px",
            height: "34px",
            fontFamily: "Montserrat, sans-serif",
          }}
          value={["Press < / > to open Crypto Details"]}
          onSelect={handleSelect}
          onClick={() => setSelect((prev) => !prev)}
          options={data?.result.map((coin) => ({
            label: coin.name,
            value: coin.id,
            icon: coin.icon,
          }))}
          optionRender={(option) => (
            <Space style={{ fontFamily: "Montserrat, sans-serif" }}>
              <img src={option.data.icon} alt={option.data.label} width={30} />
              {option.data.label}
            </Space>
          )}
        />
        <CiBitcoin className={"sm:hidden text-slate-400"} size={40} />
        <button
          id="calculator-btn"
          className={`
          ${isCalculatorOpen ? " text-blue-400 " : " text-slate-400 "}
           transition-all `}
          onClick={toggleShowCalculator}
          type="button"
        >
          <FaCalculator size={30} />
        </button>
      </div>
      <div className="flex gap-2 ml-auto md:flex-col-reverse md:mx-auto  ">
        {assets.length > 0 && (
          <div
            className="flex items-center  lg:mx-auto sm:flex 
          md:gap-3 md:flex-col-reverse  p-0 gap-6"
          >
            <Filter />
          </div>
        )}
        <ButtonSet />
      </div>
      <Calculator />
      <Drawer
        width={444}
        style={{ backgroundColor: "#334155" }}
        title={<p style={{ color: "#CBD5E1" }}>Add Asset</p>}
        closeIcon={<CloseOutlined style={{ color: "#CBD5E1" }} />}
        onClose={onCloseDrawer}
        open={isDrawerOpen}
        destroyOnClose
      >
        <AddAssetForm onCloseResult={onCloseDrawer} />
      </Drawer>
    </Layout.Header>
  );
};
