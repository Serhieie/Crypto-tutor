import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useContext } from "react";
import { Line } from "react-chartjs-2";
import { generateRandomColor } from "../../helpers/generateRandomColor";
import { CryptoContext } from "../../context/CryptoContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const PortfolioChartLine = () => {
  const { data, assets } = useContext(CryptoContext) || {
    isLoading: false,
    data: [],
    assets: [],
    addAsset: () => {},
  };

  console.log(data, assets);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Price Line",
      },
    },
  };

  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const chartLineData = {
    labels,
    datasets: assets.map((asset) => {
      const { borderColor, backgroundColor } = generateRandomColor();
      console.log(asset.date);
      return {
        label: asset.name,
        data: asset.date,
        borderColor,
        backgroundColor,
      };
    }),
  };

  return (
    <div className="mt-1 flex justify-center h-[500px]">
      <Line options={options} data={chartLineData} />
    </div>
  );
};
