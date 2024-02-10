import { useSelector } from "react-redux";
import {
  getIsCalculatorOpen,
  getIsDragging,
  getPosition,
} from "../../redux/calculator/calculatorSelectors";
import { calculatorInitialStateProps } from "../../redux/calculator/calculatorState";

export const useCalculatorState = (): calculatorInitialStateProps => {
  const isCalculatorOpen: boolean = useSelector(getIsCalculatorOpen);
  const isDragging: boolean = useSelector(getIsDragging);
  const position: { x: number; y: number } = useSelector(getPosition);

  return {
    isCalculatorOpen,
    isDragging,
    position,
  };
};
