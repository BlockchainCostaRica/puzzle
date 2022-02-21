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
import { Loading } from "@components/Loading";
import BN from "@src/utils/BN";
import { rewards } from "@waves/waves-transactions/dist/nodeInteraction";

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

  if (accountStore.address == null || !vm.isThereRewardToClaim) return null;
  return (
    <Root>
      <Text weight={500} type="secondary">
        Rewards to claim
      </Text>
      <SizedBox height={8} />
      <Card paddingDesktop="24px 0 0" paddingMobile="16px 0 0">
        <Header>
          <Column crossAxisSize="max" style={{ flex: 1 }}>
            <Text type="secondary">Total value</Text>
            <Text weight={500}>$ {vm.totalRewardToClaim.toFixed(2)}</Text>
          </Column>
          {!vm.loading ? (
            <Button
              style={{ flex: 1 }}
              size="medium"
              disabled={vm.isThereSomethingToClaim}
              onClick={vm.claimRewards}
              fixed
            >
              Claim
            </Button>
          ) : (
            <Button style={{ flex: 1 }} size="medium" disabled fixed>
              Claiming
              <Loading />
            </Button>
          )}
        </Header>
        <Divider style={{ margin: "24px 0" }} />
        <Title weight={500} className="mobile">
          Reward composition
        </Title>
        <GridTable desktopTemplate="1fr 1fr" mobileTemplate="1fr 1fr">
          {vm.rewardToClaimTable.map((token, i) => {
            const reward = token.reward.gte(0.01)
              ? token.reward.toFormat(2)
              : token.reward.toFormat(6);
            const usd = token.usd.gte(0.01)
              ? token.usd.toFormat(2)
              : token.usd.toFormat(6);
            return (
              <div
                className="gridRow"
                key={i}
                style={{ padding: "8px 0", alignItems: "center" }}
              >
                <Row alignItems="center">
                  {screenWidth && screenWidth >= 880 ? (
                    <SquareTokenIcon size="small" src={token.logo} alt="logo" />
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
        <SizedBox height={24} />
      </Card>
    </Root>
  );
};
export default observer(RewardToClaim);
