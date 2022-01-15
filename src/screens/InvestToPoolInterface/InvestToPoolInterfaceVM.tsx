import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import axios from "axios";
import BN from "@src/utils/BN";

const ctx = React.createContext<InvestToPoolInterfaceVM | null>(null);

export const InvestToPoolInterfaceVMProvider: React.FC<{ poolId: string }> = ({
  poolId,
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(
    () => new InvestToPoolInterfaceVM(rootStore, poolId),
    [rootStore, poolId]
  );
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useInvestToPoolInterfaceVM = () => useVM(ctx);

type TStats = {
  apy: number;
  fees: number;
  liquidity: number;
  monthly_volume: number;
  volume: { date: number; volume: number }[];
};

class InvestToPoolInterfaceVM {
  public poolId: string;
  public rootStore: RootStore;
  public stats: TStats | null = null;
  private setStats = (stats: TStats | null) => (this.stats = stats);

  constructor(rootStore: RootStore, poolId: string) {
    this.poolId = poolId;
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.updateStats().catch(() =>
      console.error(`Cannot update stats of ${this.poolId}`)
    );
  }

  public get pool() {
    return this.rootStore.poolsStore.pools.find(
      ({ id }) => id === this.poolId
    )!;
  }

  updateStats = () =>
    axios
      .get(`https://puzzleback.herokuapp.com/stats/${this.poolId}/30d`)
      .then(({ data }) => this.setStats(data));

  public get poolStats(): {
    apy: string;
    monthlyVolume: string;
    liquidity: string;
  } {
    if (this.stats == null)
      return {
        apy: "-",
        monthlyVolume: "-",
        liquidity: "-",
      };
    return {
      apy: new BN(this.stats?.apy ?? "").toFormat(4).concat("%"),
      monthlyVolume: new BN(this.stats?.monthly_volume ?? "").toFormat(1),
      liquidity: new BN(this.stats?.liquidity ?? "").toFormat(4),
    };
  }
}
