import React from "react";
import "./send-asset.css";
import { ReactComponent as CloseIcon } from "@src/assets/icons/close.svg";
import { IDialogPropTypes } from "rc-dialog/lib/IDialogPropTypes";
import RcDialog from "rc-dialog";
import { observer, Observer } from "mobx-react-lite";
import { useStores } from "@stores";
import styled from "@emotion/styled";
import SquareTokenIcon from "@components/SquareTokenIcon";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import BN from "@src/utils/BN";
import { Column, Row } from "@src/components/Flex";
import Button from "@components/Button";
import { SendAssetVMProvider } from "@components/Wallet/SendAssetModal/SendAssetVM";
import RecipientInfo from "@components/Wallet/SendAssetModal/RecipientInfo";

interface IProps extends IDialogPropTypes {}

const FixedBlock = styled.div`
  display: flex;
  position: fixed;
  width: 520px;
  justify-content: center;
  bottom: 72px;
  padding: 0 24px 24px;
  @media (min-width: calc(560px + 32px)) {
    width: 320px;
  }
`;

const SendAssetModal: React.FC<IProps> = ({ ...rest }) => {
  const { accountStore } = useStores();
  const { assetToSend } = accountStore;
  const balance = BN.formatUnits(
    assetToSend?.balance ?? 0,
    assetToSend?.decimals
  );
  return (
    <RcDialog
      wrapClassName="send-asset"
      closeIcon={<CloseIcon style={{ marginTop: 8 }} />}
      animation="zoom"
      // maskAnimation="fade"
      title={`Send ${assetToSend?.name}`}
      destroyOnClose
      {...rest}
    >
      <Observer>
        {() => {
          return (
            <SendAssetVMProvider>
              <Column
                justifyContent="center"
                alignItems="center"
                crossAxisSize="max"
                style={{ position: "relative" }}
              >
                <SizedBox height={24} />
                <SquareTokenIcon src={assetToSend?.logo} />
                <SizedBox height={8} />
                <Text fitContent weight={500}>{`${balance?.toFormat(2)} ${
                  assetToSend?.symbol
                }`}</Text>
                <Text
                  fitContent
                  type="secondary"
                >{`$ ${assetToSend?.usdnEquivalent?.toFormat(2)}`}</Text>
                <RecipientInfo />
                <Row justifyContent="space-between">
                  <Text type="secondary">Transaction fee</Text>
                  <Text textAlign="right">0.005 WAVES</Text>
                </Row>
                <FixedBlock>
                  <Button fixed>Send {assetToSend?.symbol}</Button>
                </FixedBlock>
              </Column>
            </SendAssetVMProvider>
          );
        }}
      </Observer>
    </RcDialog>
  );
};
export default observer(SendAssetModal);
