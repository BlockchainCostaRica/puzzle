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
