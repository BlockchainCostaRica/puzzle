import styled from "@emotion/styled";
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import SearchInput from "@components/SearchInput";
import Card from "@components/Card";
import Tag from "@components/Tag";
import { AdaptiveRow, Column, Row } from "@components/Flex";
import { useStores } from "@stores";
import PoolNotFound from "@screens/Invest/PoolNotFound";
import { Link } from "react-router-dom";

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
  max-width: 1160px;
  margin-bottom: 24px;
  margin-top: 40px;
  text-align: left;
  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const Icon = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  border: 1px solid #f1f2fe;
`;

const Grid = styled.div`
  & .gridTitle {
    display: grid;
    grid-template-columns: 6fr 2fr 1fr;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #8082c5;
    padding: 14px 16px;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f2fe;
    margin-bottom: 8px;
    @media (min-width: 880px) {
      padding: 14px 24px;
    }
  }

  & .gridRow {
    cursor: pointer;
    display: grid;
    grid-template-columns: 6fr 2fr 1fr;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #8082c5;
    box-sizing: border-box;
    margin: 0 16px;
    padding: 16px 0;
    border-bottom: 1px solid #f1f2fe;
    @media (min-width: 880px) {
      margin: 0 24px;
    }
  }
`;

const SharesContainer = styled(Row)`
  padding-top: 8px;
  flex-wrap: wrap;
  margin: -2px;
  & > * {
    margin: 2px;
  }
  min-width: 125px;
  @media (min-width: 400px) {
    min-width: 210px;
  }
  @media (min-width: 520px) {
    min-width: 325px;
  }
`;

const Invest: React.FC<IProps> = () => {
  const { poolsStore, accountStore } = useStores();
  const [searchValue, setSearchValue] = useState<string>("");
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
        <Text style={{ width: "100%" }} weight={500} size="large">
          Invest in Puzzle Mega Pools
        </Text>
        <SizedBox height={4} />
        <Text style={{ width: "100%" }} size="medium" type="secondary">
          Select a pool to invest
        </Text>
        <SizedBox height={24} />
        <SearchInput
          placeholder="Asset or pool name"
          style={{ background: "#fff", width: "100%" }}
          className="mobile"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <SizedBox height={16} />
        <Card style={{ padding: 0, minHeight: 280, justifyContent: "center" }}>
          {filteredPools.length > 0 ? (
            <Grid>
              <div className="gridTitle">
                <div>Pool name</div>
                <AdaptiveRow>
                  <div className="desktop">Pool value</div>
                </AdaptiveRow>
                <div>APY</div>
              </div>
              {filteredPools.map((pool, i) => (
                <Link
                  to={`/${(accountStore.ROUTES.invest as any)[pool.id]}`}
                  className="gridRow"
                  key={i}
                >
                  <Row>
                    <Icon src={pool.logo} alt="logo" />
                    <SizedBox width={8} />
                    <Column crossAxisSize="max">
                      <Row alignItems="center">
                        <Text style={{ whiteSpace: "nowrap" }} weight={500}>
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
                          const isDefault =
                            pool.defaultAssetId0 === assetId ||
                            pool.defaultAssetId1 === assetId;
                          return (
                            <Tag background={isDefault ? "#C6C9F4" : undefined}>
                              {symbol} {shareAmount * 100} %
                            </Tag>
                          );
                        })}
                      </SharesContainer>
                    </Column>
                  </Row>
                  <AdaptiveRow>
                    <Text style={{ whiteSpace: "nowrap" }} className="desktop">
                      $ {pool.globalLiquidity}
                    </Text>
                  </AdaptiveRow>
                  <Text style={{ whiteSpace: "nowrap" }}>– %</Text>
                </Link>
              ))}
            </Grid>
          ) : (
            <PoolNotFound onClear={() => setSearchValue("")} />
          )}
        </Card>
      </Root>
    </Layout>
  );
};

export default observer(Invest);
