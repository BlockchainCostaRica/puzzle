import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";
import LinkGroup from "@components/LinkGroup";
import { WalletModule } from "@src/old_components/WalletModule";
import Divider from "@components/Divider";

interface IProps {
  bannerClosed: boolean;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
`;

const Popover = styled.div<{ bannerClosed: boolean }>`
  z-index: 1;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: ${({ bannerClosed }) => (bannerClosed ? 64 : 144)}px;
  left: 0;
  right: 0;
  bottom: 0;
`;

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

const MobileMenu: React.FC<IProps> = ({ bannerClosed }) => {
  return (
    <Popover {...{ bannerClosed }}>
      <Root>
        <Divider />
        <SizedBox height={24} />
        <LinkGroup style={{ marginLeft: 24 }} title="Tools" links={toolsMenu} />
        <SizedBox height={24} />
        <LinkGroup
          style={{ marginLeft: 24 }}
          title="Community"
          links={communityMenu}
        />
        <SizedBox height={24} />
        <Divider />
        <SizedBox height={24} />
        <WalletModule />
        <SizedBox height={24} />
      </Root>
    </Popover>
  );
};
export default MobileMenu;
