import styled from "@emotion/styled";
import React, { useState } from "react";
import TokenSelect from "@screens/MultiSwapInterface/TokenInput/TokenSelect";
import MaxButton from "@components/MaxButton";
import BigNumber from "bignumber.js";
import TokenSelectModal from "@screens/MultiSwapInterface/TokenSelectModal/TokenSelectModal";
import { ITokenConfig } from "@src/constants";
import Text from "@components/Text";

interface IProps {
  tokens: ITokenConfig[];

  assetId: string;
  setAssetId: (assetId: string) => void;

  amount: BigNumber;
  setAmount?: (amount: BigNumber) => void;

  dollarValue?: BigNumber;
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
const TokenInput: React.FC<IProps> = (props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) =>
    props.setAmount && props.setAmount(new BigNumber(e.target.value));
  return (
    <Root>
      <TokenSelect onClick={() => setOpenModal(!openModal)} />
      <InputContainer>
        {props.onMaxClick && <MaxButton onClick={props.onMaxClick} />}
        <Input
          type="number"
          value={props.amount.toString()}
          onChange={handleChangeAmount}
          readOnly={!props.setAmount}
        />
        <Text type="secondary" size="small">
          {props.dollarValue ? `$ ${props.dollarValue.toString()}}` : null}
        </Text>
      </InputContainer>
      {openModal && (
        <TokenSelectModal
          tokens={props.tokens}
          onClose={() => setOpenModal(!openModal)}
        />
      )}
    </Root>
  );
};
export default TokenInput;
