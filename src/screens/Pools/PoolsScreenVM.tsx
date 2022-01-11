import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";

const ctx = React.createContext<PoolsVM | null>(null);

export const PoolsVMProvider: React.FC<{ poolId: string }> = ({
  poolId,
  children,
}) => {
  const store = useMemo(() => new PoolsVM(), [poolId]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const usePoolsVM = () => useVM(ctx);

class PoolsVM {
  constructor() {
    makeAutoObservable(this);
  }
}
