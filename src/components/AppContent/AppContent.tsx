import { Layout, Button, Spin } from "antd";
import { useState } from "react";
import { PortfolioChart } from "../PortfolioChart/PortfolioChart";
import { AssetsTable } from "../AssetsTable";
import { contentStyle } from "./contentStyle";
import { useGetAllCryptoQuery } from "../../redux/cryptoApi";

export const AppContent = () => {
  const { data, isLoading } = useGetAllCryptoQuery();
  const [isChartPieOpen, setIsChartPieOpen] = useState<boolean>(true);

  const handleChangeChart = () => {
    setIsChartPieOpen((state) => !state);
  };

  if (isLoading) {
    return (
      <Layout.Content style={contentStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            marginTop: "-40px",
          }}
        >
          <Spin size="large" />
        </div>
      </Layout.Content>
    );
  }

  return (
    data?.result && (
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
