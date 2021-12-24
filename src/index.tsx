import React from "react";
import ReactDOM from "react-dom";
import * as reactAlert from "react-alert";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "normalize.css";
import { RootStore, storesContext } from "@stores";
import "react-perfect-scrollbar/dist/css/styles.css";
import AlertTemplate from "@components/Header/AlertTemplate";

const mobxStore = new RootStore();
const options = {
  timeout: 5000,
  position: reactAlert.positions.TOP_RIGHT,
};
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
        <reactAlert.Provider template={AlertTemplate} {...options}>
          <App />
        </reactAlert.Provider>
      </Router>
    </storesContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
