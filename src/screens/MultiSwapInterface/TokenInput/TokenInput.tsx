import styled from "@emotion/styled";
import React, { useState } from "react";
import TokenSelect from "@screens/MultiSwapInterface/TokenInput/TokenSelect";
import MaxButton from "@components/MaxButton";
import BigNumber from "bignumber.js";
import TokenSelectModal from "@screens/MultiSwapInterface/TokenSelectModal/TokenSelectModal";
import DollarEquivalent from "@components/DollarEquivalent";

interface IProps {
  value: BigNumber;
  dollarValue: BigNumber;
  onChange: (e: any) => void;
  onMaxClick?: () => void;
}

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
const Input = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
`;
const TokenInput: React.FC<IProps> = ({
  value,
  onChange,
  onMaxClick,
  dollarValue,
}) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <Root>
      <TokenSelect onClick={() => setOpenModal(!openModal)} />
      <InputContainer>
        {onMaxClick && <MaxButton onClick={onMaxClick} />}
        <Input value={value.toString()} onChange={onChange} type="number" />
        <DollarEquivalent price={dollarValue.toString()} />
      </InputContainer>
      {openModal && (
        <TokenSelectModal onClose={() => setOpenModal(!openModal)} />
      )}
    </Root>
  );
};
export default TokenInput;
