import styled from "@emotion/styled";
import React, { useEffect } from "react";
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
import { TPoolId } from "@src/constants";
import { Observer } from "mobx-react-lite";
import SwitchTokensButton from "@screens/MultiSwapInterface/SwitchTokensButton";
import Text from "@components/Text";
import SwapButton from "@screens/MultiSwapInterface/SwapButton";
import TooltipFeeInfo from "@screens/MultiSwapInterface/TooltipFeeInfo";
import BN from "@src/utils/BN";
import Layout from "@components/Layout";
import { useNavigate } from "react-router-dom";

interface IProps {
  poolId: TPoolId;
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
  margin-top: 40px;
  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const MultiSwapInterfaceImpl: React.FC = () => {
  const vm = useMultiSwapVM();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const asset0 = params.get("asset0")?.toString();
      const asset1 = params.get("asset1")?.toString();
      if (asset0 != null) {
        vm.setAssetId0(asset0);
      }
      if (asset1 != null) {
        vm.setAssetId1(asset1);
      }
    } catch (e) {}
  });

  const handleSetAssetId0 = (assetId: string) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("asset0", assetId);
    navigate({
      pathname: window.location.pathname,
      search: `?${urlSearchParams.toString()}`,
    });
    vm.setAssetId0(assetId);
  };

  const handleSetAssetId1 = (assetId: string) => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("asset1", assetId);
    navigate({
      pathname: window.location.pathname,
      search: `?${urlSearchParams.toString()}`,
    });
    vm.setAssetId0(assetId);
  };

  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <Card paddingDesktop="32px" maxWidth={560}>
              <TokenInput
                selectable={true}
                decimals={vm.token0!.decimals}
                amount={vm.amount0}
                setAmount={vm.setAmount0}
                assetId={vm.assetId0}
                setAssetId={handleSetAssetId0}
                balances={vm.balances ?? []}
                onMaxClick={vm.amount0MaxClickFunc}
                usdnEquivalent={vm.amount0UsdnEquivalent}
              />
              <SwitchTokensButton />
              <TokenInput
                selectable={true}
                decimals={vm.token1!.decimals}
                amount={new BN(vm.amount1)}
                assetId={vm.assetId1}
                setAssetId={handleSetAssetId1}
                balances={vm.balances ?? []}
                usdnEquivalent={vm.amount1UsdnEquivalent}
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
              <SwapDetailRow title="Price impact">
                <Row
                  alignItems="center"
                  mainAxisSize="fit-content"
                  justifyContent="flex-end"
                >
                  {vm.priceImpact && (
                    <Text>~{vm.priceImpact.toFormat(4)}%&nbsp;</Text>
                  )}
                  {vm.token0 && !vm.amount0.isNaN() && (
                    <Tooltip
                      content={<TooltipFeeInfo />}
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
            <Details />
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const MultiSwapInterface: React.FC<IProps> = ({ poolId }) => (
  <MultiSwapVMProvider poolId={poolId}>
    <MultiSwapInterfaceImpl />
  </MultiSwapVMProvider>
);
export default MultiSwapInterface;
