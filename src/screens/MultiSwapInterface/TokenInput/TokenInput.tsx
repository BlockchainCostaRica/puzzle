import styled from "@emotion/styled";
import React, { useState } from "react";
import TokenSelect from "@screens/MultiSwapInterface/TokenInput/TokenSelect";
import MaxButton from "@components/MaxButton";
import TokenSelectModal from "@screens/MultiSwapInterface/TokenSelectModal/TokenSelectModal";
import Text from "@components/Text";
import { observer } from "mobx-react-lite";
import Balance from "@src/entities/Balance";
import BN from "@src/utils/BN";
import BigNumberInput from "@components/BigNumberInput";

interface IProps {
  balances: Balance[];

  assetId: string;
  setAssetId: (assetId: string) => void;

  amount: BN;
  setAmount?: (amount: BN) => void;

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
  font-size: 20px;
  line-height: 24px;
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  color: #363870;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  [type="number"] {
    -moz-appearance: textfield;
  }

  ::placeholder {
    color: #8082c5;
  }
`;
const TokenInput: React.FC<IProps> = (props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const selectedAssetBalance = props.balances?.find(
    ({ assetId }) => assetId === props.assetId
  );

  const handleChangeAmount = (value: BN) =>
    props.setAmount && props.setAmount(value);

  return (
    <Root>
      <TokenSelect
        token={props.balances.find(({ assetId }) => assetId === props.assetId)}
        onClick={() => setOpenModal(!openModal)}
        balance={selectedAssetBalance?.formatBalance}
      />
      <InputContainer>
        {props.onMaxClick && <MaxButton onClick={props.onMaxClick} />}
        <BigNumberInput
          renderInput={() => <Input />}
          decimals={1e8}
          value={props.amount}
          onChange={handleChangeAmount}
        />
        {/*<Input*/}
        {/*  type="number"*/}
        {/*  value={props.amount.toString()}*/}
        {/*  onChange={handleChangeAmount}*/}
        {/*  readOnly={!props.setAmount}*/}
        {/*  placeholder="0.00"*/}
        {/*/>*/}
        <Text style={{ whiteSpace: "nowrap" }} type="secondary" size="small">
          {selectedAssetBalance?.formatUsdnEquivalent}
        </Text>
      </InputContainer>
      {openModal && (
        <TokenSelectModal
          onSelect={props.setAssetId}
          balances={props.balances}
          onClose={() => setOpenModal(!openModal)}
        />
      )}
    </Root>
  );
};
export default observer(TokenInput);
