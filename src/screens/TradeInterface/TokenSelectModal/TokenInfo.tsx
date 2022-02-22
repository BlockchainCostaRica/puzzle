import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";
import { Column, Row } from "@src/components/Flex";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import Balance from "@src/entities/Balance";
import SquareTokenIcon from "@components/SquareTokenIcon";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  token: Balance;
}

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  padding: 10px 24px;

  :hover {
    background: #f1f2fe;
  }
`;
const DefaultIcon = styled.div`
  width: 40px;
  height: 40px;
  color: #f1f2fe;
  border: 1px solid #f1f2fe;
  border-radius: 8px;
`;
const Name = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #363870;
`;
const Symbol = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #8082c5;
  text-transform: uppercase;
`;
const TokenInfo: React.FC<IProps> = ({ token, ...rest }) => {
  return (
    <Root {...rest}>
      <Row>
        {token.logo ? (
          <SquareTokenIcon size="small" src={token.logo} />
        ) : (
          <DefaultIcon />
        )}
        <SizedBox width={8} />
        <Column>
          <Name>{token.name}</Name>
          <Symbol>{token.symbol}</Symbol>
        </Column>
      </Row>
      <Column alignItems="flex-end">
        <Text style={{ whiteSpace: "nowrap" }} textAlign="right">
          {token.formatBalance}
        </Text>
        <Text
          style={{ whiteSpace: "nowrap" }}
          textAlign="right"
          type="secondary"
          size="small"
        >
          {token.formatUsdnEquivalent}
        </Text>
      </Column>
    </Root>
  );
};
export default TokenInfo;
