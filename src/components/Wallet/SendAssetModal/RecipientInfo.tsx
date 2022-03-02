import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Input from "@components/Input";
import LightTokenInput from "@components/TokenInput/LightTokenInput";
import { observer } from "mobx-react-lite";
import { useSendAssetVM } from "@components/Wallet/SendAssetModal/SendAssetVM";
import { useStores } from "@stores";
import BN from "@src/utils/BN";

interface IProps {}

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
        error={vm.amount.gt(assetToSend?.balance ?? BN.ZERO)}
      />
      <SizedBox height={16} />
    </>
  );
};
export default observer(RecipientInfo);
