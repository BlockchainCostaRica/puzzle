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
`;

const App: React.FC = () => {
  const { accountStore } = useStores();
  const { ROUTES } = accountStore;
  return (
    <Root>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />

        {/*swap routes*/}
        {Object.entries(ROUTES.pools).map(([poolId, path]) => (
          <Route
            key={path}
            path={path}
            element={<MultiSwapInterface poolId={poolId as TPoolId} />}
          />
        ))}

        {/*add liquidity routes*/}
        {Object.entries(ROUTES.addLiquidity).map(([poolId, path]) => (
          <Route
            key={path}
            path={path}
            element={<AddLiquidityInterface poolName={poolId} />}
          />
        ))}

        <Route path="stake" element={<StakeModule />} />

        <Route
          path="farms/addOneToken"
          element={<AddOneTokenInterface poolName="farms" />}
        />
        <Route
          path="farms2/addOneToken"
          element={<AddOneTokenInterface poolName="farms2" />}
        />
        <Route
          path="defi/addOneToken"
          element={<AddOneTokenInterface poolName="defi" />}
        />

        <Route
          path="farms/invest"
          element={<InvestToPoolInterface poolName="farms" />}
        />
        <Route
          path="farms2/invest"
          element={<InvestToPoolInterface poolName="farms2" />}
        />
        <Route
          path="defi/invest"
          element={<InvestToPoolInterface poolName="defi" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ReactNotification className="notificationWindow" />
      <WalletModule />
    </Root>
  );
};

export default observer(App);
