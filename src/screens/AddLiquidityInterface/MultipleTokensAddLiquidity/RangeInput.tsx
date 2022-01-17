import styled from "@emotion/styled";
import React from "react";

interface IProps {
  value: number;
  onChange: (v: number) => void;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 0;
`;
const Input = styled.input`
  background-color: #f1f2fe;
  -webkit-appearance: none;
  border-radius: 2px;
  transition: background 450ms ease-in;

  ::-webkit-slider-runnable-track {
    width: 300px;
    height: 5px;
    border: none;
    border-radius: 3px;
    cursor: ew-resize;
  }

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    margin-top: -5px;
    box-shadow: 0px 4px 16px rgba(112, 117, 233, 0.32);
    border: 4px solid #7075e9;
    background: #ffffff;
  }

  :focus {
    outline: none;
  }

  input[type="range"]::-ms-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
`;
const InputRange: React.FC<IProps> = ({ value, onChange }) => {
  return (
    <Root>
      <Input
        onChange={(e) => onChange(+e.target.value)}
        value={value}
        type="range"
        min="0"
        max="100"
        step="0.25"
      />
    </Root>
  );
};
export default InputRange;
