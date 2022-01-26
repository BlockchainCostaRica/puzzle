import styled from "@emotion/styled";
import React from "react";
import Token0Amount from "@screens/TradeInterface/RoutingModal/Token0Amount";
import { ISchemaRoute } from "@screens/TradeInterface/TradeVM";
import AssetContainer from "./AssetContainer";

interface IProps extends ISchemaRoute {
  token0Logo: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 0;
`;

const Route: React.FC<IProps> = ({ percent, token0Logo, exchanges }) => {
  const v = exchanges[0];
  return (
    <Root>
      <Token0Amount percent={percent} imgSrc={token0Logo} />
      {/*{exchanges.map((item, index) => (*/}
      {/*    <AssetContainer {...item} key={index}/>*/}
      {/*))}*/}
      <AssetContainer {...v} />
    </Root>
  );
};
export default Route;
