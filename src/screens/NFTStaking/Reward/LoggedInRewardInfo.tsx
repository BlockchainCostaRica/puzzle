import styled from "@emotion/styled";
import React from "react";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";
import SizedBox from "@components/SizedBox";
import { Column, Row } from "@src/components/Flex";
import income from "@src/assets/icons/income.svg";
import wallet from "@src/assets/icons/wallet.svg";
import Text from "@components/Text";

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
const LoggedInRewardInfo: React.FC = () => {
  // const { accountStore } = useStores();
  const availableToClaim = "—";
  const claimedReward = "—";
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
      </Row>
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
      <Button fixed size="medium">
        Claim reward
      </Button>
    </Root>
  );
};
export default observer(LoggedInRewardInfo);
