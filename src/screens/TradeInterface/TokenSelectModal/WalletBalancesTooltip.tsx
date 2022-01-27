import styled from "@emotion/styled";
import React from "react";
import Scrollbar from "@components/Scrollbar";
import { Column, Row } from "@components/Flex";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import Balance from "@src/entities/Balance";

interface IProps {
  assetBalances: Balance[];
}

const TokenBalanceRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
  width: 210px;
  margin-bottom: 10px;
  .logo {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const WalletBalancesTooltip: React.FC<IProps> = ({ assetBalances }) => {
  return (
    <Scrollbar style={{ marginRight: -16 }}>
      <Column style={{ maxHeight: 320, width: 224 }}>
        <SizedBox height={8} />
        {assetBalances.length > 0 ? (
          assetBalances
            .filter((b) => b.usdnEquivalent && b.usdnEquivalent.gt(0))
            .map((t) => (
              <TokenBalanceRow key={t.assetId}>
                <Row alignItems="center">
                  <img className="logo" alt={t.symbol} src={t.logo} />
                  <Text>{t.formatBalance}</Text>
                </Row>
                <Text style={{ whiteSpace: "nowrap" }} type="secondary">
                  {t.formatUsdnEquivalent}
                </Text>
              </TokenBalanceRow>
            ))
        ) : (
          <Text>There is no balances</Text>
        )}
      </Column>
    </Scrollbar>
  );
};
export default WalletBalancesTooltip;
