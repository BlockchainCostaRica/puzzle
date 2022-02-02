import styled from "@emotion/styled";
import React from "react";
import { Observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import {
  InvestToPoolInterfaceVMProvider,
  useInvestToPoolInterfaceVM,
} from "@screens/InvestToPoolInterface/InvestToPoolInterfaceVM";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import PoolInformation from "@screens/InvestToPoolInterface/PoolInformation";
import YourLiquidity from "@screens/InvestToPoolInterface/YourLiquidity/YourLiquidity";
import { Column } from "@src/components/Flex";
import TradesVolume from "@screens/InvestToPoolInterface/TradesVolume";
import PoolComposition from "@screens/InvestToPoolInterface/PoolComposition";
import RewardToClaim from "@screens/InvestToPoolInterface/RewardToClaim";
import GoBack from "@components/GoBack";

interface IProps {
  poolId: string;
}

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
  margin-top: 56px;
  text-align: left;

  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;
const MainBlock = styled.div`
  width: 100%;
`;
const RightBlockMobile = styled(Column)`
  width: 100%;
  @media (min-width: 880px) {
    display: none;
  }
`;
const RightBlock = styled(Column)`
  width: 100%;
  display: none;
  @media (min-width: 880px) {
    display: flex;
  }
`;
const Body = styled.div`
  width: 100%;
  display: grid;
  @media (min-width: 880px) {
    grid-template-columns: 2fr 1fr;
    column-gap: 40px;
  }
`;
const InvestToPoolInterfaceImpl: React.FC = () => {
  const vm = useInvestToPoolInterfaceVM();
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <GoBack link="/invest" text="Back to Pools list" />
            <SizedBox height={24} />
            <Text weight={500} size="large">
              {vm.pool?.name}
            </Text>
            <SizedBox height={4} />
            <Text size="medium" type="secondary">
              Fixed swap fees: <span style={{ color: "#363870" }}>2.0 %</span>
            </Text>
            <Body>
              <MainBlock>
                <RightBlockMobile>
                  <YourLiquidity />
                  <RewardToClaim />
                </RightBlockMobile>
                <PoolInformation />
                <TradesVolume />
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

const InvestToPoolInterface: React.FC<IProps> = ({ poolId }) => (
  <InvestToPoolInterfaceVMProvider poolId={poolId}>
    <InvestToPoolInterfaceImpl />
  </InvestToPoolInterfaceVMProvider>
);
export default InvestToPoolInterface;
