import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import Card from "@components/Card";
import { Column } from "@src/components/Flex";
import eagle from "@src/assets/eagle.png";
import Button from "@components/Button";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 24px;
`;
const Img = styled.img`
  height: 176px;
  width: 176px;
`;
const NFTStaking: React.FC = () => {
  return (
    <Root>
      <Card type="dark" flexDirection="row" justifyContent="space-between">
        <Column>
          <Text>NFT Staking</Text>
          <Text>Buy and stake NFTs to get APY boost up to 45.32%</Text>
          <Button kind="secondary">Go to NFT Staking</Button>
        </Column>
        <Img src={eagle} alt="eagle" />
      </Card>
    </Root>
  );
};
export default NFTStaking;
