import { Layout, Button, Select, Space, Drawer, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { CryptoContext } from "../../context/CryptoContext";
import type { Cryptocurrency } from "../../redux/Cryptocurency.types";
import { AddAssetForm } from "../AddAssetForm";
import { headerStyle } from "./AppHeader.styles";
import { useGetAllCryptoQuery } from "../../redux/cryptoApi";
// import { getAssets } from "../../redux/dashboardSlice";

interface AppHeaderProps {
  setCoin: React.Dispatch<React.SetStateAction<Cryptocurrency | null>>;
  setIsModalOpenl: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ setCoin, setIsModalOpenl }) => {
  const [select, setSelect] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { data } = useGetAllCryptoQuery();
  // const a = useSelector(getAssets);
  // console.log("assets", a);
  const { assets } = useContext(CryptoContext) || {
    isLoading: false,
    data: [],
    assets: [],
  };

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
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

  const cryptoCardMap: Record<string, number> = Array.isArray(data)
    ? data.reduce((acc: Record<string, number>, coin) => {
        acc[coin.id] = coin.price;
        return acc;
      }, {})
    : {};

  const portfolioValue = assets
    .map((asset) => {
      if (Array.isArray(data) && data.length > 0) {
        return (asset.amount ?? 0) * cryptoCardMap[asset.id ?? 0];
      }
      return 0;
    })
    .reduce((acc, value) => acc + value, 0);

  return (
    <Layout.Header style={headerStyle}>
      <Typography.Title
        level={2}
        style={{ textAlign: "left", color: "white", margin: 0 }}
      >
        Total Portfolio Value : {portfolioValue.toFixed(2)}$
      </Typography.Title>
      <Select
        open={select}
        style={{ width: "360px", height: "40px" }}
        value={["Press < / > to open Crypto Details"]}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        options={data?.result.map((coin) => ({
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
      {/* <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal> */}
      <Button
        onClick={showDrawer}
        className=" bg-[#1677ff] hover:bg-[#346ab5] "
        type="primary"
      >
        Add Asset
      </Button>
      <Drawer
        width={444}
        title="Add Asset"
        onClose={onCloseDrawer}
        open={isDrawerOpen}
        destroyOnClose
      >
        <AddAssetForm onCloseResult={onCloseDrawer} />
      </Drawer>
    </Layout.Header>
  );
};
