import styled from "@emotion/styled";
import React, { useState } from "react";
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
`;

const Wallet: React.FC<IProps> = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { accountStore } = useStores();
  const { address } = accountStore;

  return (
    <Root>
      {address == null ? (
        <Button size="medium" onClick={() => setOpenModal(true)}>
          Connect wallet
        </Button>
      ) : (
        <LoggedInAccountInfo />
      )}
      {openModal && (
        <LoginModal
          onLogin={(loginType) => accountStore.login(loginType)}
          onClose={() => setOpenModal(!openModal)}
        />
      )}
    </Root>
  );
};
export default observer(Wallet);
