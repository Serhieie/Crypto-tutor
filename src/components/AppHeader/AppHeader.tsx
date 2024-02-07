import { Layout, Select, Space, Drawer } from "antd";
import { ButtonSet } from "./ButtonSet";
import { Filter } from "../Fliter";
import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddAssetForm } from "../AddAssetForm/AddAssetForm";
import { useGetAllCryptoQuery } from "../../redux/cryptoApi";

import { CiBitcoin } from "react-icons/ci";
import {
  getAssets,
  setIsDrawerOpen,
  getIsDrawerOpen,
  setCoin,
  setIsModalOpen,
} from "../../redux/dashboardSlice";
import { useDispatch } from "react-redux";

export const AppHeader: React.FC = () => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState<boolean>(false);
  const isDrawerOpen = useSelector(getIsDrawerOpen);
  const { data } = useGetAllCryptoQuery();
  const assets = useSelector(getAssets);

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

  return (
    <Layout.Header
      className={`
      ${
        !assets.length ? " h-18  " : " md:h-40 md2:h-28 lg2:h-28 "
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
        <div className="  bg-slate-800  rounded-lg p-2 px-6 mr-1">
          <p
            className="font-montserrat 
           font-bold  text-slate-300 text-xl md:text-xs  "
          >
            Portfolio Value : {portfolioValue.toFixed(2)}$
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
