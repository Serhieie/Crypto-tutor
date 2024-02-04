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
import { useSelector } from "react-redux";
import { getAssets } from "../../redux/dashboardSlice";
import { Line } from "react-chartjs-2";
import { generateRandomColor } from "../../helpers/generateRandomColor";
import { useGetAllCryptoQuery } from "../../redux/cryptoApi";

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
  const { data } = useGetAllCryptoQuery();
  const assets = useSelector(getAssets);

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
