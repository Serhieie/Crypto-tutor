import { Button, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { PortfolioChart } from "../PortfolioChart/PortfolioChart";
import { AssetsTable } from "../AssetsTable";
import { PiCoinsLight } from "react-icons/pi";
import { useGetAllCryptoQuery } from "../../redux/cryptoApi";
import { getAssets, getIsCoinsShowed, setIsDrawerOpen } from "../../redux/dashboardSlice";

export const AppContent = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllCryptoQuery();
  const isCoinShowed = useSelector(getIsCoinsShowed);
  const assets = useSelector(getAssets);

  const [isChartPieOpen, setIsChartPieOpen] = useState<boolean>(true);

  const handleChangeChart = () => {
    setIsChartPieOpen((state) => !state);
  };

  const showDrawer = () => {
    dispatch(setIsDrawerOpen(true));
  };

  if (isLoading) {
    return (
      <div
        className={`
        ${isCoinShowed && assets.length > 0 ? " hidden " : " "}
      ${!assets.length ? " w-[100%] " : "  w-[78%]  lg:w-[100%] "}
      text-center   h-full min-h-[calc(100vh-86px)]
       text-sky-200 bg-[#1E293B] p-4 transition-all rounded-2xl overflow-hidden `}
      >
        <div
          className="flex items-center justify-center 
        h-full w-[100%] mt-72"
        >
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    data?.result && (
      <div
        className={`
      ${!assets.length ? " w-[100%] " : "  w-[78%]  md:w-[100%] "}
      ${isCoinShowed && assets.length ? " hidden " : " w-[100%]  lg:w-[100%] "}
      text-center   h-full min-h-[calc(100vh-86px)]
       text-sky-200 bg-[#1E293B] p-4  font-montserrat rounded-2xl overflow-hidden `}
      >
        {assets.length > 0 && (
          <>
            <Button
              onClick={handleChangeChart}
              className=" bg-[#1677ff] hover:bg-[#346ab5] font-montserrat "
              type="primary"
              style={{ margin: 0 }}
            >
              {isChartPieOpen ? "Show Table" : "Show at Pie Chart"}
            </Button>
          </>
        )}
        {!assets.length ? (
          <>
            {" "}
            <div className="flex flex-col items-center justify-center  mt-32">
              <PiCoinsLight size={120} />
              <h2
                className="text-sky-200 text-6xl font-medium flex 
          items-center gap-4 justify-center mt-6 select-none "
              >
                No Coins in Your Portfolio
              </h2>
              <Button
                onClick={showDrawer}
                className=" font-montserrat hover:bg-[#346ab5]  w-48 h-12 text-lg mt-10"
                type="primary"
              >
                Add Asset
              </Button>
            </div>
          </>
        ) : isChartPieOpen ? (
          <PortfolioChart />
        ) : (
          <AssetsTable />
        )}
      </div>
    )
  );
};
