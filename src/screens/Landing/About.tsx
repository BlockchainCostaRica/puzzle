import styled from "@emotion/styled";
import React from "react";
import img from "@src/assets/landing/home-img.png";
import trade from "@src/assets/landing/tradeIcon.svg";
import liquidity from "@src/assets/landing/liquidityIcon.svg";
import { Row, Column } from "@src/components/Flex";
import Button from "@components/Button";
import Text from "@components/Text";

interface IProps {}

const Wrapper = styled(Column)`
  align-items: center;
  background: #f1f2fe;
  width: 100%;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 56px 16px 136px 16px;
  box-sizing: border-box;
  max-width: 1440px;
  @media (min-width: 880px) {
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 72px 20px;
  }
`;

const Home: React.FC<IProps> = () => {
  return (
    <Wrapper>
      <Root>
        <Text style={{ color: "#7075E9", fontWeight: 500 }}>ABOUT</Text>
      </Root>
    </Wrapper>
  );
};
export default Home;
