import styled from "@emotion/styled";
import React from "react";
import { Row } from "@components/Flex";

interface IProps {
  values: [string, string];
  active: 0 | 1;
  onActivate: (v: 0 | 1) => void;
}

const Root = styled(Row)`
  background: #fff;
  padding: 2px;
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
`;

const Item = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  flex: 1;
  background: ${({ active }) => (active ? "#7075E9" : "#fff")};
  width: 100%;
  height: 100%;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${({ active }) => (active ? "#fff" : "#8082C5")};
  border-radius: 10px;
  cursor: pointer;
`;

const SwitchButtons: React.FC<IProps> = ({ values, active }) => {
  return (
    <Root>
      <Item active={active === 0}>{values[0]}</Item>
      <Item active={active === 1}>{values[1]}</Item>
    </Root>
  );
};
export default SwitchButtons;
