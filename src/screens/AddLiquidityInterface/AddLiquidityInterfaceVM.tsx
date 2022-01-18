import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import BN from "@src/utils/BN";

const ctx = React.createContext<AddLiquidityInterfaceVM | null>(null);

export const AddLiquidityInterfaceVMProvider: React.FC<{ poolId: string }> = ({
  poolId,
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(
    () => new AddLiquidityInterfaceVM(rootStore, poolId),
    [rootStore, poolId]
  );
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useAddLiquidityInterfaceVM = () => useVM(ctx);

class AddLiquidityInterfaceVM {
  public poolId: string;
  public rootStore: RootStore;
  public baseTokenAmount: BN = BN.ZERO;
  @action.bound public setBaseTokenAmount = (value: BN) =>
    (this.baseTokenAmount = value);

  constructor(rootStore: RootStore, poolId: string) {
    this.poolId = poolId;
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public get pool() {
    return this.rootStore.poolsStore.pools.find(({ id }) => id === this.poolId);
  }
  public get baseToken() {
    return this.pool!.getAssetById(this.pool!.baseTokenId)!;
  }

  calculateDepositValue() {
    // return (
    //     Math.floor(
    //         (100 *
    //             Number(this.state.percentage) *
    //             0.01 *
    //             this.calculateLiquidity() *
    //             Number(this.state.minPIssued)) /
    //         Number(this.state.poolState.get("global_poolToken_amount"))
    //     ) / 100
    // );
  }
}
