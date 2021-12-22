import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import puzzleLogoFooter from "@src/old_components/img/puzzle-logo-footer.svg";
import { globalSigner } from "@src/old_components/SignerHandler";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Footer: React.FC<IProps> = () => {
  return (
    <footer className="footer">
      <div className="footer__lc">
        <div className="footer__lc-logo">
          <Link className="ignore-link" to="/">
            <img className="logo-image" src={puzzleLogoFooter} />
          </Link>
        </div>

        <div className="footer__lc-copyright">© 2021, All rights reserved</div>
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
  );
};
export default Footer;
