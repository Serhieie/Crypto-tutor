import { Button, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { PortfolioChart } from "../PortfolioChart/PortfolioChart";
import { AssetsTable } from "../AssetsTable";
import { PiCoinsLight } from "react-icons/pi";
import { useGetAllCryptoQuery } from "../../redux/cryptoApi";
import {
  getAssets,
  getIsCoinsShowed,
  setIsDrawerOpen,
  getAssetToShow,
  getIsChartLineOpen,
  setIsChartLineOpen,
  getIsChartPieOpen,
  setIsChartPieOpen,
  getIsTableOpen,
  setIsTableOpen,
} from "../../redux/dashboardSlice";
import { PortfolioChartLine } from "../PortfolioChart/PortfolioChartLine";

//main window with Charts and buttons eatch button using global state
// for toggle it

export const AppContent = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllCryptoQuery();
  const isCoinShowed = useSelector(getIsCoinsShowed);
  const assets = useSelector(getAssets);
  const assetToShowId = useSelector(getAssetToShow);
  const isChartLineOpen = useSelector(getIsChartLineOpen);
  const isChartPieOpen = useSelector(getIsChartPieOpen);
  const isTableOpen = useSelector(getIsTableOpen);

  const handleChangeChart = () => {
    if (isChartPieOpen) return;
    dispatch(setIsChartPieOpen(true));
    dispatch(setIsChartLineOpen(false));
    dispatch(setIsTableOpen(false));
  };
  const handleChangeChartLine = () => {
    if (isChartLineOpen) return;
    dispatch(setIsChartLineOpen(true));
    dispatch(setIsChartPieOpen(false));
    dispatch(setIsTableOpen(false));
  };
  const handleChangeChartTable = () => {
    if (isTableOpen) return;
    dispatch(setIsTableOpen(true));
    dispatch(setIsChartLineOpen(false));
    dispatch(setIsChartPieOpen(false));
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
    ${!assets.length ? "w-[100%]" : "w-[78%] md:w-[100%] "}
    ${isCoinShowed && assets.length ? "hidden" : "w-[100%] lg:w-[100%] "}
    text-center h-full min-h-[calc(100vh-86px)] text-sky-200 bg-[#1E293B] p-4 font-montserrat rounded-2xl overflow-hidden`}
      >
        {assets.length > 0 && (
          <div className="flex justify-center gap-2 flex-wrap">
            <Button
              onClick={handleChangeChart}
              className="bg-[#1677ff] hover:bg-[#346ab5] font-montserrat"
              type="primary"
              style={{ margin: 0 }}
            >
              Show at Pie Chart
            </Button>
            {assets.length > 0 && assetToShowId && (
              <Button
                onClick={handleChangeChartLine}
                className="bg-[#1677ff] hover:bg-[#346ab5] font-montserrat"
                type="primary"
                style={{ margin: 0 }}
              >
                Show at Line Chart
              </Button>
            )}
            <Button
              onClick={handleChangeChartTable}
              className={`
              ${
                !isChartLineOpen && !isChartPieOpen
                  ? "bg-[#1b3c6b83] hover:bg-[#346ab5]"
                  : "bg-[#1677ff] hover:bg-[#346ab5]"
              }
               font-montserrat`}
              type="primary"
              style={{ margin: 0 }}
            >
              Show Table
            </Button>
          </div>
        )}
        {!assets.length && (
          <>
            <div className="flex flex-col items-center justify-center mt-32">
              <PiCoinsLight size={120} />
              <h2 className="text-sky-200 text-6xl font-medium flex items-center gap-4 justify-center mt-6 select-none">
                No Coins in Your Portfolio
              </h2>
              <Button
                onClick={showDrawer}
                className="font-montserrat hover:bg-[#346ab5] w-48 h-12 text-lg mt-10"
                type="primary"
              >
                Add Asset
              </Button>
            </div>
          </>
        )}

        {assets.length > 0 && (
          <>
            {isChartLineOpen && <PortfolioChartLine id={assetToShowId} />}
            {isChartPieOpen && <PortfolioChart />}
            {isTableOpen && <AssetsTable />}
          </>
        )}
      </div>
    )
  );
};
