import { combineReducers } from "redux";
import { cryptoApi } from "./crypto/cryptoApi";
import { persistedAuthReducer } from "./auth/slice-auth";
import { persistedDashboardReducer } from "./crypto/dashboardSlice";
import { persistedCalculatorReducer } from "./calculator/calculatorSlice";

const rootReducer = combineReducers({
  dashboard: persistedDashboardReducer,
  auth: persistedAuthReducer,
  calculator: persistedCalculatorReducer,
  [cryptoApi.reducerPath]: cryptoApi.reducer,
});

export default rootReducer;
