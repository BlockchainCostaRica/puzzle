import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import Card from "@components/Card";
import SizedBox from "@components/SizedBox";
import GridTable from "@components/GridTable";
import { AdaptiveRow, Column, Row } from "@components/Flex";
import { useInvestToPoolInterfaceVM } from "@screens/InvestToPoolInterface/InvestToPoolInterfaceVM";
import { observer } from "mobx-react-lite";

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
  justify-content: end;
  @media (min-width: 880px) {
    justify-content: start;
  }
`;
const PoolComposition: React.FC<IProps> = () => {
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
          {vm.poolCompositionValues
            .sort((a, b) => (a.value!.gt(b.value!) ? -1 : 1))
            .map((token, i) => (
              <div className="gridRow" key={i} style={{ cursor: "default" }}>
                <Row alignItems="center" mainAxisSize="fit-content">
                  <Icon src={token.logo} alt="logo" />
                  <SizedBox width={8} />
                  <Text fitContent>{token.symbol}</Text>
                </Row>
                <AdaptiveRow>
                  <Text className="desktop" fitContent>
                    {token.parsedBalance.toFormat(2)}
                  </Text>
                  <Column
                    className="mobile"
                    crossAxisSize="max"
                    style={{ textAlign: "end" }}
                  >
                    <Text size="medium">{token.parsedBalance.toFormat(2)}</Text>
                    <Text size="small" type="secondary">
                      $ {token.value.toFormat(2)}
                    </Text>
                  </Column>
                </AdaptiveRow>
                <AdaptiveRow>
                  <Text className="desktop" fitContent nowrap>
                    $ {token.value.toFormat(2)}
                  </Text>
                </AdaptiveRow>
              </div>
            ))}
        </GridTable>
      </Card>
    </Root>
  );
};
export default observer(PoolComposition);
