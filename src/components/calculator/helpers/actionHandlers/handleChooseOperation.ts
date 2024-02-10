import { evaluate } from "../evaluate";
import { State, Payload } from "./actionHandlers.types";

export function handleChooseOperation(state: State, payload: Payload): State {
  if (state.previousOperand === Infinity || state.currentOperand === Infinity) {
    return {};
  }

  const sqrtResult = Number(
    evaluate({
      currentOperand: Number(state.currentOperand),
      previousOperand: null,
      operation: payload.operation,
      secondOperator: false,
    })
  );

  if (state.overwrite) {
    if (payload.operation === "√") {
      return {
        ...state,
        previousOperand: null,
        result: sqrtResult,
        operation: null,
        currentOperand: Number(sqrtResult),
        overwrite: true,
      };
    }

    return {
      ...state,
      previousOperand: Number(state.result),
      result: null,
      operation: payload.operation,
      currentOperand: null,
      overwrite: false,
    };
  }

  if (payload.operation === "√" && state.operation) {
    if (state.currentOperand) {
      return {
        ...state,
        previousOperand: Number(state.previousOperand),
        result: null,
        operation: state.operation,
        currentOperand: sqrtResult,
        overwrite: false,
      };
    }

    return state;
  }

  if (payload.operation === "√" && !state.operation) {
    if (!state.currentOperand && !state.previousOperand) {
      return state;
    }

    return {
      ...state,
      previousOperand: state.previousOperand,
      result: null,
      operation: state.operation,
      currentOperand: Number(
        evaluate({
          currentOperand: state.currentOperand,
          previousOperand: 0,
          operation: payload.operation,
          secondOperator: false,
        })
      ),
    };
  }

  const currentOperand2 = state.currentOperand || "";

  if (typeof currentOperand2 === "string" && currentOperand2.endsWith(".")) {
    return state;
  }

  if (
    payload.operation &&
    state.currentOperand === "-" &&
    isNaN(Number(payload.operation))
  ) {
    return state;
  }

  if (payload.operation === "-" && !currentOperand2 && state.previousOperand == null) {
    return {
      ...state,
      operation: null,
      currentOperand: payload.operation,
    };
  }

  if (state.currentOperand == null && state.previousOperand == null) {
    return state;
  }

  if (state.operation === "×-" && payload.operation === "+") {
    return {
      ...state,
      overwrite: true,
      previousOperand: state.previousOperand,
      operation: `+`,
      secondOperator: undefined,
    };
  }

  if (
    (state.operation === "+" &&
      state.currentOperand == null &&
      payload.operation === "-") ||
    (state.operation === "×" && state.currentOperand == null && payload.operation === "-")
  ) {
    return {
      ...state,
      previousOperand: state.previousOperand,
      operation: `${state.operation}${payload.operation}`,
      secondOperator: payload.operation,
    };
  }

  if (state.currentOperand == null) {
    return {
      ...state,
      operation: payload.operation,
    };
  }

  if (state.previousOperand == null && state.currentOperand) {
    return {
      ...state,
      operation: payload.operation,
      previousOperand: state.currentOperand,
      currentOperand: null,
    };
  }

  if (!state.currentOperand && !state.previousOperand) {
    return state;
  }
  console.log(state.currentOperand, state.previousOperand, payload.operation);
  return {
    ...state,
    previousOperand: Number(evaluate(state)),
    operation: payload.operation,
    currentOperand: null,
  };
}
