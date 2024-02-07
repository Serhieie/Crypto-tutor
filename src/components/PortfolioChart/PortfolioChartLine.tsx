import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useGetCryptoChartQuery } from "../../redux/cryptoApi";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PortfolioChartLineProps {
  id: string | null;
}

export const PortfolioChartLine: React.FC<PortfolioChartLineProps> = ({ id }) => {
  const { data, isLoading, isError } = useGetCryptoChartQuery({
    id,
    period: "24h",
  });

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

  const [chartData, setChartData] = useState<{
    labels: (string | never)[];
    datasets: (
      | { label: string | undefined; data: (number | null)[]; backgroundColor: string }
      | never
    )[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (!isLoading && !isError && Array.isArray(data)) {
      const trueData = [...data];

      const labels = trueData.map((entry) => {
        if (Array.isArray(entry)) {
          const timestamp = entry[0];
          const date = new Date(timestamp * 1000);
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          return `${hours}:${minutes}`;
        }
        return "";
      });

      const datasets = [
        {
          label: id || undefined, // Replace null with undefined
          data: trueData.map((entry) => {
            if (Array.isArray(entry) && entry.length >= 2) {
              return entry[1];
            }
            return 0;
          }),
          borderColor: "rgba(0, 255, 110, 0.2)",
          backgroundColor: "rgba(0, 255, 110, 0.5)",
        },
      ];

      setChartData({ labels, datasets });
    }
  }, [data, isLoading, isError, id]);

  if (isLoading) return <div className="mt-52 font-montserrat text-3xl">Loading...</div>;
  if (isError)
    return <div className="mt-40 font-montserrat text-3xl">Error fetching data</div>;

  return (
    <div className="mt-1 flex justify-center h-[500px]">
      <Line options={options} data={chartData} />
    </div>
  );
};
