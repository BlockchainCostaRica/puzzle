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

  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

// const TopBlock = styled.div`
//   display: flex;
//   flex-direction: column;
//   @media (min-width: 880px) {
//     flex-direction: row;
//   }
// `;
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
            <Text weight={500} size="large">
              {vm.pool?.name}
            </Text>
            <SizedBox height={4} />
            <Text size="medium" type="secondary">
              Fixed swap fees: 2.0 %
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
