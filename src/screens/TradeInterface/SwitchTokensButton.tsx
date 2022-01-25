import styled from "@emotion/styled";
import React, { HTMLAttributes, useState } from "react";
import { ReactComponent as SwapIcon } from "@src/assets/icons/swap.svg";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Root = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin: 16px 0;

  .icon {
    transition: 0.4s;
  }
`;

const SwitchTokensButton: React.FC<IProps> = ({ ...rest }) => {
  const [switched, setSwitched] = useState(false);
  const handleSwitch = () => {
    setSwitched((v) => !v);
  };
  return (
    <Root {...rest} onClick={handleSwitch}>
      <SwapIcon
        className="icon"
        style={{
          transform: switched ? "rotate(360deg)" : "rotate(0)",
          margin: "0 8px",
        }}
      />
      <SizedBox width={8} />
      <Text>1 ~</Text>
      <SizedBox width={16} />
    </Root>
  );
};
export default SwitchTokensButton;
