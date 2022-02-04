import styled from "@emotion/styled";
import React from "react";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";
import SizedBox from "@components/SizedBox";
import { Column, Row } from "@src/components/Flex";
import Divider from "@src/components/Divider";
import income from "@src/assets/icons/income.svg";
import wallet from "@src/assets/icons/wallet.svg";
import Text from "@components/Text";
import { useStakingVM } from "@screens/Staking/StakingVM";
import BN from "@src/utils/BN";
import { useStores } from "@stores";
import dayjs from "dayjs";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
const Icon = styled.img`
  border-radius: 8px;
  height: 40px;
  width: 40px;
`;
const LoggedInRewardInfo: React.FC = () => {
  const { accountStore } = useStores();
  const { TOKENS } = accountStore;
  const vm = useStakingVM();
  const availableToClaim =
    vm.availableToClaim != null
      ? BN.formatUnits(vm.availableToClaim, 18).toFormat(2).concat(" USDN")
      : "—";
  const claimedReward =
    vm.claimedReward != null
      ? BN.formatUnits(vm.claimedReward, TOKENS.USDN.decimals)
          .toFormat(2)
          .concat(" USDN")
      : "—";
  const date = dayjs(vm.lastClaimDate?.toNumber() ?? 0);
  const format = date.format("D MMM YYYY");
  return (
    <Root>
      <Row justifyContent="space-between">
        <Row>
          <Icon src={income} alt="income" />
          <SizedBox width={8} />
          <Column>
            <Text type="secondary" size="medium">
              Claimed reward
            </Text>
            <Text weight={500}>{claimedReward}</Text>
          </Column>
        </Row>
        <Text type="secondary" textAlign="right">
          {!vm.lastClaimDate.eq(0) && "Last claim " + format}
        </Text>
      </Row>
      <SizedBox height={18} />
      <Divider />
      <SizedBox height={18} />
      <Row>
        <Icon src={wallet} alt="wallet" />
        <SizedBox width={8} />
        <Column>
          <Text type="secondary" size="medium">
            Available to claim
          </Text>
          <Text weight={500}>{availableToClaim}</Text>
        </Column>
      </Row>
      <SizedBox height={18} />
      <Button
        fixed
        size="medium"
        onClick={vm.claimReward}
        disabled={!vm.canClaim}
      >
        Claim reward
      </Button>
    </Root>
  );
};
export default observer(LoggedInRewardInfo);
