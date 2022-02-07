import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import AddLiquidityInterface from "@src/screens/AddLiquidityInterface";
import InvestToPoolInterface from "@src/screens/InvestToPoolInterface";
import Header from "@components/Header";
import { Column } from "@components/Flex";
import NotFound from "@screens/NotFound";
import Landing from "@screens/Landing";
import { useStores } from "@stores";
import Invest from "@screens/Invest";
import WithdrawLiquidityInterface from "@screens/WithdrawLiquidity";
import TradeInterface from "@screens/TradeInterface";
import Staking from "@screens/Staking";
import NFTStaking from "@screens/NFTStaking";

const Root = styled(Column)`
  width: 100%;
  align-items: center;
  background: #f1f2fe;
  min-height: 100vh;
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
        <Route path={ROUTES.STAKE} element={<Staking />} />

        {/* Trade */}
        <Route path={ROUTES.TRADE} element={<TradeInterface />} />

        {/* Invest table routes */}
        <Route path={ROUTES.INVEST} element={<Invest />} />

        {/* Invest pool info routes */}
        {Object.entries(ROUTES.invest).map(([poolId, path]) => (
          <Route
            key={path}
            path={path}
            element={<InvestToPoolInterface poolId={poolId} />}
          />
        ))}

        {/* Add liquidity routes */}
        {[
          ...Object.entries(ROUTES.addLiquidity),
          ...Object.entries(ROUTES.addOneToken),
        ].map(([poolId, path]) => (
          <Route
            key={path}
            path={path}
            element={<AddLiquidityInterface poolId={poolId} />}
          />
        ))}

        {/* Withdraw liquidity routes */}
        {Object.entries(ROUTES.withdraw).map(([poolId, path]) => (
          <Route
            key={path}
            path={path}
            element={<WithdrawLiquidityInterface poolId={poolId} />}
          />
        ))}

        <Route path={ROUTES.ULTRASTAKE} element={<NFTStaking />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Root>
  );
};

export default observer(App);
