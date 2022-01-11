import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import Button from "@components/Button";
import SizedBox from "@components/SizedBox";
import WhiteCard from "@screens/InvestToPoolInterface/WhiteCard";
import { useStores } from "@stores";
import { Column } from "@src/components/Flex";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Card = styled(WhiteCard)<{ connected?: boolean }>`
  //align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 8px;
  justify-content: ${({ connected }) => (connected ? "start" : "center")};
`;

const YourLiquidity: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const { address } = accountStore;
  return (
    <Root>
      <Text weight={500} type="secondary">
        Your liquidity
      </Text>
      <SizedBox height={8} />
      <Card connected={address == null}>
        {address == null ? (
          <>
            <Text type="secondary" style={{ textAlign: "center" }}>
              Connect your wallet to see pool token balance
            </Text>
            <SizedBox height={8} />
            <Button fixed size="medium">
              Connect wallet
            </Button>
          </>
        ) : (
          <>
            <Column>
              <Text type="secondary">Value</Text>
              <SizedBox height={4} />
              <Text weight={500} size="large" style={{ lineHeight: "32px" }}>
                $ 1,234.00
              </Text>
              <SizedBox height={16} />
              <Button fixed size="medium" kind="secondary">
                Withdraw
              </Button>
            </Column>
            <Column>
              <Text type="secondary">Share of pool</Text>
              <SizedBox height={4} />
              <Text weight={500} size="large" style={{ lineHeight: "32px" }}>
                1.23%
              </Text>
              <SizedBox height={16} />
              <Button fixed size="medium">
                Deposit
              </Button>
            </Column>
          </>
        )}
      </Card>
    </Root>
  );
};
export default YourLiquidity;
