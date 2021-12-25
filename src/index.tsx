import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "normalize.css";
import { RootStore, storesContext } from "@stores";
import "react-perfect-scrollbar/dist/css/styles.css";
import { loadState, saveState } from "@src/utils/localStorage";
import { autorun } from "mobx";

const initState = loadState();

const mobxStore = new RootStore(initState);
autorun(
  () => {
    console.dir(mobxStore);
    saveState(mobxStore.serialize());
  },
  { delay: 1000 }
);

//todo add ReactGA support
// const trackingId = "G-W203LN8Q6R";
// ReactGA.initialize(trackingId);
// history.listen(({ location }) => {
//   console.log(location.pathname + location.search);
//   ReactGA.pageview(location.pathname + location.search);
// });

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
