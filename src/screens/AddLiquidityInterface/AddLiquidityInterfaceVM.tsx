import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import BN from "@src/utils/BN";
import axios from "axios";
import { errorMessage } from "@src/old_components/AuthInterface";
import Balance from "@src/entities/Balance";

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

  public tokensToDepositAmounts: Record<string, BN> | null = null;
  @action.bound setTokensToDepositAmounts = (value: Record<string, BN>) =>
    (this.tokensToDepositAmounts = value);

  providedPercentOfPool: BN = new BN(50);
  @action.bound setProvidedPercentOfPool = (value: number) =>
    (this.providedPercentOfPool = new BN(value));

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

  get possibleToMultipleDeposit() {
    if (this.tokensToDepositAmounts == null) return false;
    if (this.providedPercentOfPool.eq(0)) return false;
    if (Object.values(this.tokensToDepositAmounts).some((v) => v.eq(0)))
      return false;
    return true;
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

  calculateAmountsToDeposit(): Record<string, BN> | null {
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

  get totalAmountToDeposit(): string {
    const value = this.calculateAmountsToDeposit();
    if (value == null || this.pool == null) return "null";
    this.setTokensToDepositAmounts(value);
    const total = this.pool.tokens.reduce<BN>((acc, token) => {
      const rate =
        this.rootStore.poolsStore.usdnRate(token.assetId, 1) ?? BN.ZERO;
      const balance = value[token.assetId];
      const usdnEquivalent = BN.formatUnits(
        balance.times(rate),
        token.decimals
      );
      return acc.plus(usdnEquivalent);
    }, BN.ZERO);
    return !total.eq(0) ? "$ " + total.toFormat(2) : "";
  }

  depositMultiply = async () => {
    if (this.pool?.contractAddress == null) {
      errorMessage("There is no contract address");
      return;
    }
    if (this.tokensToDepositAmounts == null) {
      errorMessage("There is no tokens to deposit");
      return;
    }

    const payment = Object.entries(this.tokensToDepositAmounts).reduce<
      { assetId: string; amount: string }[]
    >(
      (acc, [assetId, value]) => [
        ...acc,
        {
          assetId,
          amount: value.toString(),
        },
      ],
      []
    );

    return this.rootStore.accountStore.invoke({
      dApp: this.pool.contractAddress,
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
    if (asset == null) return false;
    if (asset.balance?.lt(0.0001)) return false;
    return asset.balance ? asset.balance.lt(this.baseTokenAmount) : false;
  }

  @action.bound onMaxBaseTokenClick = () => {
    const userTokenBalance = this.baseTokenBalance;
    userTokenBalance &&
      userTokenBalance.balance &&
      this.setBaseTokenAmount(userTokenBalance.balance);
  };
  depositOneToken = async () => {
    if (this.pool?.contractAddress == null) {
      errorMessage("There is no contract address");
      return;
    }
    return this.rootStore.accountStore.invoke({
      dApp: this.pool.contractAddress,
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
