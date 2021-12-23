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
const Icon = styled.img`
  width: 40px;
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
      <Icon src={icon ?? "defaultIconPath"} />
      <Name>{name}</Name>
      <Name>{price}</Name>
      <DollarEquivalent price={dollarPrice} />
    </Root>
  );
};
export default TokenInfo;
