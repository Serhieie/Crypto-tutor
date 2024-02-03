import { createContext, ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAssets } from "../constants/fakeApi";
import { calculatePercentage } from "../helpers/calculatePercentage";
import axios from "../constants/axiosConfig";
import type { CommonAsset } from "../constants/fakeApi";
import type { Cryptocurrency } from "../redux/Cryptocurency.types";
import { CryptoContextProps } from "./types/custom";
import { getIsLoading, setIsLoading } from "../redux/dashboardSlice";

interface CryptoContextProviderProps {
  children: ReactNode;
}

const CryptoContext = createContext<CryptoContextProps | undefined>(undefined);

function CryptoContextProvider({ children }: CryptoContextProviderProps) {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  // const assetsReducer = useSelector(getAssets);
  const [data, setData] = useState<CryptoContextProps["data"]>(undefined);
  const [assets, setAssets] = useState<CryptoContextProps["assets"]>([]);

  const mapAssets = (
    fakeAssets: CommonAsset[] | undefined,
    cryptocurrencyData: Cryptocurrency[] | undefined
  ): CommonAsset[] | undefined => {
    if (fakeAssets && cryptocurrencyData) {
      return fakeAssets.map((asset) => {
        const coin = cryptocurrencyData.find((c) => c.id === asset.id);
        if (coin) {
          const growPercent = calculatePercentage(asset.price ?? 0, coin.price ?? 0);
          const obj: CommonAsset = {
            ...asset,
            grow:
              asset.price !== undefined && coin.price !== undefined
                ? asset.price <= coin.price
                : false,
            growPercent: isNaN(growPercent) ? 0 : growPercent,
            totalAmount: (asset.amount ?? 0) * (coin.price ?? 0),
            totalProfit:
              (asset.amount ?? 0) * (coin.price ?? 0) -
              (asset.amount ?? 0) * (asset.price ?? 0),
            name: coin.name,
          };
          return obj;
        }
        return asset;
      });
    }
    return undefined;
  };

  //fetching
  useEffect(() => {
    async function fetchData() {
      dispatch(setIsLoading());
      try {
        const result = await axios.get("/coins");
        const cryptocurrencyData: Cryptocurrency[] = result.data.result;
        const fakeAssets: CommonAsset[] = await fetchAssets();
        const mappedAssets = mapAssets(fakeAssets, cryptocurrencyData);
        if (mappedAssets) {
          setAssets(mappedAssets);
        }
        setData(result.data.result);
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading());
      }
    }
    fetchData();
  }, [dispatch]);

  const addAsset = (newAsset: CommonAsset) => {
    setAssets((prevState) => {
      const existingAssetIndex = prevState.findIndex((asset) => asset.id === newAsset.id);

      if (existingAssetIndex !== -1) {
        // Asset already exists, update its properties (e.g., amount)
        const updatedAssets: CommonAsset[] = [...prevState];
        if (
          updatedAssets[existingAssetIndex] &&
          updatedAssets[existingAssetIndex].amount !== undefined &&
          newAsset.amount !== undefined &&
          newAsset.price !== undefined
        ) {
          updatedAssets[existingAssetIndex] = {
            ...updatedAssets[existingAssetIndex],
            amount: updatedAssets[existingAssetIndex].amount + newAsset.amount,
            totalAmount:
              (updatedAssets[existingAssetIndex].amount + newAsset.amount) *
              newAsset.price,
            priceAvg:
              (updatedAssets[existingAssetIndex].price *
                updatedAssets[existingAssetIndex].amount +
                newAsset.price * newAsset.amount) /
              (updatedAssets[existingAssetIndex].amount + newAsset.amount),
            price: newAsset.price,
            // Update other properties as needed
          };
        }
        return updatedAssets;
      } else {
        // Asset does not exist, add it to the state
        return mapAssets([...prevState, newAsset], data) || [];
      }
    });
  };
  return (
    <CryptoContext.Provider value={{ data, assets, isLoading, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export { CryptoContext, CryptoContextProvider };
