import React from "react";
import { useWalletVM } from "@components/Wallet/WalletModal/WalletVM";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";
import InvestRow from "@src/components/InvestRow";

interface IProps {}

const PoolsBalances: React.FC<IProps> = () => {
  const vm = useWalletVM();
  const { poolsStore } = useStores();
  return (
    <>
      {poolsStore.pools.map((pool) => {
        // const r = vm.poolsLiquidity && vm.poolsLiquidity[pool.id];
        // console.log(r?.toSignificant(2));
        return (
          <InvestRow
            key={pool.id}
            logo={pool.logo}
            topLeftInfo={pool.name}
            // topRightInfo={"123.112 DEFI-lp"}
            // bottomLeftInfo={"$ 26.89  -1.23%"}
            // bottomRightInfo={"$ 3,952.00"}
          />
        );
      })}
    </>
  );
};
export default observer(PoolsBalances);
