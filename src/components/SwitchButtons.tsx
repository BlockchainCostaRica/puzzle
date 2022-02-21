import styled from "@emotion/styled";
import React from "react";
import { Row } from "@components/Flex";

interface IProps {
  values: [string, string];
  active: 0 | 1;
  onActivate: (v: 0 | 1) => void;
  border?: boolean;
}

const Root = styled(Row)<{ border?: boolean }>`
  background: #f1f2fe;
  padding: 4px;
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: ${({ border }) => border && "1px solid #f1f2fe"};
`;

const Item = styled.div<{ active?: boolean }>`
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  flex: 1;
  background: ${({ active }) => (active ? "#FFFFFF" : "#f1f2fe")};
  width: 100%;
  height: 100%;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${({ active }) => (active ? "#7075E9" : "#8082C5")};
  ${({ active }) =>
    active && "box-shadow: 0 8px 24px rgba(54, 56, 112, 0.16); z-index: 1"};

  border-radius: 10px;
  cursor: pointer;
`;

const SwitchButtons: React.FC<IProps> = ({
  values,
  active,
  onActivate,
  border,
}) => {
  return (
    <Root border={border}>
      <Item
        active={active === 0}
        onClick={() => onActivate(0)}
        // style={{ marginRight: 16 }}
      >
        {values[0]}
      </Item>
      <Item active={active === 1} onClick={() => onActivate(1)}>
        {values[1]}
      </Item>
    </Root>
  );
};
export default SwitchButtons;
