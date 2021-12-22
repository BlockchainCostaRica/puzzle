import styled from "@emotion/styled";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import closeIcon from "@src/old_components/img/close.svg";
import puzzleLogo from "@src/old_components/img/puzzle-logo.svg";
import { WalletModule } from "@src/old_components/WalletModule";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header: React.FC<IProps> = () => {
  const [isActive, setActive] = useState(false);
  const [isBanner, setBanner] = useState(true);

  const toggleClass = () => {
    setActive(!isActive);
  };
  return (
    <>
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
          onClick={() => setBanner(false)}
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
    </>
  );
};
export default Header;
