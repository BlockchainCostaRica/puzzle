import styled from "@emotion/styled";
import React from "react";
import Card from "@components/Card";
import { Column, Row } from "@components/Flex";
import Text from "@components/Text";
import Button from "@components/Button";
import { Link } from "react-router-dom";
import { POOL_ID, ROUTES } from "@src/constants";
import { useMultiSwapVM } from "@screens/MultiSwapInterface/MultiScreenVM";
import { observer } from "mobx-react-lite";

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

const Details: React.FC = () => {
  const vm = useMultiSwapVM();
  if (vm.pool == null) return null;
  const { globalLiquidity, globalVolume, id } = vm.pool;
  return (
    <Root>
      <Row alignItems="center">
        <Column crossAxisSize="max">
          <Text type="secondary" size="small">
            Total liquidity
          </Text>
          <Text>$ {globalLiquidity}</Text>
        </Column>
        {id !== POOL_ID.puzzle && (
          <Column crossAxisSize="max">
            <Text type="secondary" size="small">
              Total volume
            </Text>
            {globalVolume ? <Text>$ {globalVolume}</Text> : <div />}
          </Column>
        )}
      </Row>
      {Object.keys(ROUTES.addLiquidity).find((v) => v === vm.pool?.id) && (
        <Link to={"addLiquidity"}>
          <Button className="button" kind="secondary">
            Invest
          </Button>
        </Link>
      )}
    </Root>
  );
};
export default observer(Details);
