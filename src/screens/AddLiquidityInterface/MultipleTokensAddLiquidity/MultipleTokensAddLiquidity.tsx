import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";
import DepositToPool from "@screens/AddLiquidityInterface/DepositToPool";
import MultipleTokensAddLiquidityAmount from "./MultipleTokensAddLiquidityAmount";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MultipleTokensAddLiquidity: React.FC<IProps> = () => {
  return (
    <Root>
      <DepositToPool />
      <SizedBox height={24} />
      <MultipleTokensAddLiquidityAmount />
      <SizedBox height={24} />
      <Text style={{ width: "100%" }} weight={500} type="secondary">
        Deposit composition
      </Text>
      <SizedBox height={8} />
      <Card></Card>
      <SizedBox height={24} />
      <Button fixed>Deposit $ 0</Button>
    </Root>
  );
};
export default observer(MultipleTokensAddLiquidity);
