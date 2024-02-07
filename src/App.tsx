import { fetchCurrentUser } from "./redux/auth/operations-auth";
import AppLayout from "./components/AppLayout/AppLayout";
import { useAuth } from "./helpers/hooks/authSelector";
import { useDispatch } from "react-redux";
import { SuspenseLoader } from "./components/Loaders/SuspenseLoader";
import { NoPage } from "./NoPage";
import React, { useEffect, lazy } from "react";
import PrivateRoute from "./Redirect/PrivateRoute";
import RestrictedRoute from "./Redirect/RestrictedRoute";
import { Routes, Route } from "react-router-dom";

const Registration = lazy(() => import("./components/pages/registration/Registration"));
const Login = lazy(() => import("./components/pages/login/Login"));
const Crypto = lazy(() => import("./components/AppLayout/MainContent"));

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isRefreshing, isLoggedIn } = useAuth();

  console.log("refreshing", isRefreshing);
  console.log("isLoggedIn", isLoggedIn);

  //fetch current user
  useEffect(() => {
    //how to type it correctly??
    dispatch(fetchCurrentUser() as any);
  }, [dispatch]);

  return isRefreshing ? (
    <SuspenseLoader />
  ) : (
    <Routes>
      <Route path="#/" element={<AppLayout />}>
        <Route
          index
          element={
            <RestrictedRoute redirectTo="#/crypto">
              <Login />
            </RestrictedRoute>
          }
        />
        <Route
          path="#/registration"
          element={
            <RestrictedRoute redirectTo="#/crypto">
              <Registration />
            </RestrictedRoute>
          }
        />

        <Route
          path="#/crypto"
          element={
            <PrivateRoute redirectTo="#/">
              <Crypto />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
};

export default App;
