import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import Button from "@components/Button";
import { AdaptiveRow, Column, Row } from "@src/components/Flex";
import Divider from "@src/components/Divider";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";
import GridTable from "@components/GridTable";
import { useInvestToPoolInterfaceVM } from "@screens/InvestToPoolInterface/InvestToPoolInterfaceVM";
import SquareTokenIcon from "@components/SquareTokenIcon";
import RoundTokenIcon from "@components/RoundTokenIcon";
import useWindowSize from "@src/hooks/useWindowSize";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 24px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
`;
const Title = styled(Text)`
  padding: 0 16px;
  @media (min-width: 880px) {
    display: none;
  }
`;

const RewardToClaim: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const vm = useInvestToPoolInterfaceVM();
  const { width: screenWidth } = useWindowSize();

  if (accountStore.address == null) return null;
  return (
    <Root>
      <Text weight={500} type="secondary">
        Rewards to claim
      </Text>
      <SizedBox height={8} />
      <Card paddingDesktop="24px 0 0" paddingMobile="16px 0 0">
        <Header>
          <Column crossAxisSize="max">
            <Text type="secondary">Total value</Text>
            <Text weight={500}>$ 100.00</Text>
          </Column>
          <Button size="medium">Claim</Button>
        </Header>
        <Divider style={{ margin: "24px 0" }} />
        <Title weight={500} className="mobile">
          Reward composition
        </Title>
        <GridTable desktopTemplate="1fr 1fr" mobileTemplate="1fr 1fr">
          {vm.pool?.tokens.map((token, i) => {
            return (
              <div
                className="gridRow"
                key={i}
                style={{ padding: "8px 0", alignItems: "center" }}
              >
                <Row>
                  {screenWidth && screenWidth >= 880 ? (
                    <SquareTokenIcon src={token.logo} alt="logo" />
                  ) : (
                    <RoundTokenIcon src={token.logo} alt="logo" />
                  )}
                  <SizedBox width={8} />
                  <Text>{token.symbol}</Text>
                </Row>
                <AdaptiveRow>
                  <Row
                    style={{ width: "100%", textAlign: "end" }}
                    className="mobile"
                  >
                    <Text size="medium">
                      <span>0.1</span>
                      <span style={{ color: "#8082C5" }}>($10)</span>
                    </Text>
                  </Row>
                  <Column
                    crossAxisSize="max"
                    className="desktop"
                    style={{ textAlign: "end" }}
                  >
                    <Text size="medium">0.1</Text>
                    <Text size="small" type="secondary">
                      $10
                    </Text>
                  </Column>
                </AdaptiveRow>
              </div>
            );
          })}
        </GridTable>
      </Card>
    </Root>
  );
};
export default observer(RewardToClaim);
