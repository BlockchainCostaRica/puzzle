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
  singleRoute?: boolean;
}

const Root = styled.div<{ singleAsset?: boolean; singleRoute?: boolean }>`
  display: flex;
  flex-direction: column;
  border: 1px solid #f1f2fe;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 16px;
  margin: 0 24px;
  width: 100%;
  ${({ singleAsset }) => (singleAsset ? "" : "max-width: 245px")};
`;

const Asset: React.FC<IProps> = ({
  rate,
  token0,
  token1,
  type,
  singleAsset,
  singleRoute,
  ...rest
}) => {
  return (
    <Root {...rest} singleAsset={singleAsset} singleRoute={singleRoute}>
      <Row alignItems="center">
        <RoundTokenIcon alt="icon" src={token0?.logo} />
        <SizedBox width={8} />
        <Text>{token0?.symbol}</Text>
      </Row>
      <SizedBox height={8} />
      <FilledText justifyContent="start">
        1 {token0?.symbol} = {rate.toFormat(2)} {token1?.symbol} &nbsp;
        <b>{type}</b>
      </FilledText>
    </Root>
  );
};
export default Asset;
