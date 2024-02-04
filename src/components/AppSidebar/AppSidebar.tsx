import { Layout, Typography, Statistic, Card, List, Tag } from "antd";
import type { Cryptocurrency } from "../../redux/Cryptocurency.types";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useGetAllCryptoQuery } from "../../redux/cryptoApi";
import { useSelector } from "react-redux";
import { getAssets } from "../../redux/dashboardSlice";
import { CoinLabel } from "../CoinLabel";

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
  const data = useGetAllCryptoQuery();
  const assets = useSelector(getAssets);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (data) {
      const selectedCoin = data.data?.result.find(
        (crypto) => crypto.id === event.currentTarget.id
      );

      if (selectedCoin) {
        setIsModalOpenl(true);
        setCoin(selectedCoin);
      }
    }
  };

  return (
    <Layout.Sider className="sider-top" width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card
          onClick={handleClick}
          id={asset.id}
          key={asset.id}
          style={{ width: 328, height: 186, marginBottom: "1rem", padding: 0 }}
        >
          {asset && (
            <CoinLabel
              coinName={asset.name}
              coinSymbol={asset.symbol}
              coinIcon={asset.icon}
              size={30}
              level={4}
              marg={10}
            />
          )}
          <Statistic
            value={asset.totalAmount}
            precision={2}
            valueStyle={{
              marginTop: 6,
              color: (asset.totalProfit || 0) >= -0.000001 ? "#3f8600" : "#cf1322",
            }}
            prefix={
              (asset.totalProfit || 0) >= -0.000001 ? (
                <ArrowUpOutlined />
              ) : (
                <ArrowDownOutlined />
              )
            }
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
                    <Tag color={(asset.totalProfit || 0) >= -0.000001 ? "green" : "red"}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && item.value}
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
        </Card>
      ))}
    </Layout.Sider>
  );
};
