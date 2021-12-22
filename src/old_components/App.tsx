import React, { useState } from "react";
import "./App.scss";
import "./Landing.scss";
import "./AddLiquidity.scss";
import "./vovaStyles.css.scss";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";
import ReactNotification from "react-notifications-component";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import { MultiSwapInterface } from "./MultiSwapInterface";
import { LandingModule } from "./LandingModule";
import { WalletModule } from "./WalletModule";
import puzzleLogo from "./img/puzzle-logo.svg";
import puzzleLogoFooter from "./img/puzzle-logo-footer.svg";
import closeIcon from "./img/close.svg";
import { AddLiquidityInterface } from "./AddLiquidityInterface";
import { InvestToPoolInterface } from "./InvestToPoolInterface";
import { globalSigner } from "./SignerHandler";
import { AddOneTokenInterface } from "./AddOneTokenInterface";
import { StakeModule } from "./StakeModule";

const App = () => {
  const trackingId = "G-W203LN8Q6R";
  const history = createBrowserHistory();

  ReactGA.initialize(trackingId);
  history.listen((location) => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  const [isActive, setActive] = useState(false);
  const [isBanner, setBanner] = useState(true);

  const toggleClass = () => {
    setActive(!isActive);
  };

  const handleCloseBanner = () => setBanner(false);

  return (
    <div className="App">
      <div className={isBanner ? "banner__top" : "banner__top--closed"}>
        <div className="banner__top-desc">
          Puzzle cashback rewards are live! 🎊
          <strong>
            <Link to="/puzzle" className="ignore-link">
              Buy PUZZLE
            </Link>
          </strong>
        </div>
        <img
          className="banner__top-icon"
          src={closeIcon}
          alt="close-img"
          onClick={handleCloseBanner}
        />
      </div>
      <header className={isBanner ? "header__with-banner" : "header"}>
        <div className="header__container">
          <div className="header__logo">
            <Link className="ignore-link" to="/">
              <img className="logo-image" src={puzzleLogo} />
            </Link>

            <div
              className={isActive ? "header__toggle--open" : "header__toggle"}
              onClick={toggleClass}
            >
              <div className="header__burger">
                <span className="header__burger-item"></span>
                <span className="header__burger-item"></span>
                <span className="header__burger-item"></span>
              </div>
              <div className="header__cross">
                <span className="header__cross-item"></span>
                <span className="header__cross-item"></span>
              </div>
            </div>
          </div>

          <div className={isActive ? "header__menu--open" : "header__menu"}>
            <div className="header__links">
              <div className="header__link">
                <NavLink to="/farms">
                  <span className="header__menu-link">Farms Pool 1</span>
                </NavLink>
                <NavLink to="/farms2">
                  <span className="header__menu-link">Farms Pool 2</span>
                </NavLink>
                <NavLink to="/defi">
                  <span className="header__menu-link">DeFi Pool</span>
                </NavLink>
                <NavLink to="/puzzle">
                  <span className="header__menu-link">Puzzle Pool</span>
                </NavLink>
              </div>
            </div>
            <div className="header__login">
              <WalletModule></WalletModule>
            </div>
          </div>
        </div>
      </header>

      <ReactNotification className="notificationWindow" />
      <Routes>
        <Route
          path="/puzzle"
          element={<MultiSwapInterface poolName="puzzle" />}
        />

        <Route path="/defi" element={<MultiSwapInterface poolName="defi" />} />
        <Route
          path="/farms"
          element={<MultiSwapInterface poolName="farms" />}
        />
        <Route
          path="/farms2"
          element={<MultiSwapInterface poolName="farms2" />}
        />
        <Route path="/" element={<LandingModule />} />
        <Route path="/stake" element={<StakeModule />} />

        <Route
          path="/farms/addLiquidity"
          element={<AddLiquidityInterface poolName="farms" />}
        />
        <Route
          path="/farms2/addLiquidity"
          element={<AddLiquidityInterface poolName="farms2" />}
        />
        <Route
          path="/defi/addLiquidity"
          element={<AddLiquidityInterface poolName="defi" />}
        />

        <Route
          path="/farms/addOneToken"
          element={<AddOneTokenInterface poolName="farms" />}
        />
        <Route
          path="/farms2/addOneToken"
          element={<AddOneTokenInterface poolName="farms2" />}
        />
        <Route
          path="/defi/addOneToken"
          element={<AddOneTokenInterface poolName="defi" />}
        />

        <Route
          path="/farms/invest"
          element={<InvestToPoolInterface poolName="farms" />}
        />
        <Route
          path="/farms2/invest"
          element={<InvestToPoolInterface poolName="farms2" />}
        />
        <Route
          path="/defi/invest"
          element={<InvestToPoolInterface poolName="defi" />}
        />
      </Routes>
      <footer className="footer">
        <div className="footer__lc">
          <div className="footer__lc-logo">
            <Link className="ignore-link" to="/">
              <img className="logo-image" src={puzzleLogoFooter} />
            </Link>
          </div>

          <div className="footer__lc-copyright">
            © 2021, All rights reserved
          </div>
        </div>

        <div className="footer__rc">
          <div className="footer__rc--column">
            <p className="landing__subtitle">Tools</p>
            <a href="https://puzzlescan.com" target="_blank">
              Puzzle Explorer
            </a>

            <a href="https://t.me/puzzle_swap" target="_blank">
              Notifications bot
            </a>

            <a href="https://dxd-team.xyz/puzzle/" target="_blank">
              Charts
            </a>
          </div>
          <div className="footer__rc--column">
            <p className="landing__subtitle">Community</p>
            <a href="https://t.me/puzzleswap" target="_blank">
              Telegram chat
            </a>

            <a href="https://twitter.com/puzzle_swap" target="_blank">
              Twitter
            </a>

            <a href="https://medium.com/@puzzleswap" target="_blank">
              Medium
            </a>
          </div>
          <div className="footer__rc--column">
            <a
              className="landing__subtitle"
              onClick={() => globalSigner.logout()}
            >
              Logout
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
