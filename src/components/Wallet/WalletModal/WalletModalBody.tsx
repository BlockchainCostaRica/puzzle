import styled from "@emotion/styled";
import React, { useState } from "react";
import { Column, Row } from "@components/Flex";
import { observer } from "mobx-react-lite";
import Scrollbar from "@components/Scrollbar";
import { useWalletVM } from "@components/Wallet/WalletModal/WalletVM";
import SizedBox from "@components/SizedBox";
import Tabs from "@components/Tabs";
import AssetsBalances from "@components/Wallet/WalletModal/AssetsBalances";
import PoolsBalances from "@components/Wallet/WalletModal/PoolsBalances";
import NFTs from "@components/Wallet/WalletModal/NFTs";

interface IProps {}

const Root = styled(Column)`
  width: 100%;
  box-sizing: border-box;
  background: #fff;

  & > * {
    width: 100%;
  }
`;

const TabsWrapper = styled(Row)`
  border-radius: 16px 16px 0px 0px;
  background: #fff;
  height: 56px;
  margin-top: -56px;
`;

const ListWrapper = styled.div<{ headerExpanded: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: 0.4s;
  height: ${({ headerExpanded }) =>
    headerExpanded ? "calc(100vh - 212px)" : "calc(100vh - 96px)"};

  @media (min-width: 560px) {
    height: ${({ headerExpanded }) =>
      headerExpanded ? "calc(520px - 212px)" : "calc(520px - 96px)"};
  }
`;

const WalletModalBody: React.FC<IProps> = () => {
  const vm = useWalletVM();
  const handleScroll = (container: HTMLElement) => {
    vm.setHeaderExpanded(container.scrollTop === 0);
  };
  const [activeTab, setActiveTab] = useState<number>(2);
  return (
    <Root>
      <TabsWrapper>
        <Tabs
          tabs={[{ name: "Assets" }, { name: "Investments" }, { name: "NFTs" }]}
          activeTab={activeTab}
          setActive={(v) => setActiveTab(v)}
          style={{ justifyContent: "space-evenly", paddingTop: 16 }}
          tabStyle={{ flex: 1, marginRight: 0 }}
        />
      </TabsWrapper>
      <Scrollbar onScrollY={handleScroll}>
        <ListWrapper headerExpanded={vm.headerExpanded}>
          <SizedBox height={8} />
          {activeTab === 0 && <AssetsBalances />}
          {activeTab === 1 && <PoolsBalances />}
          {activeTab === 2 && <NFTs />}
          <SizedBox height={64} width={1} />
        </ListWrapper>
      </Scrollbar>
    </Root>
  );
};
export default observer(WalletModalBody);
