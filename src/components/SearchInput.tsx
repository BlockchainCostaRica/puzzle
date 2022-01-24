import styled from "@emotion/styled";
import React, { ChangeEvent, HTMLAttributes, useState } from "react";
import { ReactComponent as SearchIcon } from "@src/assets/icons/search.svg";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  suffix?: JSX.Element;
  suffixCondition?: boolean;
}

const Root = styled.div<{ focused?: boolean }>`
  background: ${({ focused }) => (focused ? "#fffff" : "#f1f2fe")};
  border: 1px solid ${({ focused }) => (focused ? "#7075E9" : "#f1f2fe")};

  :hover {
    border-color: ${({ focused }) => (!focused ? "#C6C9F4" : "#7075E9")};
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

const SearchInput: React.FC<IProps> = ({
  value,
  onChange,
  suffix,
  suffixCondition,
  placeholder,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <Root focused={focused} {...rest}>
      <SearchIcon style={{ marginRight: 16 }} />
      <input
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {suffixCondition && suffix}
    </Root>
  );
};
export default SearchInput;
