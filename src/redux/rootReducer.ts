import { combineReducers } from "redux";
import { cryptoApi } from "./crypto/cryptoApi";
import { persistedAuthReducer } from "./auth/slice-auth";
import { persistedDashboardReducer } from "./crypto/dashboardSlice";

const rootReducer = combineReducers({
  dashboard: persistedDashboardReducer,
  auth: persistedAuthReducer,
  [cryptoApi.reducerPath]: cryptoApi.reducer,
});

export default rootReducer;
