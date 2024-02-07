import { AppSidebar } from "../AppSidebar/AppSidebar";
import { AppContent } from "../AppContent/AppContent";
import { CoinInfoModal } from "../CoinInfoModal";
import { getCoin, setIsModalOpen, getIsModalOpen } from "../../redux/dashboardSlice";

import { Modal } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const MainContent: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(getIsModalOpen);
  const coin = useSelector(getCoin);
  const handleCancel = () => {
    dispatch(setIsModalOpen(false));
  };
  return (
    <>
      {" "}
      <AppSidebar />
      <AppContent />
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
    </>
  );
};

export default MainContent;
