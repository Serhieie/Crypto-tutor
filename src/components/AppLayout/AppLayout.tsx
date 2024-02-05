import { useState } from "react";
import { useSelector } from "react-redux";
import { Layout, Spin, Modal } from "antd";
import { AppHeader } from "../AppHeader/AppHeader";
import { AppSidebar } from "../AppSidebar/AppSidebar";
import { AppContent } from "../AppContent/AppContent";
import { CoinInfoModal } from "../CoinInfoModal";
import { Cryptocurrency } from "../AppSidebar/AppSideBar.types";
import { getIsLoading } from "../../redux/dashboardSlice";

export const AppLayout: React.FC = () => {
  const [isModalOpen, setIsModalOpenl] = useState<boolean>(false);
  const [coin, setCoin] = useState<Cryptocurrency | null>(null);
  const isLoading = useSelector(getIsLoading);
  const handleCancel = () => {
    setIsModalOpenl(false);
  };

  if (isLoading) return <Spin size="large" fullscreen />;
  return (
    <Layout>
      <AppHeader setCoin={setCoin} setIsModalOpenl={setIsModalOpenl} />
      <div className="flex pb-4 pt-2 px-4 bg-[#0F172A]  ">
        <AppSidebar setCoin={setCoin} setIsModalOpenl={setIsModalOpenl} />
        <AppContent />
      </div>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>
    </Layout>
  );
};
