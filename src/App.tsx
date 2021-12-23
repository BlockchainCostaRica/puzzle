import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import ReactNotification from "react-notifications-component";
import MultiSwapInterface from "@screens/MultiSwapInterface";
import { LandingModule } from "@src/old_components/LandingModule";
import { StakeModule } from "@src/old_components/StakeModule";
import { AddLiquidityInterface } from "@src/old_components/AddLiquidityInterface";
import { AddOneTokenInterface } from "@src/old_components/AddOneTokenInterface";
import { InvestToPoolInterface } from "@src/old_components/InvestToPoolInterface";
import Header from "@components/Header/Header";
import { Column } from "@components/Flex";

const Root = styled(Column)`
  width: 100%;
  align-items: center;
`;

const Body = styled(Column)`
  width: 100%;
  margin-top: 40px;
  max-width: 1440px;
  //padding: 0 48px;
  //box-sizing: border-box;
  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const App: React.FC = () => {
  const trackingId = "G-W203LN8Q6R";

  // ReactGA.initialize(trackingId);
  // history.listen((location) => {
  //   ReactGA.pageview(window.location.pathname + window.location.search);
  // });

  return (
    <Root>
      <Header />
      <Body>
        <Routes>
          <Route path="/" element={<LandingModule />} />
          <Route
            path="puzzle"
            element={<MultiSwapInterface poolName="puzzle" />}
          />

          <Route path="defi" element={<MultiSwapInterface poolName="defi" />} />
          <Route
            path="farms"
            element={<MultiSwapInterface poolName="farms" />}
          />
          <Route
            path="farms2/*"
            element={<MultiSwapInterface poolName="farms2" />}
          />
          <Route path="stake" element={<StakeModule />} />

          <Route
            path="farms/addLiquidity"
            element={<AddLiquidityInterface poolName="farms" />}
          />
          <Route
            path="farms2/addLiquidity"
            element={<AddLiquidityInterface poolName="farms2" />}
          />
          <Route
            path="defi/addLiquidity"
            element={<AddLiquidityInterface poolName="defi" />}
          />

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
        </Routes>
      </Body>
      {/*<Footer />*/}
      <ReactNotification className="notificationWindow" />
    </Root>
  );
};

export default observer(App);
