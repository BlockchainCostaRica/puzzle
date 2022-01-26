import styled from "@emotion/styled";
import React from "react";
import SquareTokenIcon from "@components/SquareTokenIcon";
import SizedBox from "@components/SizedBox";
import { Column } from "@src/components/Flex";
import { ReactComponent as Arrow } from "@src/assets/icons/blackRightArrow.svg";
import FilledText from "@screens/TradeInterface/RoutingModal/FilledText";
import tokenLogos from "@src/assets/tokens/tokenLogos";

interface IProps {
  imgSrc?: string;
  percent?: string;
}

const Root = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  flex-direction: row;
`;
const Token0Amount: React.FC<IProps> = ({ percent, imgSrc }) => {
  return (
    <Root>
      <Column justifyContent="center" alignItems="center">
        <SquareTokenIcon
          size="small"
          alt="icon"
          src={imgSrc ?? tokenLogos.UNKNOWN}
        />
        <SizedBox height={8} />
        <FilledText style={{ width: 60 }}>{percent} %</FilledText>
      </Column>
      <SizedBox width={21} />
      <Arrow style={{ fill: "black" }} />
    </Root>
  );
};
export default Token0Amount;
