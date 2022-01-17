import styled from "@emotion/styled";
import React, { useState } from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import RangeInput from "@screens/AddLiquidityInterface/MultipleTokensAddLiquidity/RangeInput";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Amount: React.FC<IProps> = () => {
  const [percent, setPercent] = useState<number>(0);
  //todo add debounce to calculate value after percent is picked
  return (
    <Root>
      <Text weight={500} type="secondary">
        Amount
      </Text>
      <SizedBox height={8} />
      <Card>
        <Text type="secondary" style={{ textAlign: "center" }}>
          Select the percentage of your asset
        </Text>
        <SizedBox height={16} />
        <Text type="primary" size="large" style={{ textAlign: "center" }}>
          {`${percent}% `}
          <span style={{ color: "#8082C5" }}>{`($${12312})`}</span>
        </Text>
        <SizedBox height={16} />
        <RangeInput value={percent} onChange={setPercent} />
      </Card>
    </Root>
  );
};
export default Amount;
