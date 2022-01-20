import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import BN from "@src/utils/BN";
import axios from "axios";

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

type TStats = {
  apy: number;
  fees: number;
  liquidity: number;
  monthly_volume: number;
  volume: { date: number; volume: number }[];
};

class AddLiquidityInterfaceVM {
  public poolId: string;
  public rootStore: RootStore;
  public baseTokenAmount: BN = BN.ZERO;
  @action.bound public setBaseTokenAmount = (value: BN) =>
    (this.baseTokenAmount = value);

  public stats: TStats | null = null;
  private setStats = (stats: TStats | null) => (this.stats = stats);

  constructor(rootStore: RootStore, poolId: string) {
    this.poolId = poolId;
    this.rootStore = rootStore;
    this.updateStats().catch(() =>
      console.error(`Cannot update stats of ${this.poolId}`)
    );
    makeAutoObservable(this);
  }

  updateStats = () =>
    axios
      .get(`https://puzzleback.herokuapp.com/stats/${this.poolId}/30d`)
      .then(({ data }) => this.setStats(data));

  public get poolStats() {
    const { apy, monthly_volume, liquidity } = this.stats ?? {};
    return {
      apy: apy ? new BN(apy).toFormat(4).concat("%") : "–",
      monthlyVolume: monthly_volume ? new BN(monthly_volume).toFormat(1) : "–",
      liquidity: liquidity ? new BN(liquidity).toFormat(4) : "–",
    };
  }

  public get pool() {
    return this.rootStore.poolsStore.pools.find(({ id }) => id === this.poolId);
  }

  public get baseToken() {
    return this.pool!.getAssetById(this.pool!.baseTokenId)!;
  }

  // 1- userTokenIdBalance = баланс пользователя токенов tokenId
  // 2- найти значение maxIssuePossible(tokenId)
  // = global_poolToken_amount * userTokenIdBalance / global_tokenId_balance
  // 3- найти минимальное из maxIssuePossible - это будет число индекс токенов, которые пользователь выпустит при значении ползунка 100%
  //
  // George Ilushenko, [19 янв. 2022 г., 08:11:20]:
  // я теперь ...
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
