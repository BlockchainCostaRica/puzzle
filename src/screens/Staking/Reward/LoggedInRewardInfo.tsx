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
  return (
    <Root>
      <Row justifyContent="space-between">
        <Row>
          <Icon src={income} alt="income" />
          <SizedBox width={8} />
          <Column>
            <Text type="secondary">Claimed reward</Text>
            <Text weight={500}>256.012 USDN</Text>
          </Column>
        </Row>
        <Text type="secondary" textAlign="right">
          Last claim 1 Jan 2022
        </Text>
      </Row>
      <SizedBox height={18} />
      <Divider />
      <SizedBox height={18} />
      <Row>
        <Icon src={wallet} alt="wallet" />
        <SizedBox width={8} />
        <Column>
          <Text type="secondary">Available to claim</Text>
          <Text weight={500}>12.64015 USDN</Text>
        </Column>
      </Row>
      <SizedBox height={18} />
      <Button fixed size="medium">
        Claim reward
      </Button>
    </Root>
  );
};
export default observer(LoggedInRewardInfo);
