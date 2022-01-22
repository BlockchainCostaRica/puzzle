import styled from "@emotion/styled";
import React, { useState } from "react";
import Layout from "@components/Layout";
import { observer } from "mobx-react-lite";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import SwitchButtons from "@components/SwitchButtons";
import {
  AddLiquidityInterfaceVMProvider,
  useAddLiquidityInterfaceVM,
} from "./AddLiquidityInterfaceVM";
import MultipleTokensAddLiquidity from "./MultipleTokensAddLiquidity/MultipleTokensAddLiquidity";
import DepositToPool from "@screens/AddLiquidityInterface/DepositToPool";
import BaseTokenAddLiquidityAmount from "@screens/AddLiquidityInterface/BaseTokenAddLiquidityAmount";
import { useStores } from "@stores";
import Button from "@components/Button";
import { Observer } from "mobx-react-lite";

interface IProps {
  poolId: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  min-height: 100%;
  margin-bottom: 24px;
  margin-top: 40px;
  width: 100%;
  max-width: calc(560px + 32px);
  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const AddLiquidityInterfaceImpl = () => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const vm = useAddLiquidityInterfaceVM();
  const { accountStore } = useStores();
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <Text fitContent weight={500} size="large">
              Deposit liquidity
            </Text>
            <SizedBox height={4} />
            <Text fitContent size="medium" type="secondary">
              Select the method of adding liquidity and enter the value
            </Text>
            <SizedBox height={24} />
            <SwitchButtons
              values={["Multiple tokens", `${vm.baseToken.symbol} Token`]}
              active={activeTab}
              onActivate={(i) => setActiveTab(i)}
            />
            <SizedBox height={24} />
            <DepositToPool />
            <SizedBox height={24} />
            {accountStore.address == null ? (
              <Button
                fixed
                onClick={() => accountStore.setWalletModalOpened(true)}
              >
                Connect wallet to deposit
              </Button>
            ) : activeTab === 0 ? (
              <MultipleTokensAddLiquidity />
            ) : (
              <BaseTokenAddLiquidityAmount />
            )}
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const AddLiquidityInterface: React.FC<IProps> = ({ poolId }) => {
  return (
    <AddLiquidityInterfaceVMProvider poolId={poolId}>
      <AddLiquidityInterfaceImpl />
    </AddLiquidityInterfaceVMProvider>
  );
};

export default observer(AddLiquidityInterface);
