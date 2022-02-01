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

const Root = styled(Column)`
  width: 100%;
  align-items: center;
  background: #f1f2fe;
  min-height: 100vh;
`;

const App: React.FC = () => {
  // const { accountStore, notificationStore } = useStores();
  const { accountStore } = useStores();
  const { ROUTES } = accountStore;
  // useEffect(() => {
  //   notificationStore.notify(
  //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Condimentum risus, eget dis mus nibh fringilla posuere.",
  //     {
  //       title: "Headline",
  //       linkTitle: "Action",
  //       link: "https://google.com",
  //     }
  //   );
  // });
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

        <Route path="*" element={<NotFound />} />
      </Routes>
      {/*<ReactNotification className="notificationWindow" />*/}
    </Root>
  );
};

export default observer(App);
