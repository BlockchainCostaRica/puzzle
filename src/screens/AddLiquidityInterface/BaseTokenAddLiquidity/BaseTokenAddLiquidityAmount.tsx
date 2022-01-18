import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import TokenInput from "@screens/MultiSwapInterface/TokenInput/TokenInput";
import BaseTokenConvertNotification from "@screens/AddLiquidityInterface/BaseTokenAddLiquidity/BaseTokenConvertNotification";
import { observer } from "mobx-react-lite";
import { useAddLiquidityInterfaceVM } from "@screens/AddLiquidityInterface/AddLiquidityInterfaceVM";
import { useStores } from "@stores";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const BaseTokenAddLiquidityAmount: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const vm = useAddLiquidityInterfaceVM();
  return (
    <Root>
      <Text weight={500} type="secondary">
        Amount
      </Text>
      <SizedBox height={8} />
      <Card>
        <TokenInput
          selectable={false}
          decimals={vm.baseToken.decimals}
          amount={vm.baseTokenAmount}
          setAmount={vm.setBaseTokenAmount}
          assetId={vm.baseToken.assetId}
          balances={accountStore.assetBalances ?? []}
        />
        <SizedBox height={24} />
        <BaseTokenConvertNotification />
      </Card>
    </Root>
  );
};
export default observer(BaseTokenAddLiquidityAmount);
