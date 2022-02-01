import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import BN from "@src/utils/BN";
import Balance from "@src/entities/Balance";
import { IPoolStats30Days } from "@stores/PoolsStore";

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

class AddLiquidityInterfaceVM {
  public poolId: string;
  public rootStore: RootStore;
  public baseTokenAmount: BN = BN.ZERO;
  @action.bound public setBaseTokenAmount = (value: BN) =>
    (this.baseTokenAmount = value);

  public stats: IPoolStats30Days | null = null;
  private setStats = (stats: IPoolStats30Days | null) => (this.stats = stats);

  providedPercentOfPool: BN = new BN(50);
  @action.bound setProvidedPercentOfPool = (value: number) =>
    (this.providedPercentOfPool = new BN(value));

  constructor(rootStore: RootStore, poolId: string) {
    this.poolId = poolId;
    this.rootStore = rootStore;
    this.updateStats();
    makeAutoObservable(this);
  }

  public get balances() {
    const { accountStore } = this.rootStore;
    return this.pool?.tokens
      .map((t) => {
        const balance = accountStore.findBalanceByAssetId(t.assetId);
        return balance ?? new Balance(t);
      })
      .sort((a, b) => {
        if (a.usdnEquivalent == null && b.usdnEquivalent == null) return 0;
        if (a.usdnEquivalent == null && b.usdnEquivalent != null) return 1;
        if (a.usdnEquivalent == null && b.usdnEquivalent == null) return -1;
        return a.usdnEquivalent!.lt(b.usdnEquivalent!) ? 1 : -1;
      });
  }

  updateStats = () => {
    this.rootStore.poolsStore
      .get30DaysPoolStats(this.poolId)
      .then((data) => this.setStats(data))
      .catch(() => console.error(`Cannot update stats of ${this.poolId}`));
  };

  public get pool() {
    return this.rootStore.poolsStore.pools.find(({ id }) => id === this.poolId);
  }

  public get baseToken() {
    return this.pool!.getAssetById(this.pool!.baseTokenId)!;
  }

  get minPIssued() {
    if (this.pool == null) return null;

    return BN.min(
      ...this.pool.tokens.map(({ assetId }) => {
        const asset = this.rootStore.accountStore.findBalanceByAssetId(assetId);
        return this.pool!.globalPoolTokenAmount.times(
          asset?.balance ?? BN.ZERO
        ).div(this.pool!.liquidity[assetId]);
      })
    );
  }

  get canMultipleDeposit() {
    return (
      this.tokensToDepositAmounts != null &&
      Object.values(this.tokensToDepositAmounts).every((v) => v.gt(0)) &&
      this.providedPercentOfPool.gt(0)
    );
  }

  get minBalanceAsset(): Balance | null {
    const { accountStore } = this.rootStore;
    if (this.pool == null || accountStore.assetBalances.length === 0)
      return null;
    const balances = accountStore.assetBalances.filter((balance) =>
      this.pool!.tokens.some((t) => t.assetId === balance.assetId)
    );
    return balances.sort((a, b) =>
      a.usdnEquivalent!.gt(b.usdnEquivalent!) ? 1 : -1
    )[0];
  }

  get zeroAssetBalances(): number | null {
    const { accountStore } = this.rootStore;
    if (this.pool == null || accountStore.assetBalances.length === 0)
      return null;
    const balances = accountStore.assetBalances.filter((balance) =>
      this.pool!.tokens.some((t) => t.assetId === balance.assetId)
    );
    return balances.filter(({ balance }) => balance && balance.eq(0)).length;
  }

  get tokensToDepositAmounts(): Record<string, BN> | null {
    if (this.pool == null) return null;

    return this.pool.tokens.reduce<Record<string, BN>>((acc, { assetId }) => {
      const tokenBalance =
        (this.pool && this.pool.liquidity[assetId]) ?? BN.ZERO;
      const dk = this.pool!.globalPoolTokenAmount.plus(
        this.minPIssued ?? BN.ZERO
      )
        .div(this.pool!.globalPoolTokenAmount)
        .minus(new BN(1))
        .times(tokenBalance)
        .times(this.providedPercentOfPool)
        .times(0.01);
      return {
        ...acc,
        [assetId]: dk,
      };
    }, {});
  }

  get baseTokenAmountUsdnEquivalent() {
    if (this.baseToken == null) return "";
    const rate =
      this.rootStore.poolsStore.usdnRate(this.baseToken.assetId, 1) ?? BN.ZERO;
    const value = rate.times(this.baseTokenAmount);
    return "~ " + BN.formatUnits(value, this.baseToken.decimals).toFixed(2);
  }

  get totalAmountToDeposit(): string | null {
    const tokensToDepositAmounts = this.tokensToDepositAmounts;
    if (tokensToDepositAmounts == null || this.pool == null) return null;
    const total = this.pool.tokens.reduce<BN>((acc, token) => {
      const rate =
        this.rootStore.poolsStore.usdnRate(token.assetId, 1) ?? BN.ZERO;
      const balance = tokensToDepositAmounts[token.assetId];
      const usdnEquivalent = BN.formatUnits(
        balance.times(rate),
        token.decimals
      );
      return acc.plus(usdnEquivalent);
    }, BN.ZERO);
    return !total.isNaN() ? "$ " + total.toFormat(2) : null;
  }

  depositMultiply = async () => {
    if (this.pool?.contractAddress == null) {
      // errorMessage({ message: "There is no contract address" });
      return;
    }
    if (
      this.tokensToDepositAmounts == null ||
      this.pool.layer2Address == null
    ) {
      // errorMessage({ message: "There is no tokens to deposit" });
      return;
    }

    const payment = Object.entries(this.tokensToDepositAmounts).reduce(
      (acc, [assetId, value]) => [
        ...acc,
        { assetId, amount: value.toSignificant(0).toString() },
      ],
      [] as Array<{ assetId: string; amount: string }>
    );

    return this.rootStore.accountStore.invoke({
      dApp: this.pool.layer2Address,
      payment,
      call: {
        function: "generateIndexAndStake",
        args: [],
      },
    });
  };

  get baseTokenBalance() {
    return this.rootStore.accountStore.findBalanceByAssetId(
      this.baseToken.assetId
    );
  }

  get canDepositBaseToken(): boolean {
    const asset = this.baseTokenBalance;
    if (asset == null || asset.balance == null) return false;
    if (this.baseTokenAmount.eq(0)) return false;
    return asset.balance?.gt(0.0001) && !asset.balance.lt(this.baseTokenAmount);
  }

  @action.bound onMaxBaseTokenClick = () => {
    const userTokenBalance = this.baseTokenBalance;
    userTokenBalance &&
      userTokenBalance.balance &&
      this.setBaseTokenAmount(userTokenBalance.balance);
  };
  depositBaseToken = async () => {
    if (this.pool?.contractAddress == null || this.pool.layer2Address == null) {
      // errorMessage({ message: "There is no contract address" });
      return;
    }
    return this.rootStore.accountStore.invoke({
      dApp: this.pool.layer2Address,
      payment: [
        {
          assetId: this.baseToken.assetId,
          amount: this.baseTokenAmount.toString(),
        },
      ],
      call: {
        function: "generateIndexWithOneTokenAndStake",
        args: [],
      },
    });
  };
}
