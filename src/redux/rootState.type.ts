import { AuthState } from "./auth/redux-auth.type";
import { CryptoState } from "./initialState";

export interface RootState {
  dashboard: CryptoState;
  auth: AuthState;
}
