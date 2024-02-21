import { useCryptoState } from "../../helpers/hooks/cryptoSelector";
import { Spin } from "antd";

export const ContentLoader: React.FC = () => {
  const { assets, isCoinShowed } = useCryptoState();

  return (
    <div
      className={`
    ${isCoinShowed && assets.length > 0 ? " hidden " : " w-[75%] "}
    ${!assets.length ? " w-[100%] " : "  w-[75%]  lg:w-[100%] "}
    text-center   h-full min-h-[calc(100vh-86px)]
    text-sky-200 bg-[#1E293B] p-4 transition-all rounded-2xl overflow-hidden 
    relative  
  `}
    >
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: 999 }}
      >
        <Spin size="large" />
      </div>
    </div>
  );
};
