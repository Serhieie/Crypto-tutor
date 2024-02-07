import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
// import { BrowserRouter } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          {/* <BrowserRouter basename="/Crypto-tutor"> */}
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
          {/* </BrowserRouter> */}
        </HashRouter>
      </Provider>
    </React.StrictMode>
  );
} else {
  throw new Error('Root element with id "root" not found in the document.');
}
