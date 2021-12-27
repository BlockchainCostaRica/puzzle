import React from "react";
import { Column } from "@components/Flex";
import Text from "@components/Text";
import BigNumber from "bignumber.js";

interface IProps {
  amount: BigNumber;
  symbol: string;
}

const TooltipFeeInfo: React.FC<IProps> = ({ amount, symbol }) => {
  return (
    <Column>
      <Text>
        Protocol fee (0.8%):&nbsp;
        <span style={{ color: "#8082C5" }}>
          {amount.times(0.008).toFormat(2)} {symbol}
        </span>
      </Text>
      <Text>
        LP fee (1.2%):&nbsp;
        <span style={{ color: "#8082C5" }}>
          {amount.times(0.012).toFormat(2)} {symbol}
        </span>
      </Text>
      <Text>
        Price impact: <span style={{ color: "#8082C5" }}>0.02%</span>
      </Text>
    </Column>
  );
};
export default TooltipFeeInfo;
