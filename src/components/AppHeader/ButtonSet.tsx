import { Button } from "antd";
import { logout } from "../../redux/auth/operations-auth";
import { HiLogout } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsCoinsShowed,
  getIsCoinsShowed,
  setIsDrawerOpen,
  getAssets,
} from "../../redux/dashboardSlice";

export const ButtonSet: React.FC = () => {
  const dispatch = useDispatch();
  const assets = useSelector(getAssets);
  const isCoinsShowed = useSelector(getIsCoinsShowed);

  const handleLogout = async () => {
    dispatch(logout() as any);
  };

  const handleShowCoins = () => {
    if (!isCoinsShowed) dispatch(setIsCoinsShowed(true));
    else dispatch(setIsCoinsShowed(false));
  };

  const showDrawer = () => {
    dispatch(setIsDrawerOpen(true));
  };
  return (
    <div className="ml-auto items-center  mr-2 flex md:flex-wrap md:mx-auto  1xl2:flex-row gap-3">
      {" "}
      {assets.length > 0 ? (
        <>
          {" "}
          <Button
            onClick={handleShowCoins}
            className=" bg-[#1677ff] hover:bg-[#346ab5] 
               font-medium font-montserrat h-9 "
            type="primary"
          >
            {isCoinsShowed ? " Chart & Table " : " My Coins "}
          </Button>
          <Button
            onClick={showDrawer}
            className=" bg-[#1677ff] hover:bg-[#346ab5] 
              font-montserrat font-medium h-9 "
            type="primary"
          >
            Add Asset
          </Button>
          <Button
            onClick={handleLogout}
            className=" bg-[#1677ff] hover:bg-[#346ab5] 
              font-montserrat font-medium h-9  "
            type="primary"
          >
            <HiLogout />
          </Button>
        </>
      ) : (
        <>
          <p className="ml-auto mr-4 font-montserrat text-darkFontDark text-xl font-medium">
            LogOut{" "}
          </p>
          <Button
            onClick={handleLogout}
            className=" bg-[#1677ff] hover:bg-[#346ab5] 
              font-montserrat font-medium h-9  "
            type="primary"
          >
            <HiLogout />
          </Button>
        </>
      )}
    </div>
  );
};
