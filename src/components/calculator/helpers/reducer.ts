// reducer.ts
import { ACTIONS } from "../constants/actions";
import { handleChooseOperation } from "./actionHandlers/handleChooseOperation";
import { handleAddDigit } from "./actionHandlers/handleAddDigit";
import { handleClear } from "./actionHandlers/handleClear";
import { handleEvaluate } from "./actionHandlers/handleEvaluate";
import { handleDeleteDigit } from "./actionHandlers/handleDeleteDigit";

interface State {
  currentOperand?: number | string | null;
  previousOperand?: number | string | null;
  operation?: string | null | boolean;
  result?: number | null;
}

interface Action {
  type: string;
  payload?: any;
}

export function reducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return handleAddDigit(state, payload);
    case ACTIONS.CLEAR:
      return handleClear();
    case ACTIONS.CHOOSE_OPERATION:
      return handleChooseOperation(state, payload);
    case ACTIONS.EVALUATE:
      return handleEvaluate(state);
    case ACTIONS.DELETE_DIGIT:
      return handleDeleteDigit(state);
    default:
      return state;
  }
}
