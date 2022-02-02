import styled from "@emotion/styled";
import React from "react";
import { Observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import Text from "@components/Text";
import { NFTStakingVMProvider } from "./NFTStakingVM";
import GoBack from "@components/GoBack";
import SizedBox from "@components/SizedBox";
import NFTCard from "@screens/NFTStaking/NFTCard";
import eagle from "@src/assets/nfts/eagle.png";

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
const NFTContainer = styled.div`
  display: grid;
`;
const NFTStakingImpl: React.FC = () => {
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <GoBack link="/stake" text="Back to Staking" />
            <SizedBox height={24} />
            <Text weight={500} size="large">
              NFT-Staking
            </Text>
            <SizedBox height={8} />
            <Text type="secondary">
              Stake special NFTs to boost APY up to +25 %
            </Text>
            <SizedBox height={24} />
            <Text weight={500} type="secondary">
              NFT to stake
            </Text>
            <SizedBox height={8} />
            <NFTContainer>
              <NFTCard
                src={eagle}
                price="~ 3,099 $"
                boostAPY={10.11}
                name="Early eagle"
                isInOwn
              />
            </NFTContainer>
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
