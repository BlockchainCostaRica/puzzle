import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable } from "mobx";
import { POOL_ID } from "@src/constants";
import { RootStore, useStores } from "@stores";
import BigNumber from "bignumber.js";

const ctx = React.createContext<MultiSwapVM | null>(null);

export const MultiSwapVMProvider: React.FC<{ poolId: POOL_ID }> = ({
  poolId,
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(() => new MultiSwapVM(rootStore, poolId), [poolId]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useMultiSwapVM = () => useVM(ctx);

class MultiSwapVM {
  constructor(private rootStore: RootStore, public readonly poolId: POOL_ID) {
    makeAutoObservable(this);
  }
  assetId0: string = this.pool?.defaultAssetId0!;
  @action.bound setAssetId0 = (assetId: string) => (this.assetId0 = assetId);

  amount0: BigNumber = new BigNumber(0);
  @action.bound setAmount0 = (amount: BigNumber) => (this.amount0 = amount);

  assetId1: string = this.pool?.defaultAssetId1!;
  @action.bound setAssetId1 = (assetId: string) => (this.assetId1 = assetId);

  get amount1() {
    return new BigNumber(0);
  }

  get pool() {
    return this.rootStore.poolsStore.getPoolById(this.poolId);
  }
}
