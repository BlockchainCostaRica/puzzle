import styled from "@emotion/styled";
import React, { ChangeEvent, HTMLAttributes, useState } from "react";
import Text from "@components/Text";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
}

const Root = styled.div<{ focused?: boolean; error?: boolean }>`
  position: relative;
  background: ${({ focused }) => (focused ? "#fffff" : "#f1f2fe")};
  border: 1px solid
    ${({ focused, error }) =>
      error ? "#ED827E" : focused ? "#7075E9" : "#f1f2fe"};

  :hover {
    border-color: ${({ focused, error }) =>
      error ? "#ED827E" : !focused ? "#C6C9F4" : "#7075E9"};
  }

  border-radius: 12px;
  justify-content: space-between;
  display: flex;
  padding: 8px 27px 8px 12px;
  font-size: 16px;
  line-height: 24px;
  box-sizing: border-box;
  height: 40px;
  width: 80px;

  input {
    text-align: right;
    padding: 0;
    width: 41px;
    height: 22px;
    color: ${({ focused }) => (focused ? "#363870" : "#8082c5")};
    outline: none;
    border: none;
    background-color: transparent;

    ::placeholder {
      color: #8082c5;
    }
  }
`;

const ShareTokenInput: React.FC<IProps> = ({
  value,
  error,
  onChange,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <>
      <Root focused={focused} error={error} {...rest}>
        <input
          type="number"
          max="100"
          min="0"
          onChange={onChange}
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Text
          type="secondary"
          size="medium"
          fitContent
          style={{ position: "absolute", right: 12, top: 10 }}
        >
          %
        </Text>
      </Root>
    </>
  );
};
export default ShareTokenInput;
