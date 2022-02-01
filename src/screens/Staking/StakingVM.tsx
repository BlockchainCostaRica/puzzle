import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import { mainnetTokens } from "@src/constants/mainnetConfig";
import BN from "@src/utils/BN";

const ctx = React.createContext<StakingVM | null>(null);

export const StakingVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new StakingVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useStakingVM = () => useVM(ctx);

class StakingVM {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  public puzzleAmount: BN = BN.ZERO;
  @action.bound public setPuzzleAmount = (value: BN) =>
    (this.puzzleAmount = value);

  public get puzzleToken() {
    return this.rootStore.accountStore.findBalanceByAssetId(
      mainnetTokens.PUZZLE.assetId
    );
  }
}
