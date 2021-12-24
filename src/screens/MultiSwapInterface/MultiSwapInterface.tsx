import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";
import TokenInput from "@screens/MultiSwapInterface/TokenInput";
import { ReactComponent as InfoIcon } from "@src/assets/icons/info.svg";
import { Row } from "@components/Flex";
import Button from "@components/Button";
import SwapDetailRow from "@components/SwapDetailRow";
import Divider from "@src/components/Divider";
import CashbackLabel from "@components/CashbackLabel";
import Card from "@components/Card";
import Details from "@screens/MultiSwapInterface/Details";
import Tooltip from "@components/Tooltip";
import {
  MultiSwapVMProvider,
  useMultiSwapVM,
} from "@screens/MultiSwapInterface/MultiScreenVM";
import { POOL_ID } from "@src/constants";
import { Observer } from "mobx-react-lite";
import BigNumber from "bignumber.js";
import SwitchTokensButton from "@screens/MultiSwapInterface/SwitchTokensButton";

interface IProps {
  poolId: POOL_ID;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  min-width: 100%;
  min-height: 100%;
`;

const MultiSwapInterfaceImpl: React.FC = () => {
  const vm = useMultiSwapVM();
  return (
    <Observer>
      {() => (
        <Root>
          <Card>
            <TokenInput
              tokens={vm.pool?.tokens ?? []}
              amount={vm.amount0}
              setAmount={vm.setAmount0}
              assetId={vm.assetId0}
              setAssetId={vm.setAssetId0}
            />
            <SwitchTokensButton onClick={vm.switchTokens} />
            <TokenInput
              tokens={vm.pool?.tokens ?? []}
              amount={new BigNumber(vm.amount1)}
              assetId={vm.assetId1}
              setAssetId={vm.setAssetId1}
            />
            <SizedBox height={24} />
            <Button disabled>Insufficient WAVES balance</Button>
            <SizedBox height={16} />
            {/*<SwapDetailRow title="Route">*/}
            {/*  <Row*/}
            {/*    alignItems="center"*/}
            {/*    mainAxisSize="fit-content"*/}
            {/*    justifyContent="flex-end"*/}
            {/*  >*/}
            {/*    <Text>WAVES</Text>&nbsp;*/}
            {/*    <ArrowIcon />*/}
            {/*    &nbsp;*/}
            {/*    <Text>USDN</Text>&nbsp;*/}
            {/*    <ArrowIcon />*/}
            {/*    &nbsp;*/}
            {/*    <Text>PUZZLE</Text>&nbsp;*/}
            {/*    <ShowMoreIcon />*/}
            {/*  </Row>*/}
            {/*</SwapDetailRow>*/}
            {/*<Divider />*/}
            <SwapDetailRow title="Minimum to receive">
              <Row
                alignItems="center"
                mainAxisSize="fit-content"
                justifyContent="flex-end"
              >
                {vm.minimumToReceive} {vm.token1?.symbol}&nbsp;
                <Tooltip content="Объемный текст в котором подробно рассказано о происходящем на экране">
                  <InfoIcon />
                </Tooltip>
              </Row>
            </SwapDetailRow>
            <Divider />
            <SwapDetailRow style={{ marginBottom: 0 }} title="Cashback">
              <CashbackLabel>0.26</CashbackLabel>
            </SwapDetailRow>
          </Card>
          <SizedBox height={16} />
          <Details />
        </Root>
      )}
    </Observer>
  );
};

const MultiSwapInterface: React.FC<IProps> = ({ poolId }) => (
  <MultiSwapVMProvider poolId={poolId}>
    <MultiSwapInterfaceImpl />
  </MultiSwapVMProvider>
);
export default MultiSwapInterface;
