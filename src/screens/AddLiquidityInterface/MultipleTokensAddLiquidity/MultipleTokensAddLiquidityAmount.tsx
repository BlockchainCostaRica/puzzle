import styled from "@emotion/styled";
import React, { useState } from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import Slider from "@components/Slider";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const MultipleTokensAddLiquidityAmount: React.FC<IProps> = () => {
  const [percent, setPercent] = useState<number>(50);
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
        <Slider
          min={0}
          max={100}
          step={1}
          marks={{ 0: 0, 25: 25, 50: 50, 75: 75, 100: 100 }}
          value={percent}
          onChange={setPercent}
        />
      </Card>
    </Root>
  );
};
export default MultipleTokensAddLiquidityAmount;
