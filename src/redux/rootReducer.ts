import { combineReducers } from "redux";
import { cryptoApi } from "./cryptoApi";
import { persistedAuthReducer } from "./auth/slice-auth";
import { persistedDashboardReducer } from "./dashboardSlice";

const rootReducer = combineReducers({
  dashboard: persistedDashboardReducer,
  auth: persistedAuthReducer,
  [cryptoApi.reducerPath]: cryptoApi.reducer,
});

export default rootReducer;
