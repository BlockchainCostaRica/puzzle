import styled from "@emotion/styled";
import React from "react";
import { observer } from "mobx-react-lite";
import Layout from "@components/Layout";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import SearchInput from "@components/SearchInput";
import Card from "@components/Card";
import unknownLogo from "@src/assets/tokens/unknown-logo.svg";
import Tag from "@components/Tag";
import { Row } from "@components/Flex";
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
  div {
    width: 100%;
  }
  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const Table = styled.table`
  width: 100%;
  th {
    font-size: 14px;
    line-height: 20px;
    color: #8082c5;
    font-weight: normal;
  }
  tr,
  td {
    padding: 0;
    border: 1px solid #000;
  }
`;

const Icon = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  border: 1px solid #f1f2fe;
`;

const Invest: React.FC<IProps> = () => {
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
          style={{ background: "#fff" }}
          className="mobile"
        />
        <SizedBox height={16} />
        <Card style={{ padding: "16px 0" }}>
          <Table>
            <colgroup>
              <col span={1} style={{ width: "64px" }} />
              <col span={1} style={{ width: "calc(60% - 64px)" }} />
              <col span={1} style={{ width: "20%" }} />
              <col span={1} style={{ width: "20%" }} />
            </colgroup>
            <tr>
              <th colSpan={2}>Pool Name</th>
              <th>Pool value</th>
              <th>APY</th>
            </tr>
            <>
              <tr>
                <td rowSpan={2}>
                  <Icon src={unknownLogo} alt="logo" />
                </td>
                <td>
                  <Row alignItems="center" mainAxisSize="fit-content">
                    <Text style={{ maxWidth: "fit-content" }} weight={500}>
                      Farm Pool 1
                    </Text>
                    <SizedBox width={8} />
                    <Tag type="primary">Provide EGG only</Tag>
                  </Row>
                </td>
                <td>$ 999,999.00</td>
                <td>123.45 %</td>
              </tr>
              <tr>
                <td>
                  <Tag>DUXPLORER 10 %</Tag>
                  <Tag>MATH 10 %</Tag>
                  <Tag>TURTLE 10 %</Tag>
                  <Tag>EGGSEGGS 10 %</Tag>
                  <Tag>PESOLATINO 10 %</Tag>
                  <Tag>PESOLATINO 10 %</Tag>
                  <Tag>FOMO 10 %</Tag>
                </td>
                <td>$ 999,999.00</td>
                <td>123.45 %</td>
              </tr>
            </>
          </Table>
        </Card>
      </Root>
    </Layout>
  );
};

export default observer(Invest);
