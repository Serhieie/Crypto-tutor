import { CommonAsset } from "../../redux/crypto/Cryptocurency.types";
import { RiDeleteBackLine } from "react-icons/ri";
import { CoinLabel } from "../CoinLabel";

interface CardHeaderProps {
  asset: CommonAsset;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ asset }) => {
  return (
    <div className="flex    justify-between p-2 rounded-xl ">
      {asset && (
        <CoinLabel
          coinName={asset.name}
          coinSymbol={asset.symbol}
          coinIcon={asset.icon}
          size={30}
          level={4}
          marg={10}
        />
      )}
      <button
        id="close-card-button"
        data-crypto-id={asset.assetId}
        type="button"
        className="bg-green p-1 "
      >
        <RiDeleteBackLine className=" pointer-events-none" size={24} />
      </button>
    </div>
  );
};
