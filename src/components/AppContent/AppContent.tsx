import { Layout, Typography, Button } from "antd";
import { useState } from "react";
// import { CryptoContext } from "../../context/CryptoContext";
import { PortfolioChart } from "../PortfolioChart/PortfolioChart";
import { AssetsTable } from "../AssetsTable";
import { useGetAllCryptoQuery } from "../../redux/cryptoApi";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  height: "calc(100vh - 50px)",
  lineHeight: "80px",
  color: "#fff",
  backgroundColor: "#1E293B",
  padding: "1rem",
};

export const AppContent = () => {
  const { data, isLoading } = useGetAllCryptoQuery();
  const [isChartPieOpen, setIsChartPieOpen] = useState<boolean>(true);

  console.log(data?.result);

  const handleChangeChart = () => {
    setIsChartPieOpen((state) => !state);
  };

  if (isLoading) {
    return (
      <Layout.Content style={contentStyle}>
        <Typography.Title level={3} style={{ textAlign: "left", color: "white" }}>
          Loading...
        </Typography.Title>
      </Layout.Content>
    );
  }

  return (
    data && (
      <Layout.Content style={contentStyle}>
        <Button
          onClick={handleChangeChart}
          className=" bg-[#1677ff] hover:bg-[#346ab5] "
          type="primary"
          style={{ margin: 0 }}
        >
          {isChartPieOpen ? "Show Table" : "Show at Pie Chart"}
        </Button>

        {isChartPieOpen ? <PortfolioChart /> : <AssetsTable />}
      </Layout.Content>
    )
  );
};
