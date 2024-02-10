import { Payload, State } from "./actionHandlers.types";

export function handleAddDigit(state: State, payload: Payload) {
  if (state.previousOperand === Infinity || state.currentOperand === Infinity) {
    return {};
  }
  if (state.overwrite) {
    if (payload.digit === ".") {
      return {
        ...state,
        result: null,
        currentOperand: "0.",
        overwrite: false,
      };
    }

    return {
      ...state,
      result: null,
      currentOperand: payload.digit,
      overwrite: false,
    };
  }

  const currentOperand = state.currentOperand || "";

  if (typeof currentOperand === "string" && currentOperand.length > 13) {
    return state;
  }

  if (payload.digit === "0" && currentOperand === "0") {
    return state;
  }

  if (
    (state.currentOperand === "-" && payload.digit === ".") ||
    (state.currentOperand === "-" && payload.digit === "0")
  ) {
    return state;
  }

  if (
    (payload.digit === "0" && !currentOperand) ||
    (payload.digit === "0" && currentOperand === 0)
  ) {
    return {
      ...state,
      currentOperand: 0,
    };
  }

  if (
    payload.digit === "." &&
    typeof currentOperand === "string" &&
    currentOperand.includes(".")
  ) {
    return state;
  }

  if (payload.digit === "." && !currentOperand) {
    return {
      ...state,
      currentOperand: "0.",
    };
  }

  return {
    ...state,
    currentOperand: `${currentOperand}${payload.digit}`,
  };
}
