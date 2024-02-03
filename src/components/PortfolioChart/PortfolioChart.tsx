import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import type { ChartDataType } from "./chartColorScheme";
import { CryptoContext } from "../../context/CryptoContext";
import type { CommonAsset } from "../../constants/fakeApi";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PortfolioChart = () => {
  const { assets } = useContext(CryptoContext) || {
    isLoading: false,
    data: [],
    assets: [],
    addAsset: () => {},
  };

  const chartData: ChartDataType = {
    labels: assets.map((asset: CommonAsset) => asset.name),
    datasets: [
      {
        label: "$",
        data: assets.map((asset: CommonAsset) => asset.totalAmount),
        backgroundColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
      },
    ],
  };
  return (
    <div className="mt-1 flex justify-center h-[600px]">
      <Pie data={chartData} />
    </div>
  );
};
