import styled from "@emotion/styled";
import React from "react";
import FilledText from "@screens/TradeInterface/RoutingModal/FilledText";
import Text from "@components/Text";
import { ISchemaExchange } from "@screens/TradeInterface/TradeVM";
import tokenLogos from "@src/assets/tokens/tokenLogos";
import SizedBox from "@components/SizedBox";
import { Row } from "src/components/Flex";
import RoundTokenIcon from "@components/RoundTokenIcon";

interface IProps extends ISchemaExchange {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #f1f2fe;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 16px;
`;

const AssetContainer: React.FC<IProps> = ({
  amount0,
  amount1,
  token0,
  token1,
  type,
}) => {
  console.log(token0?.logo);
  return (
    <Root>
      <Row alignItems="center">
        <RoundTokenIcon alt="icon" src={token0?.logo} />
        <SizedBox width={8} />
        <Text>{token0?.symbol}</Text>
      </Row>
      <SizedBox width={8} />
      <FilledText>
        1 {token0?.symbol} = 0.057 {token1?.symbol} {type}
      </FilledText>
    </Root>
  );
};
export default AssetContainer;
