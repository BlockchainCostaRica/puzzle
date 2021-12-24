import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable } from "mobx";
import { POOL_ID } from "@src/constants";
import { RootStore, useStores } from "@stores";
import BigNumber from "bignumber.js";

const SLIPPAGE = 0.95; //if puzzle slippage = 0
// const CASHBACK_PERCENT = 0.004;
const ctx = React.createContext<MultiSwapVM | null>(null);

export const MultiSwapVMProvider: React.FC<{ poolId: POOL_ID }> = ({
  poolId,
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(
    () => new MultiSwapVM(rootStore, poolId),
    [rootStore, poolId]
  );
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useMultiSwapVM = () => useVM(ctx);

class MultiSwapVM {
  constructor(private rootStore: RootStore, public readonly poolId: POOL_ID) {
    makeAutoObservable(this);
  }
  assetId0: string = this.pool?.defaultAssetId0!;
  @action.bound setAssetId0 = (assetId: string) => (this.assetId0 = assetId);
  get token0() {
    return this.pool?.tokens.find(({ assetId }) => assetId === this.assetId0);
  }

  amount0: BigNumber = new BigNumber(0);
  @action.bound setAmount0 = (amount: BigNumber) => (this.amount0 = amount);
  get poolBalanceOfToken0() {
    return this.pool?.balances[this.assetId0];
  }

  assetId1: string = this.pool?.defaultAssetId1!;
  @action.bound setAssetId1 = (assetId: string) => (this.assetId1 = assetId);
  get token1() {
    return this.pool?.tokens.find(({ assetId }) => assetId === this.assetId1);
  }
  get poolBalanceOfToken1() {
    return this.pool?.balances[this.assetId1];
  }

  switchTokens = () => {
    const assetId0 = this.assetId0;
    this.setAssetId0(this.assetId1);
    this.setAssetId1(assetId0);
  };

  get amount1() {
    return (
      (this.poolBalanceOfToken1! / this.token1!.decimals) *
      (1 -
        (this.poolBalanceOfToken0! /
          (this.poolBalanceOfToken0! +
            this.token0!.decimals * this.amount0.toNumber())) **
          (this.token0!.shareAmount / this.token1!.shareAmount))
    );
  }
  get minimumToReceive() {
    return !isNaN(this.amount1)
      ? Math.floor(this.amount1 * this.token1!.decimals * SLIPPAGE) /
          this.token1!.decimals
      : "–";
  }

  // get cashback() {
  //   const calculateCurrentPrice = (t0: ITokenConfig, t1: ITokenConfig, coef = 0.98) =>
  //     Math.round(
  //       (coef * (10000 * (getBalanceByToken(t0) / t0.weight / t0.decimals))) /
  //         (10000 * (getBalanceByToken(t1) / t1.weight / t1.decimals))
  //     ) / 10000;
  //
  //   const puzzlePrice = calculateCurrentPrice(
  //     { id: "usdnId", decimals: 1e6, weight: 0.1 },
  //     { id: "puzzleId", decimals: 1e8, weight: 0.1 },
  //     1
  //   );
  //
  //   let cashbackAmount =
  //     amount0 *
  //     CASHBACK_PERCENT *
  //     calculateCurrentPrice(
  //       { id: "usdnId", decimals: 1e8, weight: 0.1 },
  //       token0,
  //       1
  //     );
  //   return Math.floor((1000 * 0.96 * cashbackAmount) / puzzlePrice) / 1000;
  // }

  get pool() {
    return this.rootStore.poolsStore.getPoolById(this.poolId);
  }
}
