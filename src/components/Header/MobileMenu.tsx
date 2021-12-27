import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";
import LinkGroup from "@components/LinkGroup";
import Divider from "@components/Divider";
import Wallet from "@components/Wallet/Wallet";
import { ROUTES } from "@src/constants";
import Scrollbar from "@components/Scrollbar";
import { Column } from "../Flex";

interface IProps {
  onClose: () => void;
  bannerClosed: boolean;
  opened: boolean;
}

const Root = styled.div<{ bannerClosed: boolean; opened: boolean }>`
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: ${({ bannerClosed }) => (bannerClosed ? 64 : 144)}px;
  left: 0;
  right: 0;
  height: calc(100vh - ${({ bannerClosed }) => (bannerClosed ? 64 : 144)}px);
  transition: 0.2s;
  overflow: hidden;
  ${({ opened }) => (!opened ? `height: 0px;` : "")}
  .menu-body {
    display: flex;
    flex-direction: column;
    background: #fff;
  }
`;

const poolsMenu = Object.entries(ROUTES.pools).map(([name, link]) => ({
  name,
  link,
}));

const toolsMenu = [
  { name: "Puzzle Explorer", link: "https://puzzlescan.com/", outer: true },
  { name: "Notifications bot", link: "https://t.me/puzzle_swap", outer: true },
  { name: "Charts", link: "https://dxd-team.xyz/puzzle/", outer: true },
];
const communityMenu = [
  { name: "Telegram", link: "https://t.me/puzzleswap", outer: true },
  { name: "Twitter", link: "https://twitter.com/puzzle_swap", outer: true },
  { name: "Medium", link: "https://medium.com/@puzzleswap", outer: true },
];

const MobileMenu: React.FC<IProps> = ({ bannerClosed, opened, onClose }) => {
  return (
    <Root {...{ bannerClosed, opened }}>
      <div className="menu-body">
        <Divider />
        <Scrollbar style={{ marginRight: 16 }}>
          <Column crossAxisSize="max" style={{ maxHeight: "50vh" }}>
            <SizedBox width={1} height={24} />
            <LinkGroup
              onClick={onClose}
              style={{ marginLeft: 24 }}
              title="Pools"
              links={poolsMenu}
            />
            <SizedBox height={24} />
            <LinkGroup
              style={{ marginLeft: 24 }}
              title="Tools"
              links={toolsMenu}
            />
            <SizedBox height={24} />
            <LinkGroup
              style={{ marginLeft: 24 }}
              title="Community"
              links={communityMenu}
            />
            <SizedBox height={24} />
            <Divider />
            <SizedBox height={24} />
            <Wallet />
            <SizedBox width={1} height={24} />
          </Column>
        </Scrollbar>
      </div>
    </Root>
  );
};
export default MobileMenu;
