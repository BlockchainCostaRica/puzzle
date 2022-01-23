import styled from "@emotion/styled";
import React from "react";
import Layout from "@components/Layout";
import { observer, Observer } from "mobx-react-lite";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import SwitchButtons from "@components/SwitchButtons";
import {
  AddLiquidityInterfaceVMProvider,
  useAddLiquidityInterfaceVM,
} from "./AddLiquidityInterfaceVM";
import MultipleTokensAddLiquidity from "./MultipleTokensAddLiquidity";
import BaseTokenAddLiquidityAmount from "./BaseTokenAddLiquidityAmount";
import { useStores } from "@stores";
import ShortPoolInfoCard from "@components/ShortPoolInfoCard";
import { useNavigate } from "react-router-dom";

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
  const { accountStore } = useStores();
  const routes: any = accountStore.ROUTES;
  const vm = useAddLiquidityInterfaceVM();
  const pool = vm.pool;
  const addLiquidityRoute = `/${routes.addLiquidity[vm.poolId]}`;
  const addOneTokenRoute = `/${routes.addOneToken[vm.poolId]}`;
  const navigate = useNavigate();

  const activeTab = addOneTokenRoute.includes(window.location.pathname) ? 1 : 0;

  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <Text fitContent weight={500} size="large">
              Deposit liquidity
            </Text>
            <SizedBox height={4} />
            <Text fitContent size="medium" type="secondary" textAlign="center">
              Select the method of adding liquidity and enter the value
            </Text>
            <SizedBox height={24} />
            <SwitchButtons
              values={["Multiple tokens", `${vm.baseToken.symbol} Token`]}
              active={activeTab}
              onActivate={(i) =>
                i === 1
                  ? navigate(addOneTokenRoute)
                  : navigate(addLiquidityRoute)
              }
            />
            <SizedBox height={24} />
            <ShortPoolInfoCard
              title="To"
              poolLogo={pool && pool.logo}
              poolName={pool && pool.name}
              apy={vm.poolStats.apy}
            />
            <SizedBox height={24} />
            {window.location.pathname.includes(addLiquidityRoute) && (
              <MultipleTokensAddLiquidity />
            )}
            {window.location.pathname.includes(addOneTokenRoute) && (
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
