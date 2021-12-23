import styled from "@emotion/styled";
import React, { createRef } from "react";
import useOnClickOutside from "@src/hooks/useOnClickOutside";
import { ReactComponent as Close } from "@src/assets/icons/close.svg";
import SearchInput from "@screens/MultiSwapInterface/SearchInput";
import TokenInfo from "@screens/MultiSwapInterface/TokenSelectModal/TokenInfo";

interface IProps {
  onClose: () => void;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  background-color: white;
  width: calc(100% - 32px);
  max-width: 360px;
  border-radius: 16px 16px 0px 0px;
`;
const Background = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: black;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
const Header = styled.div`
  display: flex;
  background: #ffffff;
  border-radius: 16px 16px 0px 0px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #f1f2fe;
`;
const Layout = styled.div`
  padding: 16px 16px 0 16px;
`;

const tokens = [
  {
    name: "Waves",
    symbol: "Waves",
    price: "200.00",
    dollarPrice: "14,432.13",
  },
  {
    name: "Puzzle Token",
    symbol: "PUZZLE",
    dollarPrice: "14,432.13",
    price: "136.0123",
    active: true,
  },
  {
    symbol: "USDN",
    name: "Neutrino USD",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
];
const TokenSelectModal: React.FC<IProps> = ({ onClose }) => {
  const ref = createRef<HTMLDivElement>();
  useOnClickOutside(ref, onClose);
  return (
    <Background>
      <Root ref={ref}>
        <Header>
          <div>Select a token</div>
          <Close onClick={onClose} style={{ cursor: "pointer" }} />
        </Header>
        <Layout>
          <SearchInput
            value=""
            onClick={() => {}}
            placeholder="Search by name or ticker…"
          />
          {tokens.map((t) => (
            <TokenInfo key={t.name} {...t} />
          ))}
        </Layout>
      </Root>
    </Background>
  );
};
export default TokenSelectModal;
