import styled from "@emotion/styled";
import React from "react";
import Layout from "@components/Layout";
import { observer, Observer } from "mobx-react-lite";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { useStores } from "@stores";
import Button from "@components/Button";
import {
  useWithdrawLiquidityVM,
  WithdrawLiquidityVMProvider,
} from "@screens/WithdrawLiquidity/WithdrawLiquidityVM";
import FromToPoolCard from "@components/FromToPoolCard";

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

const WithdrawLiquidityInterfaceImpl = () => {
  const vm = useWithdrawLiquidityVM();
  const { accountStore } = useStores();
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <Text fitContent weight={500} size="large">
              Withdraw liquidity
            </Text>
            <SizedBox height={4} />
            <FromToPoolCard
              title="From"
              poolLogo={vm.pool.logo}
              poolName={vm.pool.name}
              apy={""}
            />
            <SizedBox height={24} />
            {accountStore.address == null ? (
              <Button
                fixed
                onClick={() => accountStore.setWalletModalOpened(true)}
              >
                Connect wallet to deposit
              </Button>
            ) : (
              <div>hui</div>
            )}
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const WithdrawLiquidityInterface: React.FC<IProps> = ({ poolId }) => {
  return (
    <WithdrawLiquidityVMProvider poolId={poolId}>
      <WithdrawLiquidityInterfaceImpl />
    </WithdrawLiquidityVMProvider>
  );
};

export default observer(WithdrawLiquidityInterface);
