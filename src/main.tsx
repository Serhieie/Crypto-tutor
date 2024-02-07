import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import AppLayout from "./components/AppLayout/AppLayout.tsx";
import Login from "./components/pages/login/Login.tsx";
import Registration from "./components/pages/registration/Registration.tsx";
import MainContent from "./components/AppLayout/MainContent.tsx";
import { NoPage } from "./NoPage.tsx";

const router = createBrowserRouter([
  {
    path: "/Crypto-tutor",
    element: <App />,
    children: [
      {
        path: "/Crypto-tutor",
        element: <AppLayout />,
      },
      {
        path: "/Crypto-tutor",
        element: <Login />,
      },
      {
        path: "/Crypto-tutor/registration",
        element: <Registration />,
      },
      {
        path: "/Crypto-tutor/crypto",
        element: <MainContent />,
      },
      {
        path: "*",
        element: <NoPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        {/* <BrowserRouter
          basename={process.env.NODE_ENV === "production" ? "/Crypto-tutor/" : "/"}
        > */}
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
        {/* </BrowserRouter> */}
      </Provider>
    </React.StrictMode>
  );
} else {
  throw new Error('Root element with id "root" not found in the document.');
}
