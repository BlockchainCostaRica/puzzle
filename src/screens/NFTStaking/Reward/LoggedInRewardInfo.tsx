import styled from "@emotion/styled";
import React from "react";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";
import SizedBox from "@components/SizedBox";
import { Column, Row } from "@src/components/Flex";
import income from "@src/assets/icons/income.svg";
import wallet from "@src/assets/icons/wallet.svg";
import Text from "@components/Text";
import { useNFTStakingVM } from "@screens/NFTStaking/NFTStakingVM";
import BN from "@src/utils/BN";
import { useStores } from "@stores";
import dayjs from "dayjs";

const Root = styled.div`
  display: grid;
  flex-direction: column;
  grid-template-columns: 1fr;
  row-gap: 16px;
  @media (min-width: 880px) {
    grid-template-columns: 41% 41% 18%;
  }
`;
const Icon = styled.img`
  border-radius: 8px;
  height: 40px;
  width: 40px;
`;
const AvailableToClaim = styled(Row)`
  border-top: 1px solid #f1f2fe;
  padding-top: 18px;
  @media (min-width: 880px) {
    border-left: 1px solid #f1f2fe;
    border-top: none;
    padding-left: 24px;
    padding-top: 0;
  }
`;
const LastClaimDate = styled(Text)`
  position: absolute;
  @media (min-width: 880px) {
    right: 24px;
  }
`;
const LoggedInRewardInfo: React.FC = () => {
  const { accountStore } = useStores();
  const { TOKENS } = accountStore;
  const vm = useNFTStakingVM();
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
      <Row justifyContent="space-between" style={{ position: "relative" }}>
        <LastClaimDate
          type="secondary"
          textAlign="right"
          size="medium"
          style={{ position: "absolute" }}
        >
          {!vm.lastClaimDate.eq(0) && "Last claim " + format}
        </LastClaimDate>
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
      </Row>
      <AvailableToClaim>
        <Icon src={wallet} alt="wallet" />
        <SizedBox width={8} />
        <Column>
          <Text type="secondary" size="medium">
            Available to claim
          </Text>
          <Text weight={500}>{availableToClaim}</Text>
        </Column>
      </AvailableToClaim>
      <Button fixed size="medium">
        Claim reward
      </Button>
    </Root>
  );
};
export default observer(LoggedInRewardInfo);
