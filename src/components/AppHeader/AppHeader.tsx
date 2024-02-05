import { Layout, Button, Select, Space, Drawer } from "antd";
import { Filter } from "../Fliter";
import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppHeaderProps } from "./AppHeader.types";
import { AddAssetForm } from "../AddAssetForm/AddAssetForm";
import { useGetAllCryptoQuery } from "../../redux/cryptoApi";
import {
  getAssets,
  setIsCoinsShowed,
  getIsCoinsShowed,
  setIsDrawerOpen,
  getIsDrawerOpen,
} from "../../redux/dashboardSlice";
import { useDispatch } from "react-redux";

export const AppHeader: React.FC<AppHeaderProps> = ({ setCoin, setIsModalOpenl }) => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState<boolean>(false);
  const isDrawerOpen = useSelector(getIsDrawerOpen);
  const { data } = useGetAllCryptoQuery();
  const assets = useSelector(getAssets);
  const isCoinsShowed = useSelector(getIsCoinsShowed);

  console.log(isDrawerOpen);

  const showDrawer = () => {
    dispatch(setIsDrawerOpen(true));
  };

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
    setCoin(selectedCoin || null);
    setIsModalOpenl(true);
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

  const handleShowCoins = () => {
    dispatch(setIsCoinsShowed());
  };

  return (
    <Layout.Header
      className="sm:h-28 sm:px-1 md:py-2  ssm2:h-40 sm2:h-[106px] md2:h-28 
       lg2:h-28 sm:gap-1 md:flex-col md:gap-4 gap-0  flex flex-wrap font-m"
      style={{
        textAlign: "center",
        backgroundColor: "#0F172A",
        alignItems: "center",
        color: "white",
      }}
    >
      <div className="sm:mx-auto flex ssm2:flex-col  gap-4 items-center">
        <div className="  bg-slate-800  rounded-lg p-2 px-6 mr-8">
          <p
            className="font-montserrat 
           font-bold  text-slate-300 text-2xl md:text-sm ssm2:text-sm "
          >
            Portfolio Value : {portfolioValue.toFixed(2)}$
          </p>
        </div>

        <Select
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
      </div>

      {assets.length > 0 && (
        <div className="flex items-center  sm2:gap-8 lg:mx-auto sm:flex sm:gap-4 ssm2:flex-col   ml-auto p-0 gap-6">
          <Filter />
          <div className="ml-3 mr-2 flex  1xl2:flex-row gap-4">
            {" "}
            <Button
              onClick={handleShowCoins}
              className=" bg-[#1677ff] hover:bg-[#346ab5]  font-medium font-montserrat "
              type="primary"
            >
              {isCoinsShowed ? " Show Chart & Table " : " Show My Coins "}
            </Button>
            <Button
              onClick={showDrawer}
              className=" bg-[#1677ff] hover:bg-[#346ab5] font-montserrat font-medium "
              type="primary"
            >
              Add Asset
            </Button>
          </div>
        </div>
      )}

      <Drawer
        width={444}
        headerStyle={{ backgroundColor: "#1E293B" }}
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
