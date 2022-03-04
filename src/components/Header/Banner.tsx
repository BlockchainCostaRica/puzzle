import styled from "@emotion/styled";
import React from "react";
import { ReactComponent as CloseIcon } from "@src/assets/icons/close.svg";
import { useStores } from "@stores";

interface IProps {
  closed: boolean;
  setClosed: (v: boolean) => void;
}

const Root = styled.div<{ closed: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 102;
  @media (min-width: 880px) {
    flex-direction: row;
  }
  align-items: center;
  justify-content: center;
  height: ${({ closed }) => (closed ? "0px" : "80px")};
  @media (min-width: 880px) {
    height: ${({ closed }) => (closed ? "0px" : "56px")};
  }
  padding: ${({ closed }) => (closed ? "0px" : "0 48px")};
  transition: 0.5s;
  overflow: hidden;
  background: #363870;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #c6c9f4;
  position: relative;
  white-space: nowrap;

  .close {
    position: absolute;
    cursor: pointer;
    right: 16px;
    @media (min-width: 880px) {
      right: 48px;
    }
  }
`;

const BoldText = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: #fff;
  padding: 0;

  :hover {
    color: #c6c9f4;
  }
`;

const Banner: React.FC<IProps> = ({ closed, setClosed }) => {
  const { accountStore } = useStores();
  return (
    <Root closed={closed}>
      Puzzle Wallet is live! 🎊&nbsp;
      <BoldText onClick={() => accountStore.setWalletModalOpened(true)}>
        Manage your crypto
      </BoldText>
      <CloseIcon className="close" onClick={() => setClosed(true)} />
    </Root>
  );
};
export default Banner;
