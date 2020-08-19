import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./Containers/App";
import * as serviceWorker from "./serviceWorker";
import { ProductProvider } from "./Components/CanteenPage/context";
import { LoginProvider } from "./context/LoginContext";

ReactDOM.render(
  <React.StrictMode>
    <LoginProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </LoginProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
