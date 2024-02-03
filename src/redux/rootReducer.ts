import { combineReducers } from "redux";
import { cryptoApi } from "./cryptoApi";
import { persistedDashboardReducer } from "./dashboardSlice";

const rootReducer = combineReducers({
  dashboard: persistedDashboardReducer,
  [cryptoApi.reducerPath]: cryptoApi.reducer,
});

export default rootReducer;
