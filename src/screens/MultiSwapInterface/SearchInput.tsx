import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";
import { ReactComponent as SearchIcon } from "@src/assets/icons/search.svg";

interface IProps extends HTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: any) => void;
}

const Root = styled.div`
  background: #f1f2fe;
  border-radius: 12px;
  display: flex;
  padding: 12px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;

  input {
    width: 100%;
    color: #8082c5;
    outline: none;
    border: none;
    background-color: transparent;

    ::placeholder {
      color: #8082c5;
    }
  }
`;

const SearchInput: React.FC<IProps> = ({ value, onChange }) => {
  return (
    <Root>
      <SearchIcon />
      <input onChange={onChange} value={value} />
    </Root>
  );
};
export default SearchInput;
