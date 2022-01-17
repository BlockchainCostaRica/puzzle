import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import TokenInput from "@screens/MultiSwapInterface/TokenInput/TokenInput";
import BN from "@src/utils/BN";
import EggConvertNotification from "@screens/AddLiquidityInterface/EggTokenAddLiquidity/EggConvertNotification";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Amount: React.FC<IProps> = () => {
  return (
    <Root>
      <Text weight={500} type="secondary">
        Amount
      </Text>
      <SizedBox height={8} />
      <Card>
        <TokenInput
          decimals={8}
          amount={new BN(100)}
          setAmount={() => console.log("setAmount")}
          assetId={"s"}
          setAssetId={() => console.log("setAssetId")}
          balances={[]}
          onMaxClick={() => console.log("onMaxClick")}
          usdnEquivalent={"100"}
        />
        <SizedBox height={24} />
        <EggConvertNotification />
      </Card>
    </Root>
  );
};
export default Amount;
