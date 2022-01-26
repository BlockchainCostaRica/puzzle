import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";
import { useTradeVM } from "@screens/TradeInterface/TradeVM";
import Route from "@screens/TradeInterface/RoutingModal/Route";

interface IProps {}

const Root = styled.div<{
  template?: string;
}>`
  display: flex;
  flex-direction: column;
  //grid-template-columns: ${({ template }) => template ?? "6fr 2fr 1fr"};
  width: 100%;
  overflow-y: scroll;
`;

const RoutingSchema: React.FC<IProps> = () => {
  const vm = useTradeVM();
  return (
    <Root>
      {vm.schemaValues?.map((i, index) => (
        <Route {...i} key={index} />
      ))}
    </Root>
  );
};
export default RoutingSchema;
