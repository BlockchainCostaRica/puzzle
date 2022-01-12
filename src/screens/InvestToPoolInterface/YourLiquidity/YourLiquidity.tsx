import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import WhiteCard from "@screens/InvestToPoolInterface/WhiteCard";
import { useStores } from "@stores";
import LoggedInLiquidityInfo from "@screens/InvestToPoolInterface/YourLiquidity/LoggedInLiquidityInfo";
import LoggedOutLiquidityInfo from "@screens/InvestToPoolInterface/YourLiquidity/LoggedOutLiquidityInfo";
import { observer } from "mobx-react-lite";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
`;

const YourLiquidity: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const { address } = accountStore;
  return (
    <Root>
      <Text weight={500} type="secondary">
        Your liquidity
      </Text>
      <SizedBox height={8} />
      <WhiteCard>
        {address == null ? (
          <LoggedOutLiquidityInfo />
        ) : (
          <LoggedInLiquidityInfo />
        )}
      </WhiteCard>
    </Root>
  );
};
export default observer(YourLiquidity);
