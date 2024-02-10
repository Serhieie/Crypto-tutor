import { formatNumber } from "./formatNumber";

type EvaluateTypes = {
  previousOperand?: number | string | null;
  currentOperand?: number | string | null;
  operation?: string | null | boolean;
  secondOperator?: boolean | null | string;
};

export function evaluate({
  currentOperand,
  previousOperand,
  operation,
  secondOperator,
}: EvaluateTypes): string | number {
  const prev = parseFloat(previousOperand as string) || 0;
  const curr = parseFloat(currentOperand as string) || 0;
  let trueOp: string | null = null;

  if (typeof operation === "string") {
    trueOp = operation.length > 1 ? operation.slice(0, 1) : operation;
  }

  if (isNaN(curr)) return "";

  let compitation: string | number = "";

  switch (trueOp) {
    case "^":
      compitation = Math.pow(prev, curr);
      break;
    case "%":
      compitation = (curr / 100) * prev;
      break;
    case "√":
      compitation = Math.sqrt(curr);
      break;
    case "×":
      compitation = prev * curr;
      if (secondOperator) {
        compitation = prev * -curr;
      }
      break;
    case "÷":
      compitation = prev / curr;
      break;
    case "+":
      compitation = prev + curr;
      if (secondOperator) {
        compitation = prev + -curr;
      }
      break;
    case "-":
      compitation = prev - curr;
      break;
    default:
      return "";
  }

  const numToReturn = formatNumber(compitation);

  return numToReturn;
}
