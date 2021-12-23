import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { RootStore, useStores } from "@stores";
import { makeAutoObservable } from "mobx";

const ctx = React.createContext<MultiSwapVM | null>(null);

export const MultiSwapVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new MultiSwapVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useMultiSwapVM = () => useVM(ctx);

class MultiSwapVM {
  initialized: boolean = false;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  init = async () => {
    this.initialized = false;
    console.log("initialized");
  };
}
