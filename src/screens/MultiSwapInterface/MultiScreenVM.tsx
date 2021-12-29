import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable } from "mobx";
import { CASHBACK_PERCENT, TPoolId, SLIPPAGE, TRADE_FEE } from "@src/constants";
import { RootStore, useStores } from "@stores";
import Balance from "@src/entities/Balance";
import { errorMessage } from "@src/old_components/AuthInterface";
import BN from "@src/utils/BN";

const ctx = React.createContext<MultiSwapVM | null>(null);

export const MultiSwapVMProvider: React.FC<{ poolId: TPoolId }> = ({
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
  constructor(private rootStore: RootStore, public readonly poolId: TPoolId) {
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
    const usdnRate = this.rootStore.poolsStore.usdnRate(this.assetId0, 1);
    if (token0 == null || usdnRate == null) return "–";
    const result = usdnRate.times(
      BN.formatUnits(this.amount0, token0.decimals)
    );
    if (!result.gt(0)) return "–";
    return `~ ${usdnRate
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
    return this.pool?.currentPrice(this.assetId0, this.assetId1) ?? BN.ZERO;
  }

  get priceImpact() {
    const topValue = this.rate;
    const bottomValue = BN.formatUnits(this.amount1, this.token1?.decimals)
      .times(SLIPPAGE)
      .div(BN.formatUnits(this.amount0, this.token0?.decimals));
    let priceImpact = topValue.div(bottomValue).minus(1).times(100);
    if (priceImpact.isNaN()) priceImpact = BN.ZERO;
    if (priceImpact.gt(100)) priceImpact = new BN(100);
    return (priceImpact.isNaN() ? BN.ZERO : priceImpact).toFormat(4);
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
    const { liquidityOfToken0: l0, liquidityOfToken1: l1 } = this;
    const { token1, token0, amount0 } = this;
    if (l0 == null || l1 == null || token1 == null || token0 == null) {
      return BN.ZERO;
    }
    const share0 = new BN(token0.shareAmount);
    const share1 = new BN(token1.shareAmount);

    try {
      const leftPart = BN.formatUnits(l1, token1.decimals);

      const power = share0.div(share1).toSignificant(8).toNumber();
      const base = l0.div(l0.plus(amount0)).toNumber();
      const rightPart = new BN(1).minus(Math.pow(base, power));

      return BN.parseUnits(
        leftPart.times(rightPart).times(SLIPPAGE),
        token1.decimals
      );
    } catch (e) {
      return BN.ZERO;
    }
  }

  get amount1UsdnEquivalent(): string {
    const { token1 } = this;
    const usdnRate = this.rootStore.poolsStore.usdnRate(this.assetId1, 1);
    if (token1 == null || usdnRate == null) return "–";
    const result = usdnRate.times(
      BN.formatUnits(this.amount1, token1.decimals)
    );
    if (!result.gt(0)) return "–";
    return `~ ${usdnRate
      .times(BN.formatUnits(this.amount1, token1.decimals))
      .toFormat(2)} USDN`;
  }

  get minimumToReceive(): BN {
    return this.amount1.times(TRADE_FEE);
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
            value: this.minimumToReceive.toFixed(0).toString(),
          },
        ],
      },
    });
  };

  get cashback() {
    const { poolsStore, accountStore } = this.rootStore;
    const puzzleAssetId = accountStore.TOKENS.PUZZLE.assetId;
    const puzzlePrice = poolsStore.usdnRate(puzzleAssetId, 1);
    const token0Price = poolsStore.usdnRate(this.assetId0, 1);
    if (puzzlePrice == null || token0Price == null) return null;

    const cashbackAmount = this.amount0
      .times(token0Price)
      .times(CASHBACK_PERCENT)
      .times(SLIPPAGE)
      .div(puzzlePrice);
    return cashbackAmount.isNaN()
      ? null
      : BN.formatUnits(
          cashbackAmount,
          this.rootStore.accountStore.TOKENS.PUZZLE.decimals
        ).toFormat(4);
  }

  get pool() {
    return this.rootStore.poolsStore.getPoolById(this.poolId);
  }
}
