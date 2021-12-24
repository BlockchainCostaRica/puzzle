import styled from "@emotion/styled";
import React from "react";
import { Column, Row } from "@src/components/Flex";
import SizedBox from "@components/SizedBox";
import { ITokenConfig } from "@src/constants";
import Text from "@components/Text";

interface IProps {
  token: ITokenConfig;
}

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  margin: 8px 0;
`;
const DefaultIcon = styled.div`
  width: 40px;
  height: 40px;
  color: #f1f2fe;
  border: 1px solid #f1f2fe;
  border-radius: 8px;
`;
const Icon = styled.img`
  width: 40px;
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
const Amount = styled.div`
  display: flex;
  flex-direction: column;
`;
const TokenInfo: React.FC<IProps> = ({ token }) => {
  return (
    <Root>
      <Row>
        {token.logo ? <Icon src={token.logo} /> : <DefaultIcon />}
        <SizedBox width={8} />
        <Column>
          <Name>{token.name}</Name>
          <Symbol>{token.symbol}</Symbol>
        </Column>
      </Row>
      <Column alignItems="flex-end">
        <Amount>–</Amount>
        <Text type="secondary" size="small">
          –
        </Text>
      </Column>
    </Root>
  );
};
export default TokenInfo;
