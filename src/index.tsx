import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "normalize.css";
import { RootStore, storesContext } from "@stores";
import { loadState, saveState } from "@src/utils/localStorage";
import { autorun } from "mobx";
import "react-perfect-scrollbar/dist/css/styles.css";
import "rc-notification/assets/index.css";
import "react-loading-skeleton/dist/skeleton.css";
import "rc-slider/assets/index.css";
import "rc-dialog/assets/index.css";

const initState = loadState();

const mobxStore = new RootStore(initState);
autorun(
  () => {
    console.dir(mobxStore);
    saveState(mobxStore.serialize());
  },
  { delay: 1000 }
);

ReactDOM.render(
  <React.StrictMode>
    <storesContext.Provider value={mobxStore}>
      <Router>
        <App />
      </Router>
    </storesContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
