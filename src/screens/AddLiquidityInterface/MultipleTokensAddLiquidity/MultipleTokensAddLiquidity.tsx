import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";
import DepositToPool from "@screens/AddLiquidityInterface/DepositToPool";
import MultipleTokensAddLiquidityAmount from "./MultipleTokensAddLiquidityAmount";
import { AdaptiveRow, Column, Row } from "@components/Flex";
import GridTable from "@components/GridTable";
import { useAddLiquidityInterfaceVM } from "@screens/AddLiquidityInterface/AddLiquidityInterfaceVM";
import Divider from "@src/components/Divider";
import Layout from "@components/Layout";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TokenIcon = styled.img`
  border: 1px solid #f1f2fe;
  border-radius: 12px;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  box-shadow: none;
  color: transparent;
`;
const AdaptiveRowWithPadding = styled(Row)`
  padding: 16px;
  @media (min-width: 880px) {
    padding: 24px;
  }
`;

const HideDesktop = styled.div`
  display: flex;
  @media (min-width: calc(560px + 32px)) {
    display: none;
  }
`;
const ShowDesktop = styled.div`
  display: none;
  @media (min-width: calc(560px + 32px)) {
    display: flex;
  }
`;
const FixedBlock = styled(HideDesktop)`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  padding: 0 16px 16px;
`;
const MultipleTokensAddLiquidity: React.FC<IProps> = () => {
  const vm = useAddLiquidityInterfaceVM();
  return (
    <Root>
      <DepositToPool />
      <SizedBox height={24} />
      <MultipleTokensAddLiquidityAmount />
      <SizedBox height={24} />
      <Text style={{ width: "100%" }} weight={500} type="secondary">
        Deposit composition
      </Text>
      <SizedBox height={8} />
      <Card paddingMobile="0" paddingDesktop="8px 0">
        <GridTable desktopTemplate={"1fr 1fr"} mobileTemplate={"1fr 1fr"}>
          {vm.pool?.tokens.map((token, i) => {
            // const balance = vm.pool.liquidity[token.assetId] ?? BN.ZERO;
            // const rate = vm.pool.currentPrice(
            //   token.assetId,
            //   accountStore.TOKENS.USDN.assetId
            // );
            // const value = balance.times(rate ?? 0);
            return (
              <div
                className="gridRow"
                key={i}
                style={
                  i === vm.pool?.tokens.length! - 1
                    ? { border: "none" }
                    : undefined
                }
              >
                <Row alignItems="center" mainAxisSize="fit-content">
                  <TokenIcon src={token.logo} alt="logo" />
                  <SizedBox width={8} />
                  <Column>
                    <Text fitContent size="medium">
                      {token.symbol}
                    </Text>
                    <Text fitContent type="secondary" size="small">
                      <span>Share: </span>
                      <span style={{ color: "#363870", paddingLeft: 1 }}>
                        {token.shareAmount * 100} %
                      </span>
                    </Text>
                  </Column>
                </Row>
                <AdaptiveRow>
                  <Column style={{ width: "100%", textAlign: "end" }}>
                    <Text nowrap>123,00</Text>
                    <Text type="secondary" size="small">
                      Available: 123123
                    </Text>
                  </Column>
                </AdaptiveRow>
              </div>
            );
          })}
        </GridTable>
        <Divider />
        <AdaptiveRowWithPadding justifyContent="space-between">
          <Text>Total value</Text>
          <Text weight={500} style={{ textAlign: "end" }}>
            $ 10 001,23
          </Text>
        </AdaptiveRowWithPadding>
      </Card>

      <SizedBox height={24} />

      <HideDesktop>
        <SizedBox height={56} />
      </HideDesktop>
      <ShowDesktop>
        <Button fixed>Deposit $ 0</Button>
      </ShowDesktop>
      <FixedBlock>
        <Button fixed>Deposit $ 0</Button>
      </FixedBlock>
    </Root>
  );
};
export default observer(MultipleTokensAddLiquidity);
