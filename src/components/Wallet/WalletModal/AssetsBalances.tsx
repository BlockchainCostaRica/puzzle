import React from "react";
import { observer } from "mobx-react-lite";
import TokenInfo from "@screens/TradeInterface/TokenSelectModal/TokenInfo";
import Balance from "@src/entities/Balance";
import { useWalletVM } from "@components/Wallet/WalletModal/WalletVM";

const AssetsBalances: React.FC = () => {
  const vm = useWalletVM();
  return (
    <>
      {vm.balances.map((t) => (
        <TokenInfo key={t.assetId} token={new Balance(t)} />
      ))}
    </>
  );
};
export default observer(AssetsBalances);
