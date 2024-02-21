import { Spin } from "antd";

export const SuspenseLoader: React.FC = () => {
  return (
    <div
      className={`
    text-center    h-full min-h-[calc(100vh-86px)]
    text-sky-200 bg-transparent w-full p-4 transition-all rounded-2xl overflow-hidden 
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
