import { SideBarStatistic } from "./CardStatistic";
import { CardList } from "./CardList";
import { CardHeader } from "./CardHeader";
import { useState, useMemo, useEffect } from "react";
import { changeAssetAmount } from "../../helpers/utils/formLogic/changeAssetAmount";
import type { Cryptocurrency } from "../../redux/Cryptocurency.types";
import { useGetAllCryptoQuery } from "../../redux/cryptoApi";
import { useSelector, useDispatch } from "react-redux";
import {
  getAssets,
  getIsCoinsShowed,
  getFilterValue,
  changeAssets,
  setAssetToShow,
  setIsCoinsShowed,
  setIsChartLineOpen,
  setIsChartPieOpen,
  setIsTableOpen,
  getIsDeleteModalOpen,
  setIsDeleteModalOpen,
} from "../../redux/dashboardSlice";
import { refetchCrypto } from "../../helpers/utils/formLogic/refetchCrypto";
import { DeleteModal } from "./DeleteModal/DeleteModal";

interface AppSidebarProps {
  setCoin: React.Dispatch<React.SetStateAction<Cryptocurrency | null>>;
  setIsModalOpenl: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ setCoin, setIsModalOpenl }) => {
  const dispatch = useDispatch();
  const isDeleteModalOpen = useSelector(getIsDeleteModalOpen);
  const { data, refetch } = useGetAllCryptoQuery();
  const isCoinShowed = useSelector(getIsCoinsShowed);
  const [coinForUpdate, setCoinForUpdate] = useState<Cryptocurrency>();
  const assets = useSelector(getAssets);
  const filter = useSelector(getFilterValue);

  //every 60 sec updating data and changing coin price
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        await refetch();
        const updatedAssets = refetchCrypto(assets, data);
        if (updatedAssets) dispatch(changeAssets(updatedAssets));
      } catch (error) {
        console.error("Error updating assets:", error);
      }
    }, 60000);
    return () => clearInterval(intervalId);
  }, [refetch, assets, data, dispatch]);

  //filter func
  const getVisibleContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    if (!Array.isArray(assets)) {
      return [];
    }
    const filteredContacts = assets.filter(
      ({ id, name }) =>
        id?.toLowerCase().includes(normalizedFilter) ||
        name?.toLowerCase().includes(normalizedFilter)
    );
    return filteredContacts;
  }, [assets, filter]);

  //Main Card logic with modals and global state
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDeleteModalOpen) return;

    if (data) {
      const clickedElement = event.target as HTMLElement;
      const isButton = clickedElement.id === "close-card-button";
      const isInput = clickedElement.id === `amount-of-asset`;
      const isChartBtn = clickedElement.id === `open-chart-btn`;
      const cryptoId = clickedElement.dataset.cryptoId;
      const selectedCoin = data?.result.find(
        (crypto) => crypto.id === (event.currentTarget as HTMLDivElement).id
      );
      //finding coin at data for updating
      if (selectedCoin) setCoinForUpdate({ ...selectedCoin });

      //setting id to chart and show chart line after pressing chart btn
      if (isChartBtn && selectedCoin) {
        dispatch(setAssetToShow(selectedCoin.id));
        dispatch(setIsCoinsShowed(false));
        dispatch(setIsChartPieOpen(false));
        dispatch(setIsTableOpen(false));
        dispatch(setIsChartLineOpen(true));
      }
      //let to input number
      else if (isInput) return;
      //add toin to modal and open it
      else if (selectedCoin && !isButton) {
        setIsModalOpenl(true);
        setCoin(selectedCoin);
      }
      //handle delete asset
      else if (isButton && cryptoId) {
        dispatch(setIsDeleteModalOpen());
      }
    }
  };

  //changing amount of asset BUT without updating priceAvr and Price
  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (coinForUpdate) {
      const newAmount = Number(event.target.value);
      if (isNaN(newAmount)) return;
      const changedAsset = changeAssetAmount(assets, coinForUpdate, newAmount);
      if (changedAsset) dispatch(changeAssets([...changedAsset]));
    }
  };

  return (
    <div
      className={`
      ${assets.length ? " grid " : " hidden "}
      ${
        isCoinShowed
          ? " w-[100%] grid-cols-1 ssm2:grid-cols-1 md:grid-cols-2 md3:grid-cols-3 1xl2:grid-cols-4 gap-2  gap-y-2 p-2  auto-rows-min "
          : " w-[22%] grid-cols-1 gap-2 lg:hidden auto-rows-max rounded-2xl overflow-hidden pr-1 "
      }
          overflow-y-scroll   h-[calc(100vh-86px)]
        bg-[#0F172A]  grid   `}
    >
      {getVisibleContacts.map((asset) => (
        <div
          className={`
          ${isCoinShowed ? "  " : " w-[96%] "}
             rounded-xl   bg-white   p-2 `}
          onClick={handleClick}
          id={asset.id}
          key={asset.id}
        >
          <CardHeader asset={asset} />
          <SideBarStatistic asset={asset} />
          <CardList asset={asset} handleChangeAmount={handleChangeAmount} />
        </div>
      ))}
      <DeleteModal data={data} coinForUpdate={coinForUpdate} />
    </div>
  );
};
