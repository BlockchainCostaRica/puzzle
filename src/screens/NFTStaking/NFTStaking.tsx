import styled from "@emotion/styled";
import React, { useState } from "react";
import { Observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import Text from "@components/Text";
import { NFTStakingVMProvider, useNFTStakingVM } from "./NFTStakingVM";
import GoBack from "@components/GoBack";
import SizedBox from "@components/SizedBox";
import Reward from "./Reward";
import Tabs from "@components/Tabs";
import MarketNfts from "@screens/NFTStaking/MarketNfts";
import AccountNfts from "@screens/NFTStaking/AccountNfts";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 16px;
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
// const NFTContainer = styled.div`
//   display: grid;
//   row-gap: 16px;
//   grid-template-columns: 1fr;
//   @media (min-width: 604px) {
//     //grid-template-columns: repeat(4, 1fr);
//     grid-template-columns: repeat(auto-fill, 278px);
//     column-gap: 16px;
//   }
// `;
const NFTStakingImpl: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const vm = useNFTStakingVM();
  return (
    <Layout>
      <Observer>
        {() => {
          const marketNftAmount = vm.artworks.length;
          const accountNftAmount = vm.accountArtworks.length;
          return (
            <Root>
              <GoBack link="/stake" text="Back to Staking" />
              <SizedBox height={24} />
              <Text weight={500} size="large">
                NFT-Staking
              </Text>
              <SizedBox height={8} />
              <Text type="secondary">
                Stake Puzzle NFT to share the rewards pool from Puzzle
                aggregator fees and boost your staking rewards up to
                <b style={{ color: "#35A15A" }}> 45.3 %</b>. You can stake one
                of each type of NFTs.
              </Text>
              <Reward />
              <SizedBox height={24} />
              <Tabs
                tabs={[
                  { name: "On my wallet", additionalInfo: accountNftAmount },
                  { name: "Market", additionalInfo: marketNftAmount },
                ]}
                activeTab={activeTab}
                setActive={setActiveTab}
              />
              <SizedBox height={16} />
              {activeTab == 0 ? <AccountNfts /> : <MarketNfts />}
            </Root>
          );
        }}
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
