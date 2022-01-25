import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";

interface IProps {}

const Root = styled.div<{
  template?: string;
}>`
  display: grid;
  grid-template-columns: ${({ template }) => template ?? "6fr 2fr 1fr"};
  width: 100%;
  overflow-y: scroll;
`;

const RoutingSchema: React.FC<IProps> = () => {
  // const vm = useTradeVM();
  return (
    <Root>
      <SizedBox width={1700} height={100} />
    </Root>
  );
};
export default RoutingSchema;
