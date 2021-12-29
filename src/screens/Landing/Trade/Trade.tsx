import styled from "@emotion/styled";
import React from "react";
import Layout from "@screens/Landing/Layout";

interface IProps {}

const Root = styled(Layout)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 260px;
  margin-bottom: 45px;
  position: relative;
  @media (min-width: 880px) {
    padding-top: 260px;
    margin-bottom: 102px;
  }
`;
const Title = styled.div`
  font-weight: 500;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  color: #363870;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 32px;
  @media (min-width: 630px) {
    margin-top: 72px;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    & > :last-of-type {
      grid-column-end: span 2;
    }
  }
  @media (min-width: 1280px) {
    margin-top: 120px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    & > :first-of-type {
      grid-column-end: span 3;
    }

    & > :nth-of-type(2) {
      grid-column-end: span 3;
    }

    & > :nth-of-type(n + 3) {
      grid-column-end: span 2;
    }

    gap: 20px;
  }
`;
const Trade: React.FC<IProps> = ({ children }) => {
  const items = ["", ""];
  return (
    <Root>
      {children}
      <Title>
        Trade the most performing tokens listed in Puzzle mega pools
      </Title>
      <Wrapper>
        {items.map((i, index) => (
          <div key={index} {...i} />
        ))}
      </Wrapper>
    </Root>
  );
};
export default Trade;
