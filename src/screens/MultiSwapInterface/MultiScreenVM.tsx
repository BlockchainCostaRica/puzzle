import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable } from "mobx";
import { CASHBACK_PERCENT, POOL_ID, SLIPPAGE, tokens } from "@src/constants";
import { RootStore, useStores } from "@stores";
import Balance from "@src/entities/Balance";
import { errorMessage } from "@src/old_components/AuthInterface";
import BN from "@src/utils/BN";

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
    const { token0, balance0 } = this;
    return token0 != null && balance0 != null
      ? () => this.setAmount0(balance0)
      : undefined;
  }

  amount0: BN = BN.ZERO;
  @action.bound setAmount0 = (amount: BN) => (this.amount0 = amount);
  get amount0UsdnEquivalent(): string {
    const { token0 } = this;
    const usdtRate = this.rootStore.poolsStore.usdtRate(this.assetId0, 1);
    if (token0 == null || usdtRate == null) return "–";
    const result = usdtRate.times(
      BN.formatUnits(this.amount0, token0.decimals)
    );
    if (!result.gt(0)) return "–";
    return `~ ${usdtRate
      .times(BN.formatUnits(this.amount0, token0.decimals))
      .toFormat(2)} USDN`;
  }
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
      this.pool?.currentPrice(this.assetId0, this.assetId1)?.toFormat(4) ?? "–"
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
      .sort((a, b) => {
        if (a.usdnEquivalent == null && b.usdnEquivalent == null) return 0;
        if (a.usdnEquivalent == null && b.usdnEquivalent != null) return 1;
        if (a.usdnEquivalent == null && b.usdnEquivalent == null) return -1;
        return a.usdnEquivalent!.lt(b.usdnEquivalent!) ? 1 : -1;
      });
  }

  get amount1() {
    const { pool, token0, token1, amount0 } = this;
    if (pool == null || token1 == null || token0 == null) return BN.ZERO;
    const rate = pool.currentPrice(token0.assetId, token1.assetId);
    const unitAmount0 = BN.formatUnits(amount0, token0.decimals);
    return rate == null
      ? BN.ZERO
      : BN.parseUnits(rate.times(unitAmount0), token1.decimals);
  }

  get amount1UsdnEquivalent(): string {
    const { token1 } = this;
    const usdtRate = this.rootStore.poolsStore.usdtRate(this.assetId1, 1);
    if (token1 == null || usdtRate == null) return "–";
    const result = usdtRate.times(
      BN.formatUnits(this.amount1, token1.decimals)
    );
    if (!result.gt(0)) return "–";
    return `~ ${usdtRate
      .times(BN.formatUnits(this.amount1, token1.decimals))
      .toFormat(2)} USDN`;
  }

  //todo уточнить верно ли что мы в итоге 2 раза умножаем на SLIPPAGE
  get minimumToReceive(): BN {
    return this.amount1.times(SLIPPAGE);
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

    if (!this.token1 || !this.amount1.gt(0) || !this.minimumToReceive) {
      errorMessage("Something wrong with first asset");
      return;
    }

    return this.rootStore.accountStore.invoke({
      dApp: this.pool.contractAddress,
      payment: [
        {
          assetId: this.token0.assetId,
          amount: this.amount0.toString(),
        },
      ],
      call: {
        function: "swap",
        args: [
          { type: "string", value: this.token1.assetId },
          {
            type: "integer",
            value: this.minimumToReceive.toString(),
          },
        ],
      },
    });
  };
  //todo уточнить правильно ли считается кешбек
  get cashback() {
    const { poolsStore } = this.rootStore;
    const puzzlePrice = poolsStore.usdtRate(tokens.PUZZLE.assetId, 1);
    const token0Price = poolsStore.usdtRate(this.assetId0, 1);
    if (puzzlePrice == null || token0Price == null) return null;

    const cashbackAmount = this.amount0
      .times(token0Price)
      .times(CASHBACK_PERCENT)
      .times(SLIPPAGE)
      .div(puzzlePrice);
    return cashbackAmount.isNaN()
      ? null
      : BN.formatUnits(cashbackAmount, tokens.PUZZLE.decimals).toFormat(4);
  }

  get pool() {
    return this.rootStore.poolsStore.getPoolById(this.poolId);
  }
}
