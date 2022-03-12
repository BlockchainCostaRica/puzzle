import styled from "@emotion/styled";
import React from "react";
import Card from "@components/Card";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PoolSettings: React.FC<IProps> = () => {
  return (
    <Root>
      <Text type="secondary" weight={500}>
        Pool Settings
      </Text>
      <SizedBox height={8} />
      <Card style={{ height: 314, width: "100%" }}>PoolSettingsCard</Card>
    </Root>
  );
};
export default PoolSettings;
