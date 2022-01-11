import styled from "@emotion/styled";
import React from "react";
import { Observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import { PoolsVMProvider, usePoolsVM } from "@screens/Pools/PoolsScreenVM";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import PoolInformation from "@screens/Pools/PoolInformation";
import YourLiquidity from "@screens/Pools/YourLiquidity";
import { Column } from "@src/components/Flex";
import FeesReturn from "@screens/Pools/FeesReturn";
import PoolComposition from "@screens/Pools/PoolComposition";
import RewardToClaim from "@screens/Pools/RewardToClaim";

interface IProps {
  poolId: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  min-height: 100%;
  max-width: 1160px;
  margin-bottom: 24px;
  margin-top: 40px;
  text-align: left;

  div {
    width: 100%;
  }

  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const TopBlock = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 880px) {
    flex-direction: row;
  }
`;
const MainBlock = styled.div``;
const RightBlockMobile = styled(Column)`
  @media (min-width: 880px) {
    display: none;
  }
`;
const RightBlock = styled(Column)`
  display: none;
  @media (min-width: 880px) {
    display: flex;
  }
`;
const Body = styled.div`
  display: grid;
  @media (min-width: 880px) {
    grid-template-columns: 2fr 1fr;
    column-gap: 40px;
  }
`;
const PoolsScreenImpl: React.FC = () => {
  const vm = usePoolsVM();
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <Text weight={500} size="large">
              Farms Pool 1
            </Text>
            <SizedBox height={4} />
            <Text size="medium" type="secondary">
              Fixed swap fees: 0.1 %
            </Text>
            <SizedBox height={24} />
            <Body>
              <MainBlock>
                <RightBlockMobile>
                  <YourLiquidity />
                  <RewardToClaim />
                </RightBlockMobile>
                <PoolInformation />
                <FeesReturn />
                <PoolComposition />
              </MainBlock>
              <RightBlock>
                <YourLiquidity />
                <RewardToClaim />
              </RightBlock>
            </Body>
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const PoolsScreenInterface: React.FC<IProps> = ({ poolId }) => (
  <PoolsVMProvider poolId={poolId}>
    <PoolsScreenImpl />
  </PoolsVMProvider>
);
export default PoolsScreenInterface;
