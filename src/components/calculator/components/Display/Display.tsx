import { DisplayWrapper } from "./Display.styled";
import { State } from "../../helpers/actionHandlers/actionHandlers.types";

const Display: React.FC<State> = ({
  previousOperand,
  currentOperand,
  operation,
  result,
}) => {
  return (
    <DisplayWrapper id="display" className="output calculator-glass">
      <div className="glass-block1"></div>
      <div className="glass-block2"></div>
      <div className="glass-block3"></div>
      <div className="prev-operand">
        {typeof currentOperand === "string" && currentOperand.length >= 14 ? (
          <p className="limit-msg">Digit limit met</p>
        ) : previousOperand && operation ? (
          `${previousOperand}${operation}`
        ) : null}
      </div>

      {!result ? (
        <div className="curr-operand">{currentOperand}</div>
      ) : (
        <div className="curr-operand">{result}</div>
      )}
    </DisplayWrapper>
  );
};

export default Display;
