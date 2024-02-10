export interface calculatorInitialStateProps {
  isCalculatorOpen: boolean;
  position: { x: number; y: number };
  isDragging: boolean;
}

export const initialState: calculatorInitialStateProps = {
  isCalculatorOpen: false,
  position: { x: 0, y: 0 },
  isDragging: false,
};
