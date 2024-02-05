import { Button, Result } from "antd";
import type { ResultComponentProps } from "./AddAssetForm.types";

export const ResultComponent: React.FC<ResultComponentProps> = ({
  onCloseResult,
  onBuyMore,
  coinName,
  assetRef,
}) => {
  return (
    <Result
      className="mt-10 custom-result"
      status="success"
      title="New Asset Added"
      subTitle={`Added ${assetRef?.amount} of ${coinName} at price ${assetRef?.price}`}
      extra={[
        <Button
          onClick={onCloseResult}
          type="primary"
          key="console"
          className=" bg-[#1677ff] hover:bg-[#346ab5] "
        >
          Close
        </Button>,
        <Button
          onClick={onBuyMore}
          type="primary"
          key="buy"
          className=" bg-[#1677ff] hover:bg-[#346ab5] "
        >
          Add More
        </Button>,
      ]}
    />
  );
};
