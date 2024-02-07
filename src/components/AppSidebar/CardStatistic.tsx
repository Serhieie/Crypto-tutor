import { Statistic } from "antd";
import { CommonAsset } from "../../redux/crypto/Cryptocurency.types";
import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";
import { FaChartArea } from "react-icons/fa";

interface SideBarStatisticProps {
  asset: CommonAsset;
}

export const SideBarStatistic: React.FC<SideBarStatisticProps> = ({ asset }) => {
  return (
    <div className="flex justify-between">
      <Statistic
        value={asset.totalAmount}
        precision={2}
        valueStyle={{
          wordBreak: "break-all",
          marginTop: 6,
          marginLeft: 16,
          color: (asset.totalProfit || 0) >= -0.000001 ? "#3f8600" : "#cf1322",
          display: "flex",
          alignItems: "center",
        }}
        prefix={
          (asset.totalProfit || 0) >= -0.000001 ? (
            <PiChartLineUpBold />
          ) : (
            <PiChartLineDownBold />
          )
        }
        suffix="$"
      />
      <button
        id="open-chart-btn"
        type="button"
        className="p-1 px-2 flex items-center gap-2 font-montserrat "
      >
        {" "}
        Show <FaChartArea className=" text-blue-400 pointer-events-none " size={20} />
      </button>
    </div>
  );
};
