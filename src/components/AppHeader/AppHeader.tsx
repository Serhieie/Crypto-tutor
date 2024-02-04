import { Layout, Button, Select, Space, Drawer, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppHeaderProps } from "./AppHeader.types";
import { AddAssetForm } from "../AddAssetForm/AddAssetForm";
import { headerStyle } from "./AppHeader.styles";
import { useGetAllCryptoQuery } from "../../redux/cryptoApi";
import { getAssets } from "../../redux/dashboardSlice";

export const AppHeader: React.FC<AppHeaderProps> = ({ setCoin, setIsModalOpenl }) => {
  const [select, setSelect] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { data } = useGetAllCryptoQuery();
  const assets = useSelector(getAssets);

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
