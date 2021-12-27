import styled from "@emotion/styled";
import React from "react";
import { useStores } from "@stores";
import { observer } from "mobx-react-lite";
import Button from "@components/Button";
import LoginModal from "./LoginModal";
import LoggedInAccountInfo from "@components/Wallet/LoggedInAccountInfo";

interface IProps {}

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Wallet: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const { address } = accountStore;

  return (
    <Root>
      {address == null ? (
        <Button
          size="medium"
          onClick={() => accountStore.setWallModalOpened(true)}
        >
          Connect wallet
        </Button>
      ) : (
        <LoggedInAccountInfo />
      )}
      {accountStore.wallModalOpened && (
        <LoginModal
          onLogin={(loginType) => accountStore.login(loginType)}
          onClose={() => accountStore.setWallModalOpened(false)}
        />
      )}
    </Root>
  );
};
export default observer(Wallet);
