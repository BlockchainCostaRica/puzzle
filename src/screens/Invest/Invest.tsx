import styled from "@emotion/styled";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import { AdaptiveRow } from "@components/Flex";
import { useStores } from "@stores";
import PoolNotFound from "@screens/Invest/PoolNotFound";
import GridTable from "@components/GridTable";
import InvestPoolRow from "@screens/Invest/InvestPoolRow";
import group from "@src/assets/icons/group.svg";
import Input from "@components/Input";

interface IProps {}

const Root = styled.div<{ apySort?: boolean; liquiditySort?: boolean }>`
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

  .apy-group {
    width: 20px;
    height: 20px;
    transform: ${({ apySort }) => (apySort ? "scale(1)" : "scale(1, -1)")};
  }

  .liquidity-group {
    width: 20px;
    height: 20px;
    transform: ${({ liquiditySort }) =>
      liquiditySort ? "scale(1)" : "scale(1, -1)"};
  }
`;

const Invest: React.FC<IProps> = () => {
  const { poolsStore, accountStore } = useStores();
  const [searchValue, setSearchValue] = useState<string>("");
  const [activeSort, setActiveSort] = useState<0 | 1>(1);
  const [sortApy, setSortApy] = useState<boolean>(true);
  const [sortLiquidity, setSortLiquidity] = useState<boolean>(true);
  const data = poolsStore.poolDataWithApy;
  const filteredPools = data
    .sort((a, b) => {
      if (activeSort === 0) {
        if (a.globalLiquidity != null && b.globalLiquidity != null) {
          if (a.globalLiquidity.lt(b.globalLiquidity)) {
            return sortLiquidity ? 1 : -1;
          } else {
            return sortLiquidity ? -1 : 1;
          }
        }
      } else if (activeSort === 1) {
        if (a.apy != null && b.apy != null) {
          if (a.apy.lt(b.apy)) {
            return sortApy ? 1 : -1;
          } else {
            return sortApy ? -1 : 1;
          }
        }
      }
      return 1;
    })
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
      <Root apySort={sortApy} liquiditySort={sortLiquidity}>
        <Text weight={500} size="large">
          Invest in Puzzle Mega Pools
        </Text>
        <SizedBox height={4} />
        <Text size="medium" type="secondary">
          Select a pool to invest
        </Text>
        <SizedBox height={24} />
        <Input
          icon="search"
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
                  <div className="desktop">
                    <Text size="medium">Liquidity</Text>
                    <img
                      src={group}
                      alt="group"
                      className="liquidity-group"
                      onClick={() => {
                        setActiveSort(0);
                        setSortLiquidity(!sortLiquidity);
                      }}
                    />
                  </div>
                  <div className="mobile" style={{ cursor: "pointer" }}>
                    <Text size="medium">APY</Text>
                    <img
                      src={group}
                      alt="group"
                      className="apy-group"
                      onClick={() => {
                        setActiveSort(1);
                        setSortApy(!sortApy);
                      }}
                    />
                  </div>
                </AdaptiveRow>
                <AdaptiveRow>
                  <div className="desktop" style={{ cursor: "pointer" }}>
                    <Text size="medium">APY</Text>
                    <img
                      src={group}
                      alt="group"
                      className="apy-group"
                      onClick={() => {
                        setActiveSort(1);
                        setSortApy(!sortApy);
                      }}
                    />
                  </div>
                </AdaptiveRow>
              </div>
              {filteredPools.map((pool, i) => (
                <InvestPoolRow
                  key={i}
                  pool={pool as any}
                  stats={
                    poolsStore.poolsStats
                      ? poolsStore.poolsStats[pool.id]
                      : undefined
                  }
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
