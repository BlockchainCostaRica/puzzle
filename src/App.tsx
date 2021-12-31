import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import ReactNotification from "react-notifications-component";
import MultiSwapInterface from "@screens/MultiSwapInterface";
import { StakeModule } from "@src/old_components/StakeModule";
import { AddLiquidityInterface } from "@src/old_components/AddLiquidityInterface";
import { AddOneTokenInterface } from "@src/old_components/AddOneTokenInterface";
import { InvestToPoolInterface } from "@src/old_components/InvestToPoolInterface";
import Header from "@components/Header/Header";
import { Column } from "@components/Flex";
import NotFound from "@screens/NotFound";
import Landing from "@screens/Landing";
import { useStores } from "@stores";
import { TPoolId } from "@src/constants";
import "./old_components/App.scss";
import "./old_components/Landing.scss";
import "./old_components/AddLiquidity.scss";
import "./old_components/vovaStyles.css.scss";
import { WalletModule } from "@src/old_components/WalletModule";

const Root = styled(Column)`
  width: 100%;
  align-items: center;
  z-index: 101;
`;

const App: React.FC = () => {
  const { accountStore } = useStores();
  const { ROUTES } = accountStore;
  return (
    <Root>
      <Header />
      <Routes>
        {/* Landing */}
        <Route path={ROUTES.ROOT} element={<Landing />} />
        {/* Stake */}
        <Route path={ROUTES.STAKE} element={<StakeModule />} />

        {/* Swap routes */}
        {Object.entries(ROUTES.pools).map(([poolId, path]) => (
          <Route
            key={path}
            path={path}
            element={<MultiSwapInterface poolId={poolId as TPoolId} />}
          />
        ))}

        {/* Add liquidity routes */}
        {Object.entries(ROUTES.addLiquidity).map(([poolId, path]) => (
          <Route
            key={path}
            path={path}
            element={<AddLiquidityInterface poolName={poolId} />}
          />
        ))}

        {/* Add One Token routes */}
        {Object.entries(ROUTES.addOneToken).map(([poolId, path]) => (
          <Route
            key={path}
            path={path}
            element={<AddOneTokenInterface poolName={poolId} />}
          />
        ))}

        {/* Invest routes */}
        {Object.entries(ROUTES.invest).map(([poolId, path]) => (
          <Route
            key={path}
            path={path}
            element={<InvestToPoolInterface poolName={poolId} />}
          />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ReactNotification className="notificationWindow" />
      <WalletModule />
    </Root>
  );
};

export default observer(App);
