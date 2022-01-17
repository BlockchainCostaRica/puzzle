import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import { observer } from "mobx-react-lite";
import Button from "@components/Button";
import { useAddLiquidityInterfaceVM } from "@screens/AddLiquidityInterface/AddLiquidityInterfaceVM";
import { Row } from "reactstrap";
import { Column } from "@components/Flex";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Icon = styled.img`
  //todo разобраться какого хрена там пропадает 12px
  margin-left: 12px;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  border: 1px solid #f1f2fe;
`;

const DepositToPool: React.FC<IProps> = () => {
  const vm = useAddLiquidityInterfaceVM();
  const pool = vm.pool;
  return (
    <Root>
      <Text weight={500} type="secondary">
        To
      </Text>
      <SizedBox height={8} />
      <Card
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Row>
          <Icon src={pool?.logo} alt="logo" />
          <Column>
            <Text fitContent style={{ whiteSpace: "nowrap" }} weight={500}>
              {pool?.name}
            </Text>
            <Text fitContent type="secondary">
              APY {} %
            </Text>
          </Column>
        </Row>
        <Button kind="secondary" size="medium">
          Change pool
        </Button>
      </Card>
    </Root>
  );
};
export default observer(DepositToPool);
