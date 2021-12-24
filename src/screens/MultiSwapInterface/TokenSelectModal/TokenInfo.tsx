import styled from "@emotion/styled";
import React from "react";
import DollarEquivalent from "@components/DollarEquivalent";
import { Column, Row } from "@src/components/Flex";
import SizedBox from "@components/SizedBox";

interface IProps {
  icon?: string;
  name: string;
  symbol: string;
  price: string;
  dollarPrice: string;
  active?: boolean;
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
const TokenInfo: React.FC<IProps> = ({
  icon,
  name,
  symbol,
  price,
  dollarPrice,
}) => {
  return (
    <Root>
      <Row style={{ flex: 1 }}>
        {icon ? <Icon src={icon} /> : <DefaultIcon />}
        <SizedBox width={8} />
        <Column>
          <Name>{name}</Name>
          <Symbol>{symbol}</Symbol>
        </Column>
      </Row>
      <Column style={{ flex: 1 }} alignItems="flex-end">
        <Amount>{price}</Amount>
        <DollarEquivalent price={dollarPrice} />
      </Column>
    </Root>
  );
};
export default TokenInfo;
