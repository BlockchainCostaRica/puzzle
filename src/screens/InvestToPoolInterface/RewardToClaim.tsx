import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import Button from "@components/Button";
import { AdaptiveColumn, AdaptiveRow, Column, Row } from "@src/components/Flex";
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
  //todo add check if acc has investemnts in pool
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
            <Text weight={500}>$ {vm.totalRewardToClaim.toFixed(2)}</Text>
          </Column>
          <Button size="medium">Claim</Button>
        </Header>
        <Divider style={{ margin: "24px 0" }} />
        <Title weight={500} className="mobile">
          Reward composition
        </Title>
        <GridTable desktopTemplate="1fr 1fr" mobileTemplate="1fr 1fr">
          {vm.pool?.tokens.map((token, i) => {
            const reward = vm.rewardsToClaim
              ? vm.rewardsToClaim[token.assetId].reward.toFormat(5)
              : "0";
            const usd = vm.rewardsToClaim
              ? vm.rewardsToClaim[token.assetId].usdEquivalent.toFormat(2)
              : "0";
            return (
              <div
                className="gridRow"
                key={i}
                style={{ padding: "8px 0", alignItems: "center" }}
              >
                <Row alignItems="center">
                  {screenWidth && screenWidth >= 880 ? (
                    <SquareTokenIcon
                      src={token.logo}
                      alt="logo"
                      style={{ width: 40, height: 40 }}
                    />
                  ) : (
                    <RoundTokenIcon src={token.logo} alt="logo" />
                  )}
                  <SizedBox width={8} />
                  <AdaptiveColumn>
                    <Text className="desktop" size="medium" nowrap>
                      {token.name}
                    </Text>
                    <Text type="secondary" size="small">
                      {token.symbol}
                    </Text>
                  </AdaptiveColumn>
                </Row>
                <AdaptiveRow>
                  <Row
                    style={{ width: "100%", textAlign: "end" }}
                    className="mobile"
                  >
                    <Text size="medium">
                      <span>{reward}</span>
                      <span style={{ color: "#8082C5" }}>(${usd})</span>
                    </Text>
                  </Row>
                  <Column
                    crossAxisSize="max"
                    className="desktop"
                    style={{ textAlign: "end" }}
                  >
                    <Text size="medium">{reward}</Text>
                    <Text size="small" type="secondary">
                      ${usd}
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
