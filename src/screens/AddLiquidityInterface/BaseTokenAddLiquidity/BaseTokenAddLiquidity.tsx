import styled from "@emotion/styled";
import React from "react";
import DepositToPool from "@screens/AddLiquidityInterface/DepositToPool";
import SizedBox from "@components/SizedBox";
import BaseTokenAddLiquidityAmount from "./BaseTokenAddLiquidityAmount";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BaseTokenAddLiquidity: React.FC<IProps> = () => {
  return (
    <Root>
      <DepositToPool />
      <SizedBox height={24} />
      <BaseTokenAddLiquidityAmount />
    </Root>
  );
};
export default BaseTokenAddLiquidity;
