import styled from "@emotion/styled";
import React from "react";
import Layout from "./Layout";
import img from "@src/assets/landing/home-img.png";
import trade from "@src/assets/landing/tradeIcon.svg";
import liquidity from "@src/assets/landing/liquidityIcon.svg";
import { Row, Column } from "@src/components/Flex";

interface IProps {}

const Root = styled(Layout)`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding-top: 56px;
  padding-bottom: 56px;
  @media (min-width: 880px) {
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding: 100px 50px;
  }
`;
const Title = styled.div`
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  color: #363870;
  padding-bottom: 16px;
  @media (min-width: 880px) {
    font-size: 48px;
    line-height: 56px;
  }
`;
const Subtitle = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: #8082c5;
  padding-bottom: 8px;
`;
const BtnContainer = styled(Row)`
  padding: 40px 0;
  justify-content: center;
  @media (min-width: 880px) {
    justify-content: start;
  }
`;
const Btn = styled.div<{ def?: boolean }>`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  padding: 16px 40px;
  justify-content: center;
  align-items: center;
  width: 50%;
  @media (min-width: 880px) {
    max-width: 144px;
  }
  background: ${({ def }) => (def ? "#7075E9" : "transparent")};
  color: ${({ def }) => (def ? "#ffffff" : "#363870")};
  border: ${({ def }) => !def && "1px solid #F1F2FE"};
  border-radius: 12px;
  cursor: pointer;
`;
const Icon = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 8px;
`;
const Image = styled.img`
  width: 100%;
  height: auto;
  padding-bottom: 46px;
  @media (min-width: 880px) {
    width: 50%;
  }
`;
const Home: React.FC<IProps> = () => {
  return (
    <Root>
      <Column mainAxisSize="stretch" crossAxisSize="max">
        <Title>Decentralized exchange of a newer generation</Title>
        <Row>
          <Icon src={trade} alt="trade" />
          <Subtitle>Trade tokens in multiple mega pools</Subtitle>
        </Row>
        <Row>
          <Icon src={liquidity} alt="liquidity" />
          <Subtitle>Provide liquidity with up to X% APY</Subtitle>
        </Row>
        <BtnContainer>
          <Btn def style={{ marginRight: 8 }}>
            Invest
          </Btn>
          <Btn>Trade</Btn>
        </BtnContainer>
      </Column>
      <Image src={img} />
    </Root>
  );
};
export default Home;
