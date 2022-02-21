import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import { AdaptiveRow, Column, Row } from "@components/Flex";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import Tag from "@components/Tag";
import { useStores } from "@stores";
import { observer } from "mobx-react-lite";
import Pool from "@src/entities/Pool";
import { IStatsPoolItem } from "@stores/PoolsStore";

interface IProps {
  stats?: IStatsPoolItem;
  pool: Pool;
}

const Icon = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  border: 1px solid #f1f2fe;
`;

const SharesContainer = styled(Row)`
  padding-top: 8px;
  flex-wrap: wrap;
  margin: -2px;

  & > * {
    margin: 2px;
  }

  min-width: 125px;
  @media (min-width: 430px) {
    min-width: 210px;
  }
  @media (min-width: 580px) {
    min-width: 325px;
  }
`;
const Root = styled(Link)`
  margin: 0 !important;

  :hover {
    background: #f8f8ff;
  }
`;
const StyledRow = styled(Row)`
  margin: 0 16px;
  @media (min-width: 880px) {
    margin: 0 24px;
  }
`;
const InvestPoolRow: React.FC<IProps> = ({ pool, stats }) => {
  const { accountStore } = useStores();
  const apy = stats?.apy != null ? stats.apy.toFormat(2) : "—";
  return (
    <Root
      to={`/${(accountStore.ROUTES.invest as any)[pool.id]}`}
      className="gridRow"
    >
      <StyledRow>
        <Icon src={pool.logo} alt="logo" />
        <SizedBox width={8} />
        <Column crossAxisSize="max">
          <Row alignItems="center">
            <Text fitContent style={{ whiteSpace: "nowrap" }} weight={500}>
              {pool.name}
            </Text>
            <AdaptiveRow>
              {pool.baseToken && (
                <Tag
                  style={{ marginLeft: 8 }}
                  type="primary"
                  className="desktop"
                >
                  Provide {pool.baseToken.symbol} only
                </Tag>
              )}
            </AdaptiveRow>
          </Row>
          <SharesContainer>
            {pool.tokens.map(({ symbol, shareAmount, assetId }) => {
              const assetBalance = accountStore.findBalanceByAssetId(assetId);
              const isActive =
                assetBalance &&
                assetBalance.balance &&
                assetBalance.balance.gt(0);
              return (
                <Tag
                  key={assetId}
                  background={isActive ? "#C6C9F4" : undefined}
                >
                  {symbol} {shareAmount * 100} %
                </Tag>
              );
            })}
          </SharesContainer>
        </Column>
      </StyledRow>
      <AdaptiveRow>
        <Text style={{ whiteSpace: "nowrap" }} className="desktop">
          $ {pool.globalLiquidity.toFormat(2)}
        </Text>
        <Text className="mobile" style={{ whiteSpace: "nowrap" }}>
          {apy} %
        </Text>
      </AdaptiveRow>
      <AdaptiveRow>
        <Text className="desktop" style={{ whiteSpace: "nowrap" }}>
          {apy} %
        </Text>
      </AdaptiveRow>
    </Root>
  );
};
export default observer(InvestPoolRow);
