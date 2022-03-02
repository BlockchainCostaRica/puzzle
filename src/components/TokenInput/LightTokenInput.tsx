import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import Text from "@components/Text";
import { observer } from "mobx-react-lite";
import BN from "@src/utils/BN";
import BigNumberInput from "@components/BigNumberInput";
import AmountInput from "@components/AmountInput";
import { Row } from "../Flex";
import SizedBox from "@components/SizedBox";

interface IProps {
  assetId: string;
  decimals: number;
  amount: BN;
  setAmount?: (amount: BN) => void;
  onMaxClick?: () => void;
  usdnEquivalent?: string;
  error?: boolean;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputContainer = styled.div<{
  focused?: boolean;
  error?: boolean;
  invalid?: boolean;
  readOnly?: boolean;
}>`
  background: ${({ focused, error }) => (focused ? "#fffff" : "#f1f2fe")};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  height: 48px;
  border-radius: 12px;
  width: 100%;
  position: relative;
  cursor: ${({ readOnly }) => (readOnly ? "not-allowed" : "unset")};

  box-sizing: border-box;

  input {
    cursor: ${({ readOnly }) => (readOnly ? "not-allowed" : "unset")};
  }

  border: 1px solid
    ${({ focused, readOnly }) => (focused && !readOnly ? "#7075E9" : "#f1f2fe")};

  :hover {
    border-color: ${({ readOnly, focused }) =>
      !readOnly && !focused ? "#C6C9F4" : focused ?? "#7075E9"};
  }
`;
const LightTokenInput: React.FC<IProps> = (props) => {
  const [focused, setFocused] = useState(false);
  const [amount, setAmount] = useState<BN>(props.amount);

  useEffect(() => {
    props.amount && setAmount(props.amount);
  }, [props.amount]);

  return (
    <Root>
      <Row>
        <Text type="secondary" size="medium">
          Amount
        </Text>
        <Text
          type="secondary"
          textAlign="right"
          style={{ cursor: "pointer" }}
          onClick={props.onMaxClick}
          size="medium"
        >
          MAX
        </Text>
      </Row>
      <SizedBox height={4} />
      <InputContainer focused={focused} readOnly={!props.setAmount}>
        <BigNumberInput
          renderInput={(props, ref) => (
            <AmountInput
              {...props}
              onFocus={(e) => {
                props.onFocus && props.onFocus(e);
                !props.readOnly && setFocused(true);
              }}
              onBlur={(e) => {
                props.onBlur && props.onBlur(e);
                setFocused(false);
              }}
              ref={ref}
            />
          )}
          autofocus={focused}
          decimals={props.decimals}
          value={amount}
          onChange={(v) => setAmount(v)}
          placeholder="0.00"
          readOnly={!props.setAmount}
        />
        <Text
          style={{ whiteSpace: "nowrap" }}
          type="secondary"
          size="small"
          fitContent
        >
          {props.usdnEquivalent}
        </Text>
      </InputContainer>
    </Root>
  );
};
export default observer(LightTokenInput);
