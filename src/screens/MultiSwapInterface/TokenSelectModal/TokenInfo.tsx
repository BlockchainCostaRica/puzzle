import styled from "@emotion/styled";
import React from "react";
import DollarEquivalent from "@components/DollarEquivalent";
import { Column } from "@src/components/Flex";
import { Row } from "reactstrap";

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
  //flex-direction: row;
  //justify-content: space-between;
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
      <Row>
        {icon ? <Icon src={icon} /> : <DefaultIcon />}
        <Column>
          <Name>{name}</Name>
          <Symbol>{symbol}</Symbol>
        </Column>
      </Row>
      <Column alignItems="flex-end">
        <Amount>{price}</Amount>
        <DollarEquivalent price={dollarPrice} />
      </Column>
    </Root>
  );
};
export default TokenInfo;
