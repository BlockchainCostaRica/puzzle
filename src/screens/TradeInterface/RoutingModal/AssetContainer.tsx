import styled from "@emotion/styled";
import React from "react";
import SquareTokenIcon from "@components/SquareTokenIcon";
import FilledText from "@screens/TradeInterface/RoutingModal/FilledText";
import { Row } from "reactstrap";
import Text from "@components/Text";

interface IProps {
  tokenLogo: string;
  tokenSymbol: string;
  changeService: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #f1f2fe;
  box-sizing: border-box;
  border-radius: 12px;
`;

const AssetContainer: React.FC<IProps> = ({
  tokenLogo,
  tokenSymbol,
  changeService,
}) => {
  return (
    <Root>
      <Row>
        <SquareTokenIcon src={tokenLogo} alt="icon" />
        <Text>{tokenSymbol.toUpperCase()}</Text>
      </Row>
      <FilledText>1 USDN = 0.057 WAVES {changeService}</FilledText>
    </Root>
  );
};
export default AssetContainer;
