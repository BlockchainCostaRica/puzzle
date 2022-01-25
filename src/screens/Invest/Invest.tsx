import styled from "@emotion/styled";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import SearchInput from "@components/SearchInput";
import Card from "@components/Card";
import { AdaptiveRow } from "@components/Flex";
import { useStores } from "@stores";
import PoolNotFound from "@screens/Invest/PoolNotFound";
import GridTable from "@components/GridTable";
import InvestPoolRow from "@screens/Invest/InvestPoolRow";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  min-height: 100%;
  max-width: calc(1160px + 32px);
  margin-bottom: 24px;
  margin-top: 40px;
  text-align: left;
  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const Invest: React.FC<IProps> = () => {
  const { poolsStore, accountStore } = useStores();
  const [searchValue, setSearchValue] = useState<string>("");
  const stats = poolsStore.poolsStats;
  const filteredPools = poolsStore.pools
    .slice()
    .filter(({ id }) =>
      Object.keys(accountStore.ROUTES.invest).some((key) => key === id)
    )
    .filter(({ name, tokens }) =>
      searchValue
        ? [name, ...tokens.map(({ symbol }) => symbol)]
            .map((v) => v.toLowerCase())
            .some((v) => v.includes(searchValue.toLowerCase()))
        : true
    );

  return (
    <Layout>
      <Root>
        <Text weight={500} size="large">
          Invest in Puzzle Mega Pools
        </Text>
        <SizedBox height={4} />
        <Text size="medium" type="secondary">
          Select a pool to invest
        </Text>
        <SizedBox height={24} />
        <SearchInput
          placeholder="Asset or pool name"
          style={{ background: "#fff", width: "100%" }}
          className="mobile"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          suffix={
            <Text
              fitContent
              type="secondary"
              style={{ cursor: "pointer" }}
              onClick={() => setSearchValue("")}
            >
              CANCEL
            </Text>
          }
          suffixCondition={searchValue.length > 1}
        />
        <SizedBox height={16} />
        <Card style={{ padding: 0, minHeight: 280, justifyContent: "center" }}>
          {filteredPools.length > 0 ? (
            <GridTable mobileTemplate="3fr 1fr">
              <div className="gridTitle">
                <div>Pool name</div>
                <AdaptiveRow>
                  <div className="desktop">Liquidity</div>
                  <div className="mobile">APY</div>
                </AdaptiveRow>
                <AdaptiveRow>
                  <div className="desktop">APY</div>
                </AdaptiveRow>
              </div>
              {filteredPools.map((pool, i) => (
                <InvestPoolRow
                  key={i}
                  pool={pool}
                  stats={stats ? stats[pool.id] : undefined}
                />
              ))}
            </GridTable>
          ) : (
            <PoolNotFound
              onClear={() => setSearchValue("")}
              searchValue={searchValue}
            />
          )}
        </Card>
      </Root>
    </Layout>
  );
};

export default observer(Invest);
