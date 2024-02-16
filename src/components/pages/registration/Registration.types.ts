export interface InputProps {
  widthClass?: string;
  withInputClass: string;
  fieldsStyle: string;
  labelText?: string;
}

export interface RegLogInputsProps {
  windowSize: { height: number; width: number };
}

export interface initialValuesTypes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationFormButtonProps {
  isLoading: boolean;
  onClick?: () => void;
  text: string;
  resended?: boolean;
  timeRemaining?: number;
}
