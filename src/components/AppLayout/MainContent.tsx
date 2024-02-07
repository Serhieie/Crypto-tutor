import { AppSidebar } from "../AppSidebar/AppSidebar";
import { AppContent } from "../AppContent/AppContent";
import { CoinInfoModal } from "../CoinInfoModal";
import { setIsModalOpen } from "../../redux/crypto/dashboardSlice";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import { useCryptoState } from "../../helpers/hooks/cryptoSelector";

const MainContent: React.FC = () => {
  const { coin, isModalOpen } = useCryptoState();
  const dispatch = useDispatch();
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
