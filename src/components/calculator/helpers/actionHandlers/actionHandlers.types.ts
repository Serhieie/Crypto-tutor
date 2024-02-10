export interface State {
  previousOperand?: number | string | null;
  currentOperand?: number | string | null;
  operation?: string | null | boolean;
  result?: number | null;
  overwrite?: boolean;
  secondOperator?: boolean | undefined | string;
}

export interface Payload {
  digit?: string;
  operation?: string | boolean | undefined;
  value?: number | undefined;
}
