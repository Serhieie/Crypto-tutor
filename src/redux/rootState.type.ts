import { AuthState } from "./auth/redux-auth.type";
import { CryptoState } from "./crypto/initialState";
import { calculatorInitialStateProps } from "./calculator/calculatorState";

export interface RootState {
  dashboard: CryptoState;
  auth: AuthState;
  calculator: calculatorInitialStateProps;
}
