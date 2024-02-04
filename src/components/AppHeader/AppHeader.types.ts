import type { Cryptocurrency } from "../../redux/Cryptocurency.types";

export interface AppHeaderProps {
  setCoin: React.Dispatch<React.SetStateAction<Cryptocurrency | null>>;
  setIsModalOpenl: React.Dispatch<React.SetStateAction<boolean>>;
}
