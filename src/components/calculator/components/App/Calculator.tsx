import React, { useReducer, useRef } from "react";
import Display from "../Display/Display";
import Buttons from "../Buttons/Buttons";
import { reducer } from "../../helpers/reducer";
import { AppWrapper } from "./Calculator.styled";
import { State } from "../../helpers/actionHandlers/actionHandlers.types";
import { useCalculatorState } from "../../../../helpers/hooks/calculatorSelectors";

export const Calculator: React.FC = () => {
  const { isCalculatorOpen } = useCalculatorState();
  const [{ currentOperand = 0, previousOperand, operation, result = null }, dispatch] =
    useReducer(reducer, {} as State);

  //need to make moovable calculator
  const calculatorRef = useRef<HTMLDivElement>(null);

  return (
    <AppWrapper isCalculatorOpen={isCalculatorOpen}>
      <div
        id="calculator"
        ref={calculatorRef}
        className={`
        ${isCalculatorOpen ? "  pointer-events-auto " : "  pointer-events-none"}
        calc-grid  transition-all z-[9999999]`}
      >
        <Display
          currentOperand={currentOperand}
          previousOperand={previousOperand}
          operation={operation}
          result={result}
        />
        <Buttons dispatch={dispatch} />
      </div>
    </AppWrapper>
  );
};
