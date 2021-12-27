import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";
import TokenInput from "@screens/MultiSwapInterface/TokenInput";
import { ReactComponent as InfoIcon } from "@src/assets/icons/info.svg";
import { Row } from "@components/Flex";
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
import Text from "@components/Text";
import SwapButton from "@screens/MultiSwapInterface/SwapButton";
import TooltipFeeInfo from "@screens/MultiSwapInterface/TooltipFeeInfo";

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
  margin-bottom: 24px;
`;

const MultiSwapInterfaceImpl: React.FC = () => {
  const vm = useMultiSwapVM();
  return (
    <Observer>
      {() => (
        <Root>
          <Card>
            <TokenInput
              amount={vm.amount0}
              setAmount={vm.setAmount0}
              assetId={vm.assetId0}
              setAssetId={vm.setAssetId0}
              balances={vm.balances ?? []}
              onMaxClick={vm.amount0MaxClickFunc}
            />
            <SwitchTokensButton />
            <TokenInput
              amount={new BigNumber(vm.amount1)}
              assetId={vm.assetId1}
              setAssetId={vm.setAssetId1}
              balances={vm.balances ?? []}
            />
            <SizedBox height={24} />
            <SwapButton />
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
                <Text>
                  {vm.minimumToReceive ?? "0"} {vm.token1?.symbol}&nbsp;
                </Text>
                {vm.token0 && !vm.amount0.isNaN() && (
                  <Tooltip
                    content={
                      <TooltipFeeInfo
                        symbol={vm.token0.symbol}
                        amount={vm.amount0}
                      />
                    }
                    config={{ placement: "top", trigger: "click" }}
                  >
                    <InfoIcon />
                  </Tooltip>
                )}
              </Row>
            </SwapDetailRow>
            {vm.cashback && (
              <>
                <Divider />
                <SwapDetailRow style={{ marginBottom: 0 }} title="Cashback">
                  <CashbackLabel>{vm.cashback}</CashbackLabel>
                </SwapDetailRow>
              </>
            )}
          </Card>
          <SizedBox height={16} />
          <Details
            poolId={vm.poolId}
            volume={vm.pool!.globalVolume}
            liquidity={vm.pool!.globalLiquidity}
          />
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
