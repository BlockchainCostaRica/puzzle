import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { makeAutoObservable, when } from "mobx";
import { RootStore, useStores } from "@stores";
import BN from "@src/utils/BN";
import { IToken } from "@src/constants";
import { errorMessage } from "@components/Notifications";
import { PoolStats30Days } from "@stores/PoolsStore";

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

type IReward = {
  reward: BN;
  usdEquivalent: BN;
};

class InvestToPoolInterfaceVM {
  public poolId: string;
  public rootStore: RootStore;

  public stats: PoolStats30Days | null = null;
  private setStats = (stats: PoolStats30Days | null) => (this.stats = stats);

  public accountLiquidity: BN | null = null;
  private setAccountLiquidity = (value: BN) => (this.accountLiquidity = value);

  public accountShareOfPool: BN | null = null;
  private setAccountShareOfPool = (value: BN) =>
    (this.accountShareOfPool = value);

  public rewardsToClaim: Record<string, IReward> | null = null;
  private setRewardToClaim = (value: Record<string, IReward>) =>
    (this.rewardsToClaim = value);

  public totalRewardToClaim: BN = BN.ZERO;
  private setTotalRewardToClaim = (value: BN) =>
    (this.totalRewardToClaim = value);

  constructor(rootStore: RootStore, poolId: string) {
    this.poolId = poolId;
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.updateStats();
    when(
      () => rootStore.accountStore.address != null,
      this.updateAccountLiquidityInfo
    );
    when(() => rootStore.accountStore.address != null, this.updateRewardInfo);
  }

  public get pool() {
    return this.rootStore.poolsStore.pools.find(
      ({ id }) => id === this.poolId
    )!;
  }

  updateStats = () => {
    this.rootStore.poolsStore
      .get30DaysPoolStats(this.poolId)
      .then((data) => this.setStats(data))
      .catch(() => console.error(`Cannot update stats of ${this.poolId}`));
  };

  updateAccountLiquidityInfo = async () => {
    if (this.rootStore.accountStore.address) {
      const info = await this.pool.getAccountLiquidityInfo(
        this.rootStore.accountStore.address
      );
      this.setAccountShareOfPool(info.percent);
      this.setAccountLiquidity(info.liquidity);
    }
  };

  getTokenRewardInfo = async (
    token: IToken
  ): Promise<IReward & { assetId: string }> => {
    const { accountStore } = this.rootStore;
    const { address } = accountStore;
    const assetBalance = accountStore.findBalanceByAssetId(token.assetId);
    const realBalance = assetBalance?.balance ?? BN.ZERO;

    const [globalValues, addressValues] = await Promise.all([
      this.pool.contractRequest(`global_(.*)`),
      this.pool.contractRequest(`${address}_(.*)`),
    ]);

    const keysArray = {
      globalTokenBalance: `global_${token.assetId}_balance`,
      globalLastCheckTokenEarnings: `global_lastCheck_${token.assetId}_earnings`,
      globalIndexStaked: "global_indexStaked",
      globalLastCheckTokenInterest: `global_lastCheck_${token.assetId}_interest`,
      userLastCheckTokenInterest: `${address}_lastCheck_${token.assetId}_interest`,
      userIndexStaked: `${address}_indexStaked`,
    };

    const parsedNodeResponse = [
      ...(globalValues ?? []),
      ...(addressValues ?? []),
    ].reduce<Record<string, BN>>((acc, { key, value }) => {
      Object.entries(keysArray).forEach(([regName, regValue]) => {
        const regexp = new RegExp(regValue);
        if (regexp.test(key)) {
          acc[regName] = new BN(value);
        }
      });
      return acc;
    }, {});

    const globalTokenBalance = parsedNodeResponse["globalTokenBalance"];
    const globalLastCheckTokenEarnings =
      parsedNodeResponse["globalLastCheckTokenEarnings"];
    const globalIndexStaked = parsedNodeResponse["globalIndexStaked"];
    const globalLastCheckTokenInterest =
      parsedNodeResponse["globalLastCheckTokenInterest"];
    const userLastCheckTokenInterest =
      parsedNodeResponse["userLastCheckTokenInterest"];
    const userIndexStaked = parsedNodeResponse["userIndexStaked"];

    const newEarnings = BN.max(
      realBalance.minus(globalTokenBalance),
      globalLastCheckTokenEarnings
    ).minus(globalLastCheckTokenEarnings);

    const lastCheckInterest = globalIndexStaked.eq(0)
      ? BN.ZERO
      : globalLastCheckTokenInterest;

    const currentInterest = lastCheckInterest.plus(
      newEarnings.div(globalIndexStaked)
    );

    const lastCheckUserInterest = userLastCheckTokenInterest
      ? userLastCheckTokenInterest
      : BN.ZERO;

    const rewardAvailable = currentInterest
      .minus(lastCheckUserInterest)
      .times(BN.formatUnits(userIndexStaked, 8));

    const rate =
      this.rootStore.poolsStore.usdnRate(token.assetId, 1) ?? BN.ZERO;

    const usdEquivalent = rewardAvailable.times(rate);

    return {
      reward: rewardAvailable.isNaN()
        ? BN.ZERO
        : BN.formatUnits(rewardAvailable, token.decimals),
      assetId: token.assetId,
      usdEquivalent: BN.formatUnits(usdEquivalent, token.decimals),
    };
  };

  updateRewardInfo = async () => {
    const rawData = await Promise.all(
      this.pool.tokens.map(this.getTokenRewardInfo)
    );

    let rewardInfo = {};
    let totalRewardAmount = BN.ZERO;

    rawData.forEach(({ reward, assetId, usdEquivalent }) => {
      totalRewardAmount = totalRewardAmount.plus(usdEquivalent);
      rewardInfo = { ...rewardInfo, [assetId]: { reward, usdEquivalent } };
    });
    this.setTotalRewardToClaim(totalRewardAmount);
    this.setRewardToClaim(rewardInfo);
  };

  get isThereSomethingToClaim() {
    return this.totalRewardToClaim.eq(0);
  }

  get poolCompositionValues() {
    if (this.pool.tokens == null) return [];
    return this.pool.tokens.reduce<
      (IToken & { value: BN; parsedBalance: BN })[]
    >((acc, token) => {
      const balance = BN.formatUnits(
        this.pool.liquidity[token.assetId] ?? BN.ZERO,
        token.decimals
      );
      const rate = this.pool.currentPrice(
        token.assetId,
        this.rootStore.accountStore.TOKENS.USDN.assetId
      );
      return [
        ...acc,
        {
          ...token,
          value: balance.times(rate ?? 0),
          parsedBalance: balance,
        },
      ];
    }, []);
  }

  claimRewards = async () => {
    if (this.totalRewardToClaim.eq(0)) {
      errorMessage({ message: "There is nothing to claim" });
      return;
    }
    if (this.pool.layer2Address == null) {
      errorMessage({ message: "There is nothing to claim" });
      return;
    }
    return this.rootStore.accountStore.invoke({
      dApp: this.pool.layer2Address,
      payment: [],
      call: {
        function: "claimIndexRewards",
        args: [],
      },
    });
  };

  get isThereRewardToClaim() {
    if (this.accountLiquidity == null) return false;
    return !this.accountLiquidity.eq(0);
  }
}
