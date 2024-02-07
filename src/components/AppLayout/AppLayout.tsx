import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Layout, Spin } from "antd";
import { AppHeader } from "../AppHeader/AppHeader";
import { getIsLoading } from "../../redux/dashboardSlice";
import { useAuth } from "../../helpers/hooks/authSelector";
import { AuthNav } from "./AuthNavigation";

const AppLayout: React.FC = () => {
  const isLoading = useSelector(getIsLoading);
  const { token, isLoggedIn } = useAuth();
  if (isLoading) return <Spin size="large" fullscreen />;
  return (
    <Layout>
      {token && isLoggedIn ? <AppHeader /> : <AuthNav />}
      <div className="flex justify-center items-center pb-4 pt-2 px-4 bg-[#1E293B] min-h-[calc(100vh-76px)] ">
        <Suspense fallback={<Spin size="large" fullscreen />}>
          <Outlet />
        </Suspense>
      </div>
    </Layout>
  );
};

export default AppLayout;
