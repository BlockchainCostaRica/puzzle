import React from "react";
import styled from "@emotion/styled";

const Root = styled.input`
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

type TProps = React.InputHTMLAttributes<HTMLInputElement>;

const AmountInput = React.forwardRef<HTMLInputElement, TProps>(
  ({ onFocus, onWheel, ...props }, ref) => (
    <Root
      ref={ref}
      type="number"
      onFocus={(e) => {
        e.target.select();
        onFocus && onFocus(e);
      }}
      onWheel={(e) => {
        e.target && (e.target as any).blur();
        onWheel && onWheel(e);
      }}
      {...props}
    />
  )
);

AmountInput.displayName = "AmountInput";

export default AmountInput;
