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
import SquareTokenIcon from "@components/SquareTokenIcon";
import { Link } from "react-router-dom";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

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
          <SquareTokenIcon src={pool?.logo} alt="logo" />
          <Column style={{ height: "100%" }}>
            <Text className="toCardTitle" weight={500}>
              {pool?.name}
            </Text>
            <Text className="toCardSubTitle" type="secondary">
              APY <b>150.20 %</b>
            </Text>
          </Column>
        </Row>
        {/* todo переделать так, что пулы хранились не во вью модели, а в сторе потому*/}
        {/* что используются одни и те же данные и в invest и в Withdraw */}
        <Link to="/invest">
          <Button
            kind="secondary"
            size="medium"
            // onClick={() => accountStore.setChangePoolModalOpened(true)}
          >
            Change pool
          </Button>
        </Link>
      </Card>
      {/*<ChangePoolModal*/}
      {/*  visible={accountStore.changePoolModalOpened}*/}
      {/*  onClose={() => accountStore.setChangePoolModalOpened(false)}*/}
      {/*/>*/}
    </Root>
  );
};
export default observer(DepositToPool);
