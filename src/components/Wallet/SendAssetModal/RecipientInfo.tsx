import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Input from "@components/Input";
import LightTokenInput from "@components/TokenInput/LightTokenInput";
import { observer } from "mobx-react-lite";
import { useSendAssetVM } from "@components/Wallet/SendAssetModal/SendAssetVM";
import { useStores } from "@stores";
import { Row } from "@components/Flex";
import Button from "@components/Button";
import styled from "@emotion/styled";

interface IProps {}

const FixedBlock = styled.div`
  display: flex;
  position: fixed;
  width: calc(100% - 48px);
  justify-content: center;
  bottom: 80px;
  padding: 0 24px 24px;
  margin: 0 24px;
  @media (min-width: calc(560px)) {
    width: 320px;
    bottom: 72px;
  }
`;

const RecipientInfo: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const { assetToSend } = accountStore;
  const vm = useSendAssetVM();
  return (
    <>
      <SizedBox height={16} />
      <Text size="medium" type="secondary">
        Recipient’s address
      </Text>
      <SizedBox height={4} />
      <Input
        placeholder="Waves address (3P)…"
        value={vm.recipientAddress}
        onChange={(e) => vm.setRecipientAddress(e.target.value)}
        error={vm.recipientError}
        errorText={vm.recipientErrorText}
      />
      <SizedBox height={16} />
      <LightTokenInput
        assetId={assetToSend!.assetId}
        decimals={assetToSend!.decimals}
        amount={vm.amount}
        setAmount={vm.setAmount}
        onMaxClick={vm.onMaxClick}
        usdnEquivalent={assetToSend?.usdnEquivalent?.toFormat(2)}
        error={vm.amountError}
      />
      <SizedBox height={16} />
      <Row justifyContent="space-between">
        <Text type="secondary">Transaction fee</Text>
        <Text textAlign="right">0.005 WAVES</Text>
      </Row>
      <FixedBlock>
        <Button fixed disabled={!vm.canTransfer} onClick={vm.sendAssets}>
          {vm.buttonText}
        </Button>
      </FixedBlock>
    </>
  );
};
export default observer(RecipientInfo);
