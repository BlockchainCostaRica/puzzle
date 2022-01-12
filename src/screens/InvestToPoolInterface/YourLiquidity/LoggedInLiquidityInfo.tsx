import styled from "@emotion/styled";
import React from "react";
import { observer } from "mobx-react-lite";
import { Column } from "@components/Flex";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";

interface IProps {}

const Root = styled.div`
  display: grid;
  column-gap: 8px;
  grid-template-columns: 1fr 1fr;
`;

const LoggedInLiquidityInfo: React.FC<IProps> = () => {
  return (
    <Root>
      <Column>
        <Text type="secondary">Value</Text>
        <SizedBox height={4} />
        <Text
          weight={500}
          size="large"
          style={{ lineHeight: "32px", whiteSpace: "nowrap" }}
        >
          $ 1,234
        </Text>
        <SizedBox height={16} />
        <Button fixed size="medium" kind="secondary">
          Withdraw
        </Button>
      </Column>
      <Column>
        <Text type="secondary">Share of pool</Text>
        <SizedBox height={4} />
        <Text weight={500} size="large" style={{ lineHeight: "32px" }}>
          1.23%
        </Text>
        <SizedBox height={16} />
        <Button fixed size="medium">
          Deposit
        </Button>
      </Column>
    </Root>
  );
};
export default observer(LoggedInLiquidityInfo);
