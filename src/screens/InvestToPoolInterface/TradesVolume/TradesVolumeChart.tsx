import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import Card from "@components/Card";
import SizedBox from "@components/SizedBox";
import { observer } from "mobx-react-lite";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
`;
const TradesVolumeChart: React.FC<IProps> = () => {
  return (
    <Root>
      <Text weight={500} type="secondary">
        Trades volume
      </Text>
      <SizedBox height={8} />
      <Card style={{ maxHeight: 288 }}></Card>
    </Root>
  );
};

export default observer(TradesVolumeChart);
