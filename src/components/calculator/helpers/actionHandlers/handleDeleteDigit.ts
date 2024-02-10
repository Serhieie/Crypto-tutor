import { State } from "./actionHandlers.types";

export function handleDeleteDigit(state: State) {
  if (state.previousOperand === Infinity || state.currentOperand === Infinity) {
    return {};
  }

  const result = String(state.result || null);

  if (state.overwrite) {
    if (result) {
      return {
        ...state,
        result: null,
        overwrite: false,
        currentOperand: Number(result.slice(0, -1)),
      };
    }

    return {
      ...state,
      result: null,
      overwrite: false,
      currentOperand: null,
    };
  }

  const currentOperand3 = String(state.currentOperand || 0);

  if (currentOperand3.length === 2 && currentOperand3.includes(".")) {
    return {
      ...state,
      currentOperand: 0,
    };
  }

  if (currentOperand3.length === 1) {
    return {
      ...state,
      currentOperand: 0,
    };
  }

  return {
    ...state,
    currentOperand: Number(currentOperand3.slice(0, -1)),
  };
}
