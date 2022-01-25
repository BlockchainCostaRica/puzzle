import React from "react";
import { Column } from "@components/Flex";
import Text from "@components/Text";
import { observer } from "mobx-react-lite";
import BN from "@src/utils/BN";
import { useTradeVM } from "@screens/TradeInterface/TradeVM";

const TooltipFeeInfo: React.FC = () => {
  const vm = useTradeVM();
  const token1 = vm.token1!;
  const amount = BN.formatUnits(vm.amount1, token1.decimals);
  return (
    <Column>
      <Text>
        Protocol fee (0.8%):&nbsp;
        <span style={{ color: "#8082C5" }}>
          {amount.times(0.008).toFormat(2)} {token1.symbol}
        </span>
      </Text>
      <Text>
        LP fee (1.2%):&nbsp;
        <span style={{ color: "#8082C5" }}>
          {amount.times(0.012).toFormat(2)} {token1.symbol}
        </span>
      </Text>
      <Text>
        Minimum to receive:{" "}
        <span style={{ color: "#8082C5" }}>
          ~ {BN.formatUnits(vm.minimumToReceive, token1.decimals).toFormat(2)}{" "}
          {token1.symbol}
        </span>
      </Text>
    </Column>
  );
};
export default observer(TooltipFeeInfo);
