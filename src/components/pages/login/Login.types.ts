export interface LoginInputsProps {
  windowSize: { width: number; height: number };
}

export interface LoginFormButtonProps {
  resended?: boolean;
  text: string;
  isLoading: boolean;
  onClick?: () => void;
  timeRemaining?: number;
}
