import { Spin } from "antd";

export const SuspenseLoader: React.FC = () => {
  return (
    <div
      className={`
      text-center    h-full min-h-[calc(100vh-86px)]
       text-sky-200 bg-transparent w-full p-4 transition-all rounded-2xl overflow-hidden `}
    >
      <div
        className="flex   items-center justify-center 
        h-full w-[100%] mt-[26%]"
      >
        <Spin size="large" />
      </div>
    </div>
  );
};
