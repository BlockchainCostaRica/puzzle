import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";
import MultipleTokensAddLiquidityAmount from "./MultipleTokensAddLiquidityAmount";
import { Row } from "@components/Flex";
import GridTable from "@components/GridTable";
import { useAddLiquidityInterfaceVM } from "@screens/AddLiquidityInterface/AddLiquidityInterfaceVM";
import Divider from "@components/Divider";
import BN from "@src/utils/BN";
import { useStores } from "@stores";
import Notification from "@screens/AddLiquidityInterface/Notification";
import LiquidityTokenRow from "@screens/AddLiquidityInterface/MultipleTokensAddLiquidity/LiquidityTokenRow";

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

const MultipleTokensAddLiquidity: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const vm = useAddLiquidityInterfaceVM();
  const tokens = vm.pool?.tokens ?? [];
  const minBalanceAsset = vm.minBalanceAsset;
  const minBalance = minBalanceAsset?.balance ?? new BN(1);
  const handleConnectToWallet = () => accountStore.setWalletModalOpened(true);
  return (
    <Root>
      <MultipleTokensAddLiquidityAmount />
      <SizedBox height={24} />
      <Text style={{ width: "100%" }} weight={500} type="secondary">
        Deposit composition
      </Text>
      <SizedBox height={8} />
      <Card paddingMobile="0" paddingDesktop="8px 0">
        <GridTable desktopTemplate={"1fr 1fr"} mobileTemplate={"1fr 1fr"}>
          {vm.providedPercentOfPool.eq(100) && !minBalance.eq(0) && (
            <Notification
              type="info"
              text={`You’ve reached the limit with ${minBalanceAsset?.symbol}.`}
              style={{ margin: 24 }}
            />
          )}
          {minBalance.eq(0) && (
            <Notification
              type="warning"
              text={`You must have all assets to bring liquidity to the pool. Top up empty balances or provide liquidity with an ${vm.baseToken.symbol} token.`}
              style={{ margin: 24 }}
            />
          )}
          {tokens.map((token, i) => {
            const balance = accountStore.findBalanceByAssetId(token.assetId);
            const available =
              balance &&
              balance.balance &&
              BN.formatUnits(balance?.balance, token.decimals);

            const depositAmount =
              vm.tokensToDepositAmounts &&
              BN.formatUnits(
                vm.tokensToDepositAmounts[token.assetId],
                token.decimals
              );

            return (
              <LiquidityTokenRow
                symbol={token.symbol}
                key={i}
                availableAmount={available}
                depositAmount={depositAmount}
                percent={token.shareAmount * 100}
                logo={token.logo}
              />
            );
          })}
        </GridTable>
        <Divider />
        <AdaptiveRowWithPadding justifyContent="space-between">
          <Text>Total value</Text>
          <Text weight={500} style={{ textAlign: "end" }}>
            {vm.totalAmountToDeposit}
          </Text>
        </AdaptiveRowWithPadding>
      </Card>
      <SizedBox height={24} />

      <HideDesktop>
        <SizedBox height={56} />
      </HideDesktop>
      <FixedMobileBlock>
        {accountStore.address != null ? (
          <Button
            fixed
            disabled={!vm.possibleToMultipleDeposit}
            onClick={vm.depositMultiply}
          >
            Deposit {vm.totalAmountToDeposit}
          </Button>
        ) : (
          <Button fixed onClick={handleConnectToWallet}>
            Connect Wallet
          </Button>
        )}
      </FixedMobileBlock>
    </Root>
  );
};
export default observer(MultipleTokensAddLiquidity);
