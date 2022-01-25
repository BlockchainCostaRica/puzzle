import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";
import TokenInput from "@screens/TradeInterface/TokenInput";
import SwapDetailRow from "@components/SwapDetailRow";
import Divider from "@src/components/Divider";
import CashbackLabel from "@components/CashbackLabel";
import Card from "@components/Card";
import Details from "@screens/TradeInterface/Details";
import { Observer } from "mobx-react-lite";
import SwitchTokensButton from "@screens/TradeInterface/SwitchTokensButton";
import SwapButton from "@screens/TradeInterface/SwapButton";
import BN from "@src/utils/BN";
import Layout from "@components/Layout";
import { TradeVMProvider, useTradeVM } from "@screens/TradeInterface/TradeVM";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  min-width: 100%;
  min-height: 100%;
  margin-bottom: 24px;
  margin-top: 40px;
  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const TradeInterfaceImpl: React.FC = () => {
  const vm = useTradeVM();
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <Card paddingDesktop="32px" maxWidth={560}>
              <TokenInput
                selectable={true}
                decimals={8}
                amount={new BN(100000)}
                setAmount={() => null}
                assetId={""}
                setAssetId={() => null}
                balances={[]}
              />
              <SwitchTokensButton />
              <TokenInput
                selectable={true}
                decimals={8}
                amount={new BN(100000)}
                setAmount={() => null}
                assetId={""}
                setAssetId={() => null}
                balances={[]}
              />
              <SizedBox height={24} />
              <SwapButton />
              <SizedBox height={16} />
              {vm.cashback && (
                <>
                  <Divider />
                  <SwapDetailRow style={{ marginBottom: 0 }} title="Cashback">
                    <CashbackLabel>{vm.cashback}</CashbackLabel>
                  </SwapDetailRow>
                </>
              )}
            </Card>
            <SizedBox height={16} />
            <Details />
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const TradeInterface: React.FC = () => (
  <TradeVMProvider>
    <TradeInterfaceImpl />
  </TradeVMProvider>
);
export default TradeInterface;
