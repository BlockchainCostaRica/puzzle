import React from "react";
import { observer } from "mobx-react-lite";
import { useWalletVM } from "@components/Wallet/WalletModal/WalletVM";
import InvestRow from "@components/InvestRow";

const AssetsBalances: React.FC = () => {
  const vm = useWalletVM();
  return (
    <>
      {vm.balances.map((t) => (
        <InvestRow
          key={t.assetId}
          logo={t.logo}
          topLeftInfo={t.name}
          topRightInfo={t.formatBalance}
          bottomLeftInfo={t.symbol}
          bottomRightInfo={t.formatUsdnEquivalent}
        />
      ))}
    </>
  );
};
export default observer(AssetsBalances);
