import styled from "@emotion/styled";
import React from "react";

interface IProps {
  values: string[];
  active: number;
  onClick: (v: number) => void;
}

const Root = styled.div`
  display: flex;
`;
const Btn = styled.div<{ active?: boolean }>`
  background: ${({ active }) => (active ? "#7075E9" : "#ffffff")};
  color: ${({ active }) => (active ? "#ffffff" : "#363870")};
  border: 1px solid #f1f2fe;
  border-radius: 6px;
  flex: none;
  order: 1;
  flex-grow: 0;
  padding: 6px 12px;
  margin-right: 8px;
  cursor: pointer;
`;

const ButtonsGroup: React.FC<IProps> = ({ values, active, onClick }) => {
  return (
    <Root>
      {values.map((v, index) => (
        <Btn
          key={index}
          onClick={() => onClick(index)}
          active={active === index}
        >
          {v}
        </Btn>
      ))}
    </Root>
  );
};
export default ButtonsGroup;
