import styled from "@emotion/styled";
import React from "react";
import Card from "@components/Card";
import { Column, Row } from "@components/Flex";
import Text from "@components/Text";
import Button from "@components/Button";
import { Link } from "react-router-dom";
import { ROUTES } from "@src/App";
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
    margin-top: 12px;
    @media (min-width: 560px) {
      height: 40px;
      max-width: 120px;
    }
  }
`;

const Details: React.FC<IProps> = ({ volume, liquidity, poolId }) => {
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
      {/*{poolId in ROUTES.addLiquidity && (*/}
      {/*  <Link to={(ROUTES.addLiquidity as any)[poolId] ?? "/"}>*/}
      {/*    <Button className="button" kind="secondary">*/}
      {/*      Invest*/}
      {/*    </Button>*/}
      {/*  </Link>*/}
      {/*)}*/}
    </Root>
  );
};
export default Details;
