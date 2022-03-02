import styled from "@emotion/styled";
import React, { ChangeEvent, HTMLAttributes, useState } from "react";
import Text from "@components/Text";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  suffix?: JSX.Element;
  suffixCondition?: boolean;
  error?: boolean;
  errorText?: string;
}

const Root = styled.div<{ focused?: boolean; error?: boolean }>`
  width: 100%;
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
  padding: 12px;
  font-size: 16px;
  line-height: 24px;
  box-sizing: border-box;
  height: 48px;

  input {
    padding: 0;
    width: 100%;
    color: ${({ focused }) => (focused ? "#363870" : "#8082c5")};
    outline: none;
    border: none;
    background-color: transparent;

    ::placeholder {
      color: #8082c5;
    }
  }
`;

const Input: React.FC<IProps> = ({
  value,
  onChange,
  suffix,
  suffixCondition,
  placeholder,
  error,
  errorText,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <>
      <Root focused={focused} error={error} {...rest}>
        <input
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {suffixCondition && suffix}
      </Root>
      {error && (
        <Text size="small" type="error" style={{ paddingTop: 4 }}>
          {errorText}
        </Text>
      )}
    </>
  );
};
export default Input;
