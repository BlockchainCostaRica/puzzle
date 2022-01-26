import styled from "@emotion/styled";
import React from "react";
import Token0Amount from "@screens/TradeInterface/RoutingModal/Token0Amount";

interface IProps {
  token0Img: string;
  percent: string;
}

const Root = styled.div`
  display: grid;
  flex-direction: row;
  padding: 12px 0;
`;

const Route: React.FC<IProps> = ({ percent, token0Img }) => {
  return (
    <Root>
      <Token0Amount percent={percent} imgSrc={token0Img} />
    </Root>
  );
};
export default Route;
