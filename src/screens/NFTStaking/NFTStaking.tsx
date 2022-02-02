import styled from "@emotion/styled";
import React from "react";
import { Observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import Text from "@components/Text";
import { NFTStakingVMProvider } from "./NFTStakingVM";

const Root = styled.div`
  display: flex;
  flex-direction: column;
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

const NFTStakingImpl: React.FC = () => {
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <Text weight={500} size="large">
              PUZZLE Staking
            </Text>
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const NFTStaking: React.FC = () => (
  <NFTStakingVMProvider>
    <NFTStakingImpl />
  </NFTStakingVMProvider>
);
export default NFTStaking;
