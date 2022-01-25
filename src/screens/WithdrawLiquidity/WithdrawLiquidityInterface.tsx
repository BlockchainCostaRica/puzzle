import styled from "@emotion/styled";
import React from "react";
import Layout from "@components/Layout";
import { observer, Observer } from "mobx-react-lite";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { useStores } from "@stores";
import {
  useWithdrawLiquidityVM,
  WithdrawLiquidityVMProvider,
} from "./WithdrawLiquidityVM";
import ShortPoolInfoCard from "@components/ShortPoolInfoCard";
import WithdrawLiquidityAmount from "./WithdrawLiquidityAmount";
import WithdrawLiquidityTable from "./WithdrawLiquidityTable";
import Button from "@components/Button";

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
            <Text fitContent size="medium" type="secondary" textAlign="center">
              Select the percentage of assets you want to withdraw from the pool
            </Text>
            <SizedBox height={24} />
            <ShortPoolInfoCard
              title="From"
              poolLogo={vm.pool.logo}
              poolName={vm.pool.name}
              apy={vm.stats?.apy && vm.stats.apy.toFormat(2) + " %"}
            />
            <SizedBox height={24} />
            {accountStore.address != null ? (
              <>
                <WithdrawLiquidityAmount />
                <SizedBox height={24} />
                <WithdrawLiquidityTable />
              </>
            ) : (
              <Button
                fixed
                onClick={() => accountStore.setWalletModalOpened(true)}
              >
                Connect wallet to withdraw
              </Button>
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
