import styled from "@emotion/styled";
import React from "react";
import { Column, Row } from "@components/Flex";
import TokenInfo from "@screens/TradeInterface/TokenSelectModal/TokenInfo";
import Balance from "@src/entities/Balance";
import { observer } from "mobx-react-lite";
import Scrollbar from "@components/Scrollbar";
import { useWalletVM } from "@components/Wallet/WalletModal/WalletVM";
import SizedBox from "@components/SizedBox";

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
  return (
    <Root>
      <TabsWrapper></TabsWrapper>
      <Scrollbar onScrollY={handleScroll}>
        <ListWrapper headerExpanded={vm.headerExpanded}>
          {vm.balances.map((t) => (
            <TokenInfo key={t.assetId} token={new Balance(t)} />
          ))}
          <SizedBox height={64} width={1} />
        </ListWrapper>
      </Scrollbar>
    </Root>
  );
};
export default observer(WalletModalBody);
