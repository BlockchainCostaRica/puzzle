import styled from "@emotion/styled";
import React from "react";
import { ReactComponent as PuzzleIcon } from "@src/assets/icons/puzzle.svg";
import SizedBox from "@components/SizedBox";
interface IProps {}

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  height: 20px;
  background: linear-gradient(256.62deg, #7075e9 0%, #d19ef9 100%);
  border-radius: 10px;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
`;

const CashbackLabel: React.FC<IProps> = ({ children }) => {
  return (
    <Root>
      <PuzzleIcon />
      <SizedBox width={5} />
      {children}
    </Root>
  );
};
export default CashbackLabel;
