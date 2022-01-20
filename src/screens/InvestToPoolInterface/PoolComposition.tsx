import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import Card from "@components/Card";
import SizedBox from "@components/SizedBox";
import GridTable from "@components/GridTable";
import { AdaptiveRow, Column, Row } from "@components/Flex";
import { useInvestToPoolInterfaceVM } from "@screens/InvestToPoolInterface/InvestToPoolInterfaceVM";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";
import BN from "@src/utils/BN";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: 1px solid #f1f2fe;
`;

const AdaptiveTableTitle = styled(AdaptiveRow)`
  //contilina
  justify-content: end;
  @media (min-width: 880px) {
    justify-content: start;
  }
`;
const PoolComposition: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const vm = useInvestToPoolInterfaceVM();
  return (
    <Root>
      <Text weight={500} type="secondary">
        Pool composition
      </Text>
      <SizedBox height={8} />
      <Card style={{ padding: 0 }}>
        <GridTable desktopTemplate={"1fr 1fr 1fr"} mobileTemplate={"1fr 1fr"}>
          <div className="gridTitle">
            <div>Asset</div>
            <AdaptiveTableTitle>
              <div className="desktop">Balance</div>
              <div className="mobile">Balance and value</div>
            </AdaptiveTableTitle>
            <AdaptiveRow>
              <div className="desktop">Value</div>
            </AdaptiveRow>
          </div>
          {vm.pool?.tokens.map((token, i) => {
            const balance = BN.formatUnits(
              vm.pool.liquidity[token.assetId] ?? BN.ZERO,
              token.decimals
            );
            const rate = vm.pool.currentPrice(
              token.assetId,
              accountStore.TOKENS.USDN.assetId
            );
            const value = balance.times(rate ?? 0);
            return (
              <div className="gridRow" key={i}>
                <Row alignItems="center" mainAxisSize="fit-content">
                  <Icon src={token.logo} alt="logo" />
                  <SizedBox width={8} />
                  <Text fitContent>{token.symbol}</Text>
                </Row>
                <AdaptiveRow>
                  <Text className="desktop" fitContent>
                    {balance.toFormat(2)}
                  </Text>
                  <Column
                    className="mobile"
                    crossAxisSize="max"
                    style={{ textAlign: "end" }}
                  >
                    <Text size="medium">{balance.toFormat(2)}</Text>
                    <Text size="small" type="secondary">
                      $ {value.toFormat(2)}
                    </Text>
                  </Column>
                </AdaptiveRow>
                <AdaptiveRow>
                  <Text className="desktop" fitContent nowrap>
                    $ {value.toFormat(2)}
                  </Text>
                </AdaptiveRow>
              </div>
            );
          })}
        </GridTable>
      </Card>
    </Root>
  );
};
export default observer(PoolComposition);
