import React from "react";
import { ACTIONS } from "../../../constants/actions";
import { StyledButtons } from "../Buttons.styled";

interface OperationDigitProps {
  id: string;
  operation: string;
  dispatch: React.Dispatch<{ type: string; payload: { operation: string } }>;
  styles: string;
}

const OperationDigit: React.FC<OperationDigitProps> = ({
  id,
  operation,
  dispatch,
  styles,
}) => {
  return (
    <StyledButtons
      className={styles}
      id={id}
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
    >
      <div className="glass-block-btn"></div>
      <div className="glass-block-btn2"></div>
      {operation}
    </StyledButtons>
  );
};

export default OperationDigit;
