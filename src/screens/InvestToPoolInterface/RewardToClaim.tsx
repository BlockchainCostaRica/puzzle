import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import Button from "@components/Button";
import { Column } from "@src/components/Flex";
import Divider from "@src/components/Divider";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 24px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const RewardToClaim: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  if (accountStore.address == null) return null;
  //calculateTokenAvailableReward(tokenName: string) {
  //         const tokenNum = this.poolData.tokenNames.indexOf(tokenName)
  //         const tokenId = this.poolData.tokenIds[tokenNum]
  //         const decimals = this.poolData.tokenDecimals[tokenNum]
  //
  //         const balanceToDistr1 = this.state.poolBalances.get(tokenId) - this.state.poolState.get("global_" + tokenId + "_balance");
  //         const tokenBalanceLastCheck = Number(this.state.poolState.get("global_lastCheck_" + tokenId + "_earnings"));
  //         const newEarnings = Math.max(balanceToDistr1, tokenBalanceLastCheck) - tokenBalanceLastCheck;
  //
  //         console.log(tokenName, newEarnings)
  //
  //         const totalStaked = this.state.poolState.get("global_indexStaked");
  //         const currentInterest = totalStaked == 0 ? 0 : this.state.poolState.get("global_lastCheck_" + tokenId + "_interest") +
  //             (newEarnings * decimals / totalStaked)
  //
  //         const lastCheckUserInterestVal = this.state.poolState.get(this.state.userAddress + "_lastCheck_" + tokenId + "_interest");
  //         const lastCheckUserInterest = lastCheckUserInterestVal ? lastCheckUserInterestVal : 0
  //
  //         console.log(currentInterest, lastCheckUserInterest, currentInterest - lastCheckUserInterest)
  //         console.log(this.state.poolState.get(this.state.userAddress + "_indexStaked"))
  //
  //         const tokenBalance = Math.floor(
  //                (currentInterest - lastCheckUserInterest) * this.state.poolState.get(this.state.userAddress + "_indexStaked") / 10**8)
  //                 / decimals
  //
  //
  //         const usdnId = this.poolData.tokenNames.indexOf("USDN")
  //         const tokenValue = tokenBalance * this.calculateCurrentPrice(usdnId, this.poolData.tokenNames.indexOf(tokenName), 1)
  //
  //
  //         if (!tokenBalance) {
  //             return {balance: 0, value: 0}
  //         } else {
  //             return {balance: tokenBalance, value: Math.floor(tokenValue * 100) / 100}
  //         }
  //     }
  return (
    <Root>
      <Text weight={500} type="secondary">
        Rewards to claim
      </Text>
      <SizedBox height={8} />
      <Card paddingDesktop="24px 0" paddingMobile="16px 0">
        <Header>
          <Column crossAxisSize="max">
            <Text type="secondary">Total value</Text>
            <Text weight={500}>$ 100.00</Text>
          </Column>
          {/*calculateTokenAvailableReward*/}
          <Button size="medium">Claim</Button>
        </Header>
        <Divider style={{ margin: "24px 0" }} />
        <Column style={{ padding: "0 24px" }}>
          <Text weight={500}>Reward composition</Text>
        </Column>
      </Card>
    </Root>
  );
};
export default observer(RewardToClaim);
