import { State } from "./actionHandlers.types";
import { evaluate } from "../evaluate";

export function handleEvaluate(state: State) {
  if (state.previousOperand === Infinity || state.currentOperand === Infinity) {
    return {};
  }
  if (
    state.operation == null ||
    state.currentOperand == null ||
    state.previousOperand == null
  ) {
    return state;
  }

  if (
    (state.currentOperand && !state.previousOperand) ||
    (state.currentOperand && !state.operation)
  ) {
    return {
      ...state,
      currentOperand: 0,
    };
  }

  return {
    ...state,
    overwrite: true,
    previousOperand: null,
    operation: null,
    currentOperand: Number(evaluate(state)),
    result: Number(evaluate(state)),
  };
}
