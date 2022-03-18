import styled from "@emotion/styled";
import React from "react";
import Button from "@components/Button";
import Text from "@components/Text";
import { Column } from "@components/Flex";

interface IProps {}

const Root = styled.div`
  display: grid;
  align-items: center;

  & > :first-child {
    margin-bottom: 16px;
  }

  @media (min-width: 880px) {
    grid-template-columns: 2fr 1fr;
  }
`;
const NoPayment: React.FC<IProps> = () => {
  return (
    <Root>
      <Column>
        <Text weight={500}>You don’t have any NFT</Text>
        <Text type="secondary">Buy a random NFT to create the pool</Text>
      </Column>
      <Button fixed size="medium">
        Buy
      </Button>
    </Root>
  );
};
export default NoPayment;
