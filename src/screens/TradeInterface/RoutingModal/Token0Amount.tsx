import styled from "@emotion/styled";
import React from "react";
import SquareTokenIcon from "@components/SquareTokenIcon";
import SizedBox from "@components/SizedBox";

interface IProps {
  assetId?: string;
  percent?: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
const Percent = styled.div`
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #363870;
  background: #f1f2fe;
  border-radius: 6px;
  width: 40px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;
const Token0Amount: React.FC<IProps> = ({ percent }) => {
  return (
    <Root>
      <SquareTokenIcon size="small" />
      <SizedBox height={8} />
      <Percent>{percent} %</Percent>
    </Root>
  );
};
export default Token0Amount;
