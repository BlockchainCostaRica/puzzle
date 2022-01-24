import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import Card from "@components/Card";
import GridTable from "@components/GridTable";
import BN from "@src/utils/BN";
import Divider from "@components/Divider";
import Button from "@components/Button";
import { Row } from "@components/Flex";
import WithdrawTokenRow from "./WithdrawTokenRow";
import { useWithdrawLiquidityVM } from "@screens/WithdrawLiquidity/WithdrawLiquidityVM";
import { observer } from "mobx-react-lite";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AdaptiveRowWithPadding = styled(Row)`
  padding: 16px;
  @media (min-width: 880px) {
    padding: 24px;
  }
`;

const HideDesktop = styled.div`
  display: flex;
  @media (min-width: calc(560px + 32px)) {
    display: none;
  }
`;
const FixedMobileBlock = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  padding: 0 16px 16px;
  @media (min-width: calc(560px + 32px)) {
    position: relative;
    padding: 0;
  }
`;

const WithdrawLiquidityTable: React.FC<IProps> = () => {
  const vm = useWithdrawLiquidityVM();
  return (
    <Root>
      <Text style={{ width: "100%" }} weight={500} type="secondary">
        You receive
      </Text>
      <SizedBox height={8} />
      <Card paddingMobile="0" paddingDesktop="8px 0">
        <GridTable desktopTemplate="1fr 1fr" mobileTemplate="1fr 1fr">
          {vm.withdrawCompositionTokens
            .sort((a, b) => (a.inUsdn!.gt(b.inUsdn!) ? -1 : 1))
            .map(({ symbol, inUsdn, withdraw, shareAmount, logo }) => (
              <WithdrawTokenRow
                symbol={symbol}
                key={symbol}
                withdrawUsdnEquivalent={inUsdn}
                withdrawAmount={withdraw}
                percent={shareAmount * 100}
                logo={logo}
              />
            ))}
        </GridTable>
        <Divider />
        <AdaptiveRowWithPadding justifyContent="space-between">
          <Text>Total value</Text>
          <Text weight={500} style={{ textAlign: "end" }}>
            {vm.totalAmountToWithdrawDisplay}
          </Text>
        </AdaptiveRowWithPadding>
      </Card>
      <SizedBox height={24} />

      <HideDesktop>
        <SizedBox height={56} />
      </HideDesktop>
      <FixedMobileBlock>
        <Button
          fixed
          disabled={
            vm.percentToWithdraw.eq(0) || vm.totalAmountToWithdraw.eq(0)
          }
          onClick={vm.withdraw}
        >
          Withdraw {vm.totalAmountToWithdrawDisplay}
        </Button>
      </FixedMobileBlock>
    </Root>
  );
};
export default observer(WithdrawLiquidityTable);
