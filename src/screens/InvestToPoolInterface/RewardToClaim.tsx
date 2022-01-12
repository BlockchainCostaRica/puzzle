import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import Button from "@components/Button";
import { Column } from "@src/components/Flex";
import Divider from "@src/components/Divider";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 24px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
`;

const RewardToClaim: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  if (accountStore.address == null) return null;
  return (
    <Root>
      <Text weight={500} type="secondary">
        Reward to claim
      </Text>
      <SizedBox height={8} />
      <Card paddingDesktop="24px 0" paddingMobile="16px 0">
        <Header>
          <Column crossAxisSize="max">
            <Text type="secondary">Total value</Text>
            <Text weight={500}>$ 100.00</Text>
          </Column>
          <Button size="medium">Claim</Button>
        </Header>
        <Divider style={{ margin: "24px 0" }} />
        <Column style={{ padding: "0 24px" }}>
          <Text weight={500}>Reward composition</Text>
        </Column>
      </Card>
    </Root>
  );
};
export default observer(RewardToClaim);
