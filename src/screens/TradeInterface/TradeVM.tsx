import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";

const ctx = React.createContext<TradeVM | null>(null);

export const TradeVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new TradeVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useTradeVM = () => useVM(ctx);

class TradeVM {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  swap = async () => {
    return this.rootStore.accountStore.invoke({
      dApp: "",
      payment: [],
      call: {
        function: "swap",
        args: [],
      },
    });
  };

  get cashback() {
    return "0.004";
  }
}
