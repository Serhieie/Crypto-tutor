import { Typography, Statistic, List, Tag, Modal, Button } from "antd";
import { useState, useMemo } from "react";

import type { Cryptocurrency } from "../../redux/Cryptocurency.types";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useGetAllCryptoQuery } from "../../redux/cryptoApi";
import { RiDeleteBackLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import {
  getAssets,
  removeAsset,
  getIsCoinsShowed,
  getFilterValue,
} from "../../redux/dashboardSlice";
import { CoinLabel } from "../CoinLabel";

interface AppSidebarProps {
  setCoin: React.Dispatch<React.SetStateAction<Cryptocurrency | null>>;
  setIsModalOpenl: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DeleteButtonProps {
  name: string;
  id: string;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ setCoin, setIsModalOpenl }) => {
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const data = useGetAllCryptoQuery();
  const isCoinShowed = useSelector(getIsCoinsShowed);
  const [coinForDelete, setCoinForDelete] = useState<DeleteButtonProps>();
  const assets = useSelector(getAssets);
  const filter = useSelector(getFilterValue);

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

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDeleteModalOpen) return;
    if (data) {
      const clickedElement = event.target as HTMLElement;
      const isButton = clickedElement.id === "close-card-button";
      const cryptoId = clickedElement.dataset.cryptoId;

      const selectedCoin = data.data?.result.find(
        (crypto) => crypto.id === (event.currentTarget as HTMLDivElement).id
      );
      if (selectedCoin)
        setCoinForDelete({ name: selectedCoin.name, id: selectedCoin.id });

      if (selectedCoin && !isButton) {
        setIsModalOpenl(true);
        setCoin(selectedCoin);
      } else if (isButton && cryptoId) {
        setIsDeleteModalOpen((state) => !state);
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen((state) => !state);
  };

  const handleDeleteAtDeleteModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (data) {
      const buttonId = event.currentTarget.id;
      const buttonDataSetId = event.currentTarget.dataset.delete;
      const selectedCoin = data.data?.result.find(
        (crypto) => crypto.id === buttonDataSetId
      );

      if (buttonId === "delete-btn" && selectedCoin) {
        dispatch(removeAsset(selectedCoin.id));
        setIsDeleteModalOpen((state) => !state);
      }
    }
  };

  return (
    <div
      className={`
      ${assets.length ? " grid " : " hidden "}
      ${
        isCoinShowed
          ? " w-[100%]    grid-cols-1 ssm2:grid-cols-1 md:grid-cols-2 md3:grid-cols-3 1xl2:grid-cols-4 gap-2  gap-y-2 p-2  auto-rows-min   "
          : " w-[22%] grid-cols-1 gap-2 lg:hidden auto-rows-max  rounded-2xl overflow-hidden pr-1 "
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
          <div className="flex    justify-between p-2 rounded-xl ">
            {asset && (
              <CoinLabel
                coinName={asset.name}
                coinSymbol={asset.symbol}
                coinIcon={asset.icon}
                size={30}
                level={4}
                marg={10}
              />
            )}
            <button
              id="close-card-button"
              data-crypto-id={asset.id}
              type="button"
              className="bg-green p-1 "
            >
              <RiDeleteBackLine className=" pointer-events-none" size={24} />
            </button>
          </div>

          <Statistic
            value={asset.totalAmount}
            precision={2}
            valueStyle={{
              marginTop: 6,
              marginLeft: 16,
              color: (asset.totalProfit || 0) >= -0.000001 ? "#3f8600" : "#cf1322",
            }}
            prefix={
              (asset.totalProfit || 0) >= -0.000001 ? (
                <ArrowUpOutlined />
              ) : (
                <ArrowDownOutlined />
              )
            }
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              { title: "Total Profit", value: asset.totalProfit, withTag: true },
              { title: "Asset Amount", value: asset.amount, isPlain: true },
            ]}
            renderItem={(item) => (
              <List.Item>
                <span className=" font-xs font-bold"> {item.title}</span>
                <span className=" font-xs font-bold">
                  {item.withTag && (
                    <Tag color={(asset.totalProfit || 0) >= -0.000001 ? "green" : "red"}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  {item.isPlain && item.value}
                  {!item.isPlain && (
                    <Typography.Text
                      type={(asset.totalProfit || 0) >= -0.000001 ? "success" : "danger"}
                    >
                      {" "}
                      {item.value?.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </div>
      ))}
      <Modal open={isDeleteModalOpen} onCancel={handleCloseDeleteModal} footer={null}>
        <div className="flex flex-col gap-14 py-4 ">
          <p className="text-center font-bold text-xl m-0 p-0  pointer-events-none ">
            Confirm{" "}
            <span className="text-2xl text-sky-600 mx-1">{coinForDelete?.name}</span>{" "}
            Asset Delete
          </p>
          <div className="flex gap-10 justify-center">
            <Button
              onClick={handleDeleteAtDeleteModal}
              id="delete-btn"
              data-delete={`${coinForDelete?.id}`}
              className=" hover:bg-[#346ab5] mr-2 h-12 px-6"
              type="primary"
            >
              Delete Asset
            </Button>
            <Button
              onClick={handleCloseDeleteModal}
              id="cancel-btn"
              className=" bg-rose-500 hover:bg-[#346ab5] h-12 px-6"
              type="primary"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
