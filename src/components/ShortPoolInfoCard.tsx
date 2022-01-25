import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import { observer } from "mobx-react-lite";
import Button from "@components/Button";
import { Row } from "reactstrap";
import { Column } from "@components/Flex";
import SquareTokenIcon from "@components/SquareTokenIcon";
import { Link } from "react-router-dom";

interface IProps {
  title: string;
  poolName?: string;
  poolLogo?: string;
  apy?: string;
  onChangePool?: () => void;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  img {
    margin-left: 10px;
  }

  .cardTitle {
    white-space: nowrap;
    width: fit-content;
    font-size: 14px;
    line-height: 20px;
    @media (min-width: calc(560px + 32px)) {
      font-size: 16px;
      line-height: 24px;
    }
  }

  .cardSubTitle {
    white-space: nowrap;
    width: fit-content;
    font-size: 12px;
    line-height: 16px;
    //@media (min-width: 880px) {
    @media (min-width: calc(560px + 32px)) {
      font-size: 14px;
      line-height: 20px;
    }

    b {
      color: #363870;
      font-weight: normal;
    }
  }
`;

const DepositToPool: React.FC<IProps> = ({
  title,
  poolName,
  poolLogo,
  apy,
  onChangePool,
}) => {
  return (
    <Root>
      <Text weight={500} type="secondary">
        {title}
      </Text>
      <SizedBox height={8} />
      <Card
        paddingMobile="16px"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Row style={{ alignItems: "center" }}>
          <SquareTokenIcon src={poolLogo} alt="logo" />
          <Column style={{ height: "100%" }}>
            <Text className="cardTitle" weight={500}>
              {poolName}
            </Text>
            <Text className="cardSubTitle" type="secondary">
              APY <b>{apy}</b>
            </Text>
          </Column>
        </Row>
        <Link to="/invest">
          <Button kind="secondary" size="medium" onClick={onChangePool}>
            Change pool
          </Button>
        </Link>
      </Card>
    </Root>
  );
};
export default observer(DepositToPool);