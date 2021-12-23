import styled from "@emotion/styled";
import React from "react";
import Card from "@components/Card";
import { Column, Row } from "@components/Flex";
import Text from "@components/Text";
import Button from "@components/Button";

interface IProps {}

const Root = styled(Card)`
  display: flex;
  flex-direction: column;
  @media (min-width: 560px) {
    align-items: center;
    flex-direction: row;
    padding: 22px 32px;
  }
  .button {
    margin-top: 12px;
    @media (min-width: 560px) {
      height: 40px;
      max-width: 120px;
    }
  }
`;

const Details: React.FC<IProps> = () => {
  return (
    <Root>
      <Row alignItems="center">
        <Column crossAxisSize="max">
          <Text type="secondary" size="small">
            Total liquidity
          </Text>
          <Text>$ 3,141,083.65</Text>
        </Column>
        <Column crossAxisSize="max">
          <Text type="secondary" size="small">
            24H volume
          </Text>
          <Text>$ 589,177.02</Text>
        </Column>
      </Row>
      <Button className="button" kind="secondary">
        Invest
      </Button>
    </Root>
  );
};
export default Details;
