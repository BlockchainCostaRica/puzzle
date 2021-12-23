import styled from "@emotion/styled";
import React from "react";
import DollarEquivalent from "@components/DollarEquivalent";

interface IProps {
  icon?: string;
  name: string;
  price: string;
  dollarPrice: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
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
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #363870;
`;
const TokenInfo: React.FC<IProps> = ({ icon, name, price, dollarPrice }) => {
  return (
    <Root>
      {icon ? <Icon src={icon} /> : <DefaultIcon />}
      <Name>{name}</Name>
      <Name>{price}</Name>
      <DollarEquivalent price={dollarPrice} />
    </Root>
  );
};
export default TokenInfo;
