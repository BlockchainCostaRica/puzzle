import React from "react";
import { observer } from "mobx-react-lite";
import InvestRow, { InvestRowSkeleton } from "@src/components/InvestRow";
import { useWalletVM } from "@components/Wallet/WalletModal/WalletVM";

interface IProps {}

const PoolsBalances: React.FC<IProps> = () => {
  const vm = useWalletVM();
  const { stakedNfts, investments, poolsLiquidity } = vm;
  return (
    <>
      {poolsLiquidity != null || stakedNfts == null
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
    </>
  );
};
export default observer(PoolsBalances);
