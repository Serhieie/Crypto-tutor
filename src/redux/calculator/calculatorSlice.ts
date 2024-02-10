import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { initialState } from "./calculatorState";
import { calculatorInitialStateProps } from "./calculatorState";

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setIsCalculatorOpen(state) {
      state.isCalculatorOpen = !state.isCalculatorOpen;
    },
    setIsDragging(state, action: PayloadAction<boolean>) {
      state.isDragging = action.payload;
    },
    setPosition(state, action: PayloadAction<{ x: number; y: number }>) {
      state.position = action.payload;
    },
  },
});

const persistConfig = {
  key: "calculator",
  storage,
  blacklist: ["isDragging"],
};

export const persistedCalculatorReducer = persistReducer(
  persistConfig,
  calculatorSlice.reducer
);

export const getCalculatorState = (state: { calculator: calculatorInitialStateProps }) =>
  state.calculator;

export const { setIsCalculatorOpen, setIsDragging, setPosition } =
  calculatorSlice.actions;

export default calculatorSlice.reducer;
