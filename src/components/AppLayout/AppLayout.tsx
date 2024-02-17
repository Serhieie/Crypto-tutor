import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Layout, Spin } from "antd";
import { AppHeader } from "../AppHeader/AppHeader";
import { useAuth } from "../../helpers/hooks/authSelector";
import { AuthNav } from "./AuthNavigation";
import { useCryptoState } from "../../helpers/hooks/cryptoSelector";

const AppLayout: React.FC = () => {
  const { isLoading } = useCryptoState();
  const { token, isLoggedIn } = useAuth();
  if (isLoading) return <Spin size="large" fullscreen />;
  return (
    <Layout style={{ overflow: "hidden" }}>
      {token && isLoggedIn ? <AppHeader /> : <AuthNav />}
      <div className="flex justify-center items-center pb-4 pt-2 px-1 bg-[#1E293B] min-h-[calc(100vh-76px)] overflow-hidden ">
        <Suspense fallback={<Spin size="large" fullscreen />}>
          <Outlet />
        </Suspense>
      </div>
    </Layout>
  );
};

export default AppLayout;
