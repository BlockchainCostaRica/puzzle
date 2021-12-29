import styled from "@emotion/styled";
import React, { useEffect, useRef, useState } from "react";
import { Row } from "@components/Flex";
import puzzle from "@src/assets/landing/puzzleToken.png";

interface IProps {}

const CustomersWrapper = styled(Row)`
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: -80px;
  z-index: 1;
  @media (min-width: 880px) {
    top: -120px;
    width: 100%;
    padding: 36px 44px 56px 44px;
  }
`;

const Root = styled.div`
  margin: 0 16px;
  display: flex;
  flex-direction: row;
  background: #7075e9;
  border-radius: 16px;
  padding: 24px;
  justify-content: space-between;
  width: 100%;
  @media (min-width: 880px) {
    padding: 48px;
  }
`;
const Title = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  padding-bottom: 22px;
  @media (min-width: 880px) {
    font-size: 32px;
    line-height: 40px;
    padding-bottom: 70px;
    max-width: 260px;
  }
`;

const Btn = styled.button`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #363870;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 6px 20px;
  outline: none;
  border: none;
  width: fit-content;
`;
const Img = styled.img<{ height: number }>`
  position: absolute;
  width: 50%;
  height: ${({ height }) => (height ? "calc(height * 1.1)" : "auto")};
`;
const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const PuzzleToken: React.FC<IProps> = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<any>();

  const getListSize = () => {
    const newHeight = ref.current && ref.current.clientHeight;
    console.log(height);
    setHeight(newHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", getListSize);
  }, []);

  return (
    <CustomersWrapper>
      <Root ref={ref}>
        <LeftSide>
          <Title>PUZZLE token is released!</Title>
          <Btn>Learn more</Btn>
        </LeftSide>
        <div style={{ position: "relative", height: "100%" }}>
          <Img src={puzzle} alt="puzzle" height={height} />
        </div>
      </Root>
    </CustomersWrapper>
  );
};
export default PuzzleToken;
