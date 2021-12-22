import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";

interface IProps {
  poolName: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  min-width: 100%;
  min-height: 100%;
`;

const Card = styled.div`
  background: #ffffff;
  border: 1px solid #f1f2fe;
  border-radius: 16px;
  padding: 16px;
  box-sizing: border-box;
  min-width: 100%;
`;

const MultiSwapInterface: React.FC<IProps> = () => {
  return (
    <Root>
      <Card>Hello</Card>
      <SizedBox height={16} />
      <Card>Hello</Card>
    </Root>
  );
};
export default MultiSwapInterface;
