import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";
import SizedBox from "@components/SizedBox";
import { Row, Column } from "@src/components/Flex";
import { ReactComponent as ArrowDownIcon } from "@src/assets/icons/arrowDown.svg";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  min-width: 200px;
`;

const TokenName = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #363870;
`;

const Balance = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #8082c5;
`;

const TokenIcon = styled.img`
  border: 1px solid #f1f2fe;
  border-radius: 12px;
  box-sizing: border-box;
  width: 56px;
  height: 56px;
  box-shadow: none;
  color: transparent;
`;

const TokenSelect: React.FC<IProps> = ({ ...rest }) => {
  return (
    <Root {...rest}>
      <Row alignItems="center">
        <TokenIcon src="https://s2.coinmarketcap.com/static/img/coins/200x200/1274.png" />
        <SizedBox width={8} />
        <Column justifyContent="center">
          <TokenName>WAVES</TokenName>
          <Balance>200.00</Balance>
        </Column>
      </Row>
      <ArrowDownIcon />
    </Root>
  );
};
export default TokenSelect;
