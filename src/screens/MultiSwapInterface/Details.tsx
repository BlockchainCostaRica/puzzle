import styled from "@emotion/styled";
import React from "react";
import Card from "@components/Card";
import { Column, Row } from "@components/Flex";
import Text from "@components/Text";
import Button from "@components/Button";
import { Link } from "react-router-dom";
import { POOL_ID } from "@src/constants";

interface IProps {
  volume: string;
  liquidity: string;
  poolId: POOL_ID;
}

const Root = styled(Card)`
  display: flex;
  flex-direction: column;
  @media (min-width: 560px) {
    align-items: center;
    flex-direction: row;
    padding: 22px 32px;
  }
  .button {
    width: 100%;
    margin-top: 12px;
    height: 40px;
    @media (min-width: 560px) {
      max-width: 120px;
    }
  }
`;

const Details: React.FC<IProps> = ({ volume, liquidity }) => {
  return (
    <Root>
      <Row alignItems="center">
        <Column crossAxisSize="max">
          <Text type="secondary" size="small">
            Total liquidity
          </Text>
          <Text>$ {liquidity}</Text>
        </Column>
        <Column crossAxisSize="max">
          <Text type="secondary" size="small">
            24H volume
          </Text>
          <Text>$ {volume}</Text>
        </Column>
      </Row>
      <Link to={"addLiquidity"}>
        <Button className="button" kind="secondary">
          Invest
        </Button>
      </Link>
    </Root>
  );
};
export default Details;
