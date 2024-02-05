import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import type { ChartDataType } from "./chartColorScheme";
import type { CommonAsset } from "../../redux/Cryptocurency.types";
import { useSelector } from "react-redux";
import { getAssets } from "../../redux/dashboardSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PortfolioChart = () => {
  const assets = useSelector(getAssets);

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
    <div className=" flex justify-center max-h-[520px] mt-8   ">
      <Pie data={chartData} />
    </div>
  );
};
