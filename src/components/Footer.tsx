import React from "react";
import { Link } from "react-router-dom";
import puzzleLogoFooter from "@src/old_components/img/puzzle-logo-footer.svg";
import { useStores } from "@stores";

interface IProps {}

const Footer: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  return (
    <footer className="footer">
      <div className="footer__lc">
        <div className="footer__lc-logo">
          <Link className="ignore-link" to="/">
            <img alt="logo" className="logo-image" src={puzzleLogoFooter} />
          </Link>
        </div>

        <div className="footer__lc-copyright">© 2021, All rights reserved</div>
      </div>

      <div className="footer__rc">
        <div className="footer__rc--column">
          <p className="landing__subtitle">Tools</p>
          <a
            rel="noopener noreferrer"
            href="https://puzzlescan.com"
            target="_blank"
          >
            Puzzle Explorer
          </a>

          <a
            rel="noopener noreferrer"
            href="https://t.me/puzzle_swap"
            target="_blank"
          >
            Notifications bot
          </a>

          <a
            rel="noopener noreferrer"
            href="https://dxd-team.xyz/puzzle/"
            target="_blank"
          >
            Charts
          </a>
        </div>
        <div className="footer__rc--column">
          <p className="landing__subtitle">Community</p>
          <a
            rel="noopener noreferrer"
            href="https://t.me/puzzleswap"
            target="_blank"
          >
            Telegram chat
          </a>

          <a
            rel="noopener noreferrer"
            href="https://twitter.com/puzzle_swap"
            target="_blank"
          >
            Twitter
          </a>

          <a
            rel="noopener noreferrer"
            href="https://medium.com/@puzzleswap"
            target="_blank"
          >
            Medium
          </a>
        </div>
        <div className="footer__rc--column">
          <div className="landing__subtitle" onClick={accountStore.logout}>
            Logout
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
