import styled from "@emotion/styled";
import React from "react";

interface IProps {
  price: string;
}

const Root = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #8082c5;
  order: 2;
  flex-grow: 0;
`;

const DollarEquivalent: React.FC<IProps> = ({ price }) => {
  return <Root>&#36; {price}</Root>;
};
export default DollarEquivalent;
