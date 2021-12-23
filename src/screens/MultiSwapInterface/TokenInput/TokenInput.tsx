import styled from "@emotion/styled";
import React from "react";
import TokenSelect from "@screens/MultiSwapInterface/TokenInput/TokenSelect";
import MaxButton from "@components/MaxButton";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  & > :first-of-type {
    margin-bottom: 8px;
  }
  @media (min-width: 560px) {
    flex-direction: row;
    & > :first-of-type {
      margin-bottom: 0;
      margin-right: 8px;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  height: 56px;
  background: #f1f2fe;
  border-radius: 12px;
  width: 100%;
  position: relative;
`;

const TokenInput: React.FC<IProps> = () => {
  return (
    <Root>
      <TokenSelect />
      <InputContainer>
        <MaxButton style={{ position: "absolute", left: 16 }} />
      </InputContainer>
    </Root>
  );
};
export default TokenInput;
