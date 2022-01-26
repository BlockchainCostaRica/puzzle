import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";
import FilledText from "@screens/TradeInterface/RoutingModal/FilledText";
import Text from "@components/Text";
import { ISchemaExchange } from "@screens/TradeInterface/TradeVM";
import SizedBox from "@components/SizedBox";
import { Row } from "src/components/Flex";
import RoundTokenIcon from "@components/RoundTokenIcon";

interface IProps extends ISchemaExchange, HTMLAttributes<HTMLDivElement> {
  singleAsset?: boolean;
}

const Root = styled.div<{ singleAsset?: boolean }>`
  display: flex;
  flex-direction: column;
  border: 1px solid #f1f2fe;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 16px;
  margin: 0 24px;
  //min-width: 245px;
  width: ${({ singleAsset }) => (singleAsset ? "100%" : "245%")};
`;

const Asset: React.FC<IProps> = ({
  rate,
  token0,
  token1,
  type,
  singleAsset,
  ...rest
}) => {
  const formatType = (type: string) => {
    switch (type) {
      case "swopfi":
        return "Swop.fi";
      case "waves":
        return "Waves";
      case "puzzle":
        return "Puzzle";
    }
  };
  const newType = formatType(type);
  return (
    <Root {...rest} singleAsset={singleAsset}>
      <Row alignItems="center">
        <RoundTokenIcon alt="icon" src={token0?.logo} />
        <SizedBox width={8} />
        <Text>{token0?.symbol}</Text>
      </Row>
      <SizedBox height={8} />
      <FilledText justifyContent="start">
        1 {token0?.symbol} = {rate.toFormat(2)} {token1?.symbol} &nbsp;
        <b>{newType}</b>
      </FilledText>
    </Root>
  );
};
export default Asset;
