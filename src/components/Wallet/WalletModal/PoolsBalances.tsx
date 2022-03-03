import React from "react";
import { observer } from "mobx-react-lite";
import InvestRow, { InvestRowSkeleton } from "@src/components/InvestRow";
import { useWalletVM } from "@components/Wallet/WalletModal/WalletVM";
import styled from "@emotion/styled";
import SizedBox from "@components/SizedBox";
import { ReactComponent as NotFoundIcon } from "@src/assets/notFound.svg";
import Text from "@components/Text";
import Button from "@components/Button";
import { Column } from "@components/Flex";
import { useStores } from "@stores";
import { Link } from "react-router-dom";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 400px;
`;

const PoolsBalances: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const vm = useWalletVM();
  const { stakedNfts, investments } = vm;
  return (
    <Root>
      {investments != null || stakedNfts == null
        ? investments.map((item, index) => (
            <InvestRow
              key={index + "investment"}
              logo={item.logo}
              topLeftInfo={item.name}
              topRightInfo={item.amount}
              bottomRightInfo={item.usdnEquivalent}
              bottomLeftInfo={item.nuclearValue}
            />
          ))
        : Array.from({ length: 2 }).map(() => <InvestRowSkeleton />)}
      {investments != null && investments.length === 0 && (
        <Column justifyContent="center" alignItems="center" crossAxisSize="max">
          <SizedBox height={16} />
          <NotFoundIcon />
          <Text type="secondary" size="medium" textAlign="center">
            You didn’t invest yet. Go to Invest page to provide liquidity and
            get rewards, or stake puzzle on the Stake page.
          </Text>
          <SizedBox height={16} />
          <Link to={accountStore.ROUTES.INVEST}>
            <Button size="medium" kind="secondary">
              Go to Invest
            </Button>
          </Link>
          <SizedBox height={100} />
        </Column>
      )}
    </Root>
  );
};
export default observer(PoolsBalances);
