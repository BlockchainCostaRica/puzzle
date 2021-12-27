import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable } from "mobx";
import { POOL_ID, tokens } from "@src/constants";
import { RootStore, useStores } from "@stores";
import BigNumber from "bignumber.js";
import Balance from "@src/entities/Balance";
import { errorMessage } from "@src/old_components/AuthInterface";

const SLIPPAGE = 0.98; //if puzzle slippage = 0
const CASHBACK_PERCENT = 0.004;
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

  get balance0() {
    return this.balances?.find((b) => b.assetId === this.assetId0)?.balance;
  }

  get amount0MaxClickFunc(): (() => void) | undefined {
    return this.token0 != null && this.balance0 != null
      ? () => this.setAmount0(this.balance0!.div(this.token0!.decimals))
      : undefined;
  }

  amount0: BigNumber = new BigNumber(0);
  @action.bound setAmount0 = (amount: BigNumber) => (this.amount0 = amount);
  get liquidityOfToken0() {
    return this.pool?.liquidity[this.assetId0];
  }

  assetId1: string = this.pool?.defaultAssetId1!;
  @action.bound setAssetId1 = (assetId: string) => (this.assetId1 = assetId);
  get token1() {
    return this.pool?.tokens.find(({ assetId }) => assetId === this.assetId1);
  }
  get liquidityOfToken1() {
    return this.pool?.liquidity[this.assetId1];
  }

  get rate() {
    return (
      this.pool?.currentPrice(this.assetId0, this.assetId1)?.toFormat(8) ?? "–"
    );
  }

  switchTokens = () => {
    const assetId0 = this.assetId0;
    this.setAssetId0(this.assetId1);
    this.setAssetId1(assetId0);
  };

  get balances() {
    return this.pool?.tokens
      .map((t) => {
        const balance = this.rootStore.accountStore.assetBalances.find(
          (b) => t.assetId === b.assetId
        );
        return balance ?? new Balance(t);
      })
      .sort((a, b) => (a.gt(b) ? -1 : 1));
  }

  get amount1() {
    return (
      (this.liquidityOfToken1! / this.token1!.decimals) *
      (1 -
        (this.liquidityOfToken0! /
          (this.liquidityOfToken0! +
            this.token0!.decimals * this.amount0.toNumber())) **
          (this.token0!.shareAmount / this.token1!.shareAmount))
    );
  }
  get minimumToReceive() {
    return !isNaN(this.amount1)
      ? Math.floor(this.amount1 * this.token1!.decimals * SLIPPAGE) /
          this.token1!.decimals
      : null;
  }

  swap = async () => {
    if (this.pool?.contractAddress == null) {
      errorMessage("There is no contract address");
      return;
    }

    if (this.token0 == null || this.amount0.eq(0)) {
      errorMessage("Something wrong with first asset");
      return;
    }

    if (!this.token1 || this.amount1 === 0 || !this.minimumToReceive) {
      errorMessage("Something wrong with first asset");
      return;
    }

    return this.rootStore.accountStore.invoke({
      dApp: this.pool.contractAddress,
      payment: [
        {
          assetId: this.token0.assetId,
          amount: this.amount0.times(this.token0.decimals).toString(),
        },
      ],
      call: {
        function: "swap",
        args: [
          { type: "string", value: this.token1.assetId },
          {
            type: "integer",
            value: (this.minimumToReceive * this.token1.decimals).toString(),
          },
        ],
      },
    });
  };

  get cashback() {
    const { poolsStore } = this.rootStore;
    const puzzlePrice = poolsStore.usdtRate(tokens.PUZZLE.assetId, 1);
    const token0Price = poolsStore.usdtRate(this.assetId0, 1);
    if (puzzlePrice == null || token0Price == null) return null;

    const cashbackAmount = this.amount0
      .times(CASHBACK_PERCENT)
      .times(token0Price)
      .times(1000 * 0.96)
      .div(puzzlePrice)
      .div(1000);
    return cashbackAmount.isNaN() ? null : cashbackAmount.toFormat(4);
  }

  get pool() {
    return this.rootStore.poolsStore.getPoolById(this.poolId);
  }
}
