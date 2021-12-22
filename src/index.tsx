import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "normalize.css";
import { RootStore, storesContext } from "@stores";

const mobxStore = new RootStore();

ReactDOM.render(
  <React.StrictMode>
    <storesContext.Provider value={mobxStore}>
      <Router

      // navigator={mobxStore.routerStore.history}
      // location={mobxStore.routerStore.history.location}
      >
        <App />
      </Router>
    </storesContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
