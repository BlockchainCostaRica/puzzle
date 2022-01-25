import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import { useStores } from "@stores";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoggedOutLiquidityInfo: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  return (
    <Root>
      <Text type="secondary" style={{ textAlign: "center" }}>
        Connect your wallet to see pool token balance
      </Text>
      <SizedBox height={8} />
      <Button
        fixed
        size="medium"
        onClick={() => accountStore.setWalletModalOpened(true)}
      >
        Connect wallet
      </Button>
    </Root>
  );
};
export default LoggedOutLiquidityInfo;
