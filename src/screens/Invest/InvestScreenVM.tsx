import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable } from "mobx";
import { CASHBACK_PERCENT, TPoolId, SLIPPAGE, TRADE_FEE } from "@src/constants";
import { RootStore, useStores } from "@stores";
import Balance from "@src/entities/Balance";
import { errorMessage } from "@src/old_components/AuthInterface";
import BN from "@src/utils/BN";

const ctx = React.createContext<InvestVM | null>(null);

export const InvestVMProvider: React.FC<{ poolId: TPoolId }> = ({
  poolId,
  children,
}) => {
  const store = useMemo(() => new InvestVM(), [poolId]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useInvestVM = () => useVM(ctx);

class InvestVM {
  constructor() {
    makeAutoObservable(this);
  }
}
