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

  .toCardTitle {
    white-space: nowrap;
    width: fit-content;
    font-size: 14px;
    line-height: 20px;
    @media (min-width: 880px) {
      font-size: 16px;
      line-height: 24px;
    }
  }

  .toCardSubTitle {
    white-space: nowrap;
    width: fit-content;
    font-size: 12px;
    line-height: 16px;
    @media (min-width: 880px) {
      font-size: 14px;
      line-height: 20px;
    }

    b {
      color: #363870;
      font-weight: normal;
    }
  }
`;

const Icon = styled.img`
  //todo разобраться какого хрена там пропадает 12px
  //margin-left: 12px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #f1f2fe;
  padding: 0;
  margin-left: 12px;
  @media (min-width: 880px) {
    width: 56px;
    height: 56px;
  }
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
        paddingMobile="16px"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Row style={{ alignItems: "stretch" }}>
          <Icon src={pool?.logo} alt="logo" />
          <Column style={{ height: "100%" }}>
            <Text className="toCardTitle" weight={500}>
              {pool?.name}
            </Text>
            <Text className="toCardSubTitle" type="secondary">
              APY <b>150.20 %</b>
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
