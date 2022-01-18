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
import MultipleTokensAddLiquidity from "./MultipleTokensAddLiquidity";
import BaseTokenAddLiquidity from "./BaseTokenAddLiquidity";

interface IProps {
  poolId: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  min-height: 100%;
  margin-bottom: 24px;
  margin-top: 40px;
  width: 100%;
  max-width: 560px;
  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const AddLiquidityInterfaceImpl = () => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const vm = useAddLiquidityInterfaceVM();
  console.log(vm.pool);
  return (
    <Layout>
      <Root>
        <Text fitContent weight={500} size="large">
          Deposit liquidity
        </Text>
        <SizedBox height={4} />
        <Text fitContent size="medium" type="secondary">
          Select a pool to invest
        </Text>
        <SizedBox height={24} />
        <SwitchButtons
          values={["Multiple tokens", `${vm.baseToken.symbol} Token`]}
          active={activeTab}
          onActivate={(i) => setActiveTab(i)}
        />
        <SizedBox height={24} />
        {activeTab === 0 ? (
          <MultipleTokensAddLiquidity />
        ) : (
          <BaseTokenAddLiquidity />
        )}
      </Root>
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
