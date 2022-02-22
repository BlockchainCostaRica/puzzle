import styled from "@emotion/styled";
import React from "react";
import RcDialog from "rc-dialog";
import "./wallet.css";
import { IDialogPropTypes } from "rc-dialog/lib/IDialogPropTypes";
import { ReactComponent as CloseIcon } from "@src/assets/icons/close.svg";
import SizedBox from "@components/SizedBox";
import WalletModalHeader from "./WalletModalHeader";
import { observer } from "mobx-react-lite";

interface IProps extends IDialogPropTypes {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WalletModal: React.FC<IProps> = ({ ...rest }) => {
  return (
    <RcDialog
      closeIcon={<CloseIcon style={{ marginTop: 8 }} />}
      animation="zoom"
      maskAnimation="fade"
      {...rest}
      visible={true}
    >
      <Root>
        <SizedBox height={48} />
        <WalletModalHeader />
      </Root>
    </RcDialog>
  );
};
export default observer(WalletModal);
