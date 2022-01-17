import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import info from "@src/assets/icons/info.svg";
import SizedBox from "@components/SizedBox";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  background: #f1f2fe;
  border-radius: 12px;
  padding: 18px;
  align-items: start;
  justify-content: center;
`;

const EggConvertNotification: React.FC<IProps> = () => {
  return (
    <Root>
      <img src={info} alt="info" />
      <SizedBox width={10} />
      <Text size="medium">
        Your EGG will be automatically converted to other pool tokens and
        provided as liquidity. Please pay attention that value of your deposit
        can be different from value of tokens provided because of slippage. We
        do not recommend to use this method for bigger amounts.
      </Text>
    </Root>
  );
};
export default EggConvertNotification;
