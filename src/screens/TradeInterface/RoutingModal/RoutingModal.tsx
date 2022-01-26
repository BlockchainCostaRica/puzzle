import React from "react";
import Dialog from "@components/Dialog";
import Text from "@components/Text";
import styled from "@emotion/styled";
import { useTradeVM } from "@screens/TradeInterface/TradeVM";
import RoutingSchema from "@screens/TradeInterface/RoutingModal/RoutingSchema";
import SizedBox from "@components/SizedBox";

interface IProps {
  onClose: () => void;
  visible: boolean;
}

const Title = styled(Text)`
  b {
    font-weight: normal;
    color: #363870;
  }
`;
const RoutingModal: React.FC<IProps> = ({ ...rest }) => {
  const vm = useTradeVM();
  const { token0, token1, aggregatedProfit } = vm;
  //todo
  const profit = aggregatedProfit.div(token1.decimals).toFormat(2);
  return (
    <Dialog style={{ maxWidth: 760, maxHeight: 496 }} title="Routing" {...rest}>
      <Title type="secondary">
        Algorithms find the most profitable routes of exchange for you. With the
        selected path you will get by{" "}
        <b>
          {profit} {token1.symbol} more
        </b>{" "}
        than if you exchange directly from {token0.symbol} to {token1.symbol}.
      </Title>
      <SizedBox height={24} />
      <RoutingSchema />
    </Dialog>
  );
};
export default RoutingModal;
