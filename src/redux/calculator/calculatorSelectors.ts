import { calculatorInitialStateProps } from "./calculatorState";

export const getIsCalculatorOpen = (state: { calculator: calculatorInitialStateProps }) =>
  state.calculator.isCalculatorOpen;
export const getIsDragging = (state: { calculator: calculatorInitialStateProps }) =>
  state.calculator.isDragging;
export const getPosition = (state: { calculator: calculatorInitialStateProps }) =>
  state.calculator.position;
