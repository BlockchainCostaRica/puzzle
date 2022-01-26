import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";
import TokenInput from "@screens/TradeInterface/TokenInput";
import SwapDetailRow from "@components/SwapDetailRow";
import Divider from "@src/components/Divider";
import Card from "@components/Card";
import { Observer } from "mobx-react-lite";
import SwitchTokensButton from "@screens/TradeInterface/SwitchTokensButton";
import SwapButton from "@screens/TradeInterface/SwapButton";
import { ReactComponent as ArrowIcon } from "@src/assets/icons/arrowRightBorderless.svg";
import Layout from "@components/Layout";
import { TradeVMProvider, useTradeVM } from "@screens/TradeInterface/TradeVM";
import { useNavigate } from "react-router-dom";
import { Row } from "@components/Flex";
import Text from "@components/Text";
import Tooltip from "@components/Tooltip";
import TooltipFeeInfo from "@screens/MultiSwapInterface/TooltipFeeInfo";
import { ReactComponent as InfoIcon } from "@src/assets/icons/info.svg";
import { ReactComponent as ShowMoreIcon } from "@src/assets/icons/showMore.svg";
import RoutingModal from "@screens/TradeInterface/RoutingModal";
import { errorMessage } from "@components/Notifications";

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

const TradeInterfaceImpl: React.FC = () => {
  const vm = useTradeVM();
  const navigate = useNavigate();

  const handleSetAssetId0 = (assetId: string) => {
    if (assetId === vm.assetId1) {
      errorMessage({
        message: "You can't choose same assets",
        title: "Warning",
      });
      return;
    }
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("asset0", assetId);
    navigate({
      pathname: window.location.pathname,
      search: `?${urlSearchParams.toString()}`,
    });
    vm.setAssetId0(assetId);
  };

  const handleSetAssetId1 = (assetId: string) => {
    if (assetId === vm.assetId0) {
      errorMessage({
        message: "You can't choose same assets",
        title: "Warning",
      });
      return;
    }
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("asset1", assetId);
    navigate({
      pathname: window.location.pathname,
      search: `?${urlSearchParams.toString()}`,
    });
    vm.setAssetId1(assetId);
  };

  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <Card paddingDesktop="32px" maxWidth={560}>
              <TokenInput
                decimals={vm.token0.decimals}
                amount={vm.amount0}
                setAmount={vm.setAmount0}
                assetId={vm.assetId0}
                setAssetId={handleSetAssetId0}
                balances={vm.balances}
                onMaxClick={vm.amount0MaxClickFunc}
                selectable
              />
              <SwitchTokensButton />
              <TokenInput
                decimals={vm.token1.decimals}
                amount={vm.amount1}
                assetId={vm.assetId1}
                setAssetId={handleSetAssetId1}
                balances={vm.balances}
                selectable
              />
              <SizedBox height={24} />
              <SwapButton />
              <SizedBox height={16} />
              <SwapDetailRow title="Route">
                <Row
                  alignItems="center"
                  mainAxisSize="fit-content"
                  justifyContent="flex-end"
                  style={{ cursor: "pointer" }}
                >
                  {vm.simpleRoute != null
                    ? vm.simpleRoute.map((symbol, i) => (
                        <React.Fragment key={i}>
                          <Text style={{ lineHeight: 0 }}>{symbol}&nbsp;</Text>
                          {i !== vm.simpleRoute!.length - 1 && (
                            <ArrowIcon style={{ minWidth: 16 }} />
                          )}
                        </React.Fragment>
                      ))
                    : "—"}
                  &nbsp;
                  <ShowMoreIcon
                    style={{ minWidth: 16, cursor: "pointer" }}
                    onClick={() => vm.setRoutingModalState(true)}
                  />
                </Row>
              </SwapDetailRow>
              <Divider />
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
            </Card>
            <RoutingModal
              visible={vm.routingModalOpened}
              onClose={() => vm.setRoutingModalState(false)}
            />
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const TradeInterface: React.FC = () => (
  <TradeVMProvider>
    <TradeInterfaceImpl />
  </TradeVMProvider>
);
export default TradeInterface;
