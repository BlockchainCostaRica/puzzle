import React from "react";
import { Link } from "react-router-dom";
import puzzleLogoFooter from "@src/old_components/img/puzzle-logo-footer.svg";
import { useStores } from "@stores";
import { Anchor } from "@components/Anchor";

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
          <Anchor href="https://puzzlescan.com">Puzzle Explorer</Anchor>

          <Anchor href="https://t.me/puzzle_swap">Notifications bot</Anchor>

          <Anchor href="https://dxd-team.xyz/puzzle/">Charts</Anchor>
        </div>
        <div className="footer__rc--column">
          <p className="landing__subtitle">Community</p>
          <Anchor href="https://t.me/puzzleswap">Telegram chat</Anchor>

          <Anchor href="https://twitter.com/puzzle_swap">Twitter</Anchor>

          <Anchor href="https://medium.com/@puzzleswap">Medium</Anchor>
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
