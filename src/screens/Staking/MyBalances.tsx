import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import Card from "@components/Card";
import SizedBox from "@components/SizedBox";
import { Column, Row } from "@src/components/Flex";
import SquareTokenIcon from "@components/SquareTokenIcon";
import stakedPuzzle from "@src/assets/tokens/staked-puzzle.svg";
import puzzleLogo from "@src/assets/tokens/PUZZLE.svg";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 24px;
`;

const Container = styled(Card)`
  display: grid;
  row-gap: 16px;
  @media (min-width: 880px) {
    grid-template-columns: 1fr 1fr;
    padding: 24px;
  }
`;
const MyBalances: React.FC = () => {
  return (
    <Root>
      <Text weight={500} type="secondary">
        My balances
      </Text>
      <SizedBox height={8} />
      <Container>
        <Row>
          <SquareTokenIcon src={puzzleLogo} size="small" />
          <SizedBox width={8} />
          <Column>
            <Text type="secondary" size="small">
              Available to stake
            </Text>
            <Text weight={500}>0 PUZZLE</Text>
          </Column>
        </Row>
        <Row>
          <SquareTokenIcon src={stakedPuzzle} size="small" />
          <SizedBox width={8} />
          <Column>
            <Text type="secondary" size="small">
              Staked balance
            </Text>
            <Text weight={500}>0 PUZZLE</Text>
          </Column>
        </Row>
      </Container>
    </Root>
  );
};
export default MyBalances;
