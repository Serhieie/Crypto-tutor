import { Layout, Typography, Statistic, Card, List, Tag } from "antd";
import { useContext } from "react";
import { CryptoContext } from "../../context/CryptoContext";
import type { Cryptocurrency } from "../../redux/Cryptocurency.types";
import { capitalizeFunc } from "../../helpers/capitalizeFunc";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
// import { useGetAllCryptoQuery } from "../../redux/cryptoApi";

const siderStyle: React.CSSProperties = {
  padding: "1rem",
  overflowY: "scroll",
  height: "calc(100vh - 50px)",
  backgroundColor: "#0F172A",
};

interface AppSidebarProps {
  setCoin: React.Dispatch<React.SetStateAction<Cryptocurrency | null>>;
  setIsModalOpenl: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ setCoin, setIsModalOpenl }) => {
  // const data = useGetAllCryptoQuery()
  const { assets, data } = useContext(CryptoContext) || {
    isLoading: false,
    data: [],
    assets: [],
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (data) {
      const selectedCoin = data?.find((crypto) => crypto.id === event.currentTarget.id);
      setIsModalOpenl(true);
      setCoin(selectedCoin || null);
    }
  };

  return (
    <Layout.Sider className="sider-top" width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card
          onClick={handleClick}
          id={asset.id}
          key={asset.id}
          style={{ width: 328, height: 178, marginBottom: "1rem", padding: 0 }}
        >
          <Statistic
            title={asset.id ? capitalizeFunc(asset.id) : null}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: "Total Profit", value: asset.totalProfit, withTag: true },
              { title: "Asset Amount", value: asset.amount, isPlain: true },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span className=" font-xs font-bold"> {item.title}</span>
                <span className=" font-xs font-bold">
                  {item.withTag && (
                    <Tag color={asset.grow ? "green" : "red"}>{asset.growPercent}%</Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {" "}
                      {item.value?.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
};
