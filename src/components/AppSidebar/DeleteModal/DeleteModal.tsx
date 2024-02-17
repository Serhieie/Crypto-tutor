import { Modal, Button } from "antd";
import { useDispatch } from "react-redux";
import { Cryptocurrency } from "../AppSideBar.types";
import { GetAllCryptoResponse } from "../../../redux/crypto/cryptoApi";
import {
  useGetAllAssetsQuery,
  useDeleteAssetMutation,
} from "../../../redux/crypto/assetsApi";
import {
  setAssetToShow,
  setIsChartLineOpen,
  setIsChartPieOpen,
  setIsTableOpen,
  setIsDeleteModalOpen,
} from "../../../redux/crypto/dashboardSlice";
import { useCryptoState } from "../../../helpers/hooks/cryptoSelector";

interface DeleteModalProps {
  data: GetAllCryptoResponse | undefined;
  coinForUpdate: Cryptocurrency | undefined;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ data, coinForUpdate }) => {
  const dispatch = useDispatch();
  const { data: assets } = useGetAllAssetsQuery();
  const [deleteAsset] = useDeleteAssetMutation();
  const { isDeleteModalOpen } = useCryptoState();

  const handleCloseDeleteModal = () => {
    dispatch(setIsDeleteModalOpen(false));
  };

  const handleDeleteAtDeleteModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (data) {
      const buttonId = event.currentTarget.id;
      const buttonDataSetId = event.currentTarget.dataset.delete;
      const selectedCoin = data?.result.find((crypto) => crypto.id === buttonDataSetId);
      const assetToDelete = assets?.find((asset) => asset.assetId === selectedCoin?.id);

      if (buttonId === "delete-btn" && selectedCoin && assetToDelete?._id) {
        dispatch(setIsChartPieOpen(true));
        dispatch(setIsTableOpen(false));
        dispatch(setIsChartLineOpen(false));
        dispatch(setAssetToShow(null));
        dispatch(setIsDeleteModalOpen(false));
        deleteAsset(assetToDelete?._id);
      }
    }
  };
  return (
    <Modal open={isDeleteModalOpen} onCancel={handleCloseDeleteModal} footer={null}>
      <div className="flex flex-col gap-14 py-4 ">
        <p className="text-center font-bold text-xl m-0 p-0  pointer-events-none ">
          Confirm{" "}
          <span className="text-2xl text-sky-600 mx-1">{coinForUpdate?.name}</span> Asset
          Delete
        </p>
        <div className="flex gap-10 justify-center">
          <Button
            onClick={handleDeleteAtDeleteModal}
            id="delete-btn"
            data-delete={`${coinForUpdate?.id}`}
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
  );
};
