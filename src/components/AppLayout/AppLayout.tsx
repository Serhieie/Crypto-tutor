import { useContext, useState } from "react";
import { CryptoContext } from "../../context/CryptoContext";
import { Layout, Spin, Modal } from "antd";
import { AppHeader } from "../AppHeader/AppHeader";
import { AppSidebar } from "../AppSidebar/AppSidebar";
import { AppContent } from "../AppContent/AppContent";
import { CoinInfoModal } from "../CoinInfoModal";
import { Cryptocurrency } from "../AppSidebar/AppSideBar.types";

export const AppLayout: React.FC = () => {
  const [isModalOpen, setIsModalOpenl] = useState<boolean>(false);
  const [coin, setCoin] = useState<Cryptocurrency | null>(null);
  const { isLoading } = useContext(CryptoContext) || {
    isLoading: false,
    data: { result: [] },
    assets: [],
  };

  const handleCancel = () => {
    setIsModalOpenl(false);
  };

  if (isLoading) return <Spin fullscreen />;
  return (
    <Layout>
      <AppHeader setCoin={setCoin} setIsModalOpenl={setIsModalOpenl} />
      <Layout className="responsive-layout">
        <AppSidebar setCoin={setCoin} setIsModalOpenl={setIsModalOpenl} />
        <AppContent />
      </Layout>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
    </Layout>
  );
};
