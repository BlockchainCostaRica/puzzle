import styled from "@emotion/styled";
import React from "react";
import { MAINNET_POOL_CONFIG } from "@src/constants/mainnetConfig";
import { IToken } from "@src/constants";
import Button from "@components/Button";
import SizedBox from "@components/SizedBox";
import { Row } from "@components/Flex";
import Text from "@components/Text";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 96px;
  max-width: 560px;
  padding: 32px;
  border-radius: 8px;
  background: white;
`;

const Table = styled.table`
  text-align: left;
  border-spacing: 0;
  border: 1px solid #f1f2fe;
  border-radius: 12px;
  border-collapse: collapse;
  th,
  td {
    width: 250px;
    padding: 0 24px;
    height: 48px;
    box-sizing: border-box;
  }

  td {
    height: 64px;
    background: transparent;
  }
`;

const TableScreen: React.FC<IProps> = () => {
  return (
    <Root>
      <Table>
        <thead>
          <tr>
            <th>
              <Text type="secondary">Asset</Text>
            </th>
            <th>
              <Text type="secondary">Price</Text>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {Object.entries(MAINNET_POOL_CONFIG)
            .reduce(
              (acc, [id, { tokens }]) => [
                ...acc,
                ...tokens.map((t) => ({ ...t, poolId: id })),
              ],
              [] as Array<IToken & { poolId: string }>
            )
            .map((v) => (
              <TableRow key={v.assetId} v={v} />
            ))}
        </tbody>
      </Table>
    </Root>
  );
};

const TableRow: React.FC<{ v: IToken & { poolId: string } }> = ({ v }) => {
  return (
    <>
      <tr key={v.assetId}>
        <td>
          <Row alignItems="center">
            <img
              style={{ width: 24, height: 24, borderRadius: "50%" }}
              src={v.logo}
              alt={v.name}
            />
            <SizedBox width={8} />
            <Text style={{ fontSize: 16 }}>{v.symbol}</Text>
          </Row>
        </td>
        <td>$ 1000</td>
        <td>
          <Button style={{ height: 40 }} kind="secondary">
            Trade
          </Button>
        </td>
      </tr>
    </>
  );
};

export default TableScreen;
