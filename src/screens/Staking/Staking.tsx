import styled from "@emotion/styled";
import React from "react";
import { Observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import { StakingVMProvider } from "./StakingVM";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Reward from "./Reward";
import NFTStaking from "./NFTStaking";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  min-height: 100%;
  max-width: calc(1160px + 32px);
  margin-bottom: 24px;
  margin-top: 40px;
  text-align: left;
  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const StakingImpl: React.FC = () => {
  // const vm = useStakingVM();

  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <Text weight={500} size="large">
              PUZZLE Staking
            </Text>
            <SizedBox height={8} />
            <Text type="secondary">
              For every swap on the exchange, 0.8% of the swap fees are
              distributed as USDN to your share of the staking balance.
            </Text>
            <Reward />
            <NFTStaking />
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const Staking: React.FC = () => (
  <StakingVMProvider>
    <StakingImpl />
  </StakingVMProvider>
);
export default Staking;
