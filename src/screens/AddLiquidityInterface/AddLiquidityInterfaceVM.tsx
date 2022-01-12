import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";

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
  constructor(rootStore: RootStore, poolId: string) {
    this.poolId = poolId;
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
  public get pool() {
    return this.rootStore.poolsStore.pools.find(({ id }) => id === this.poolId);
  }
}
