import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { makeAutoObservable, when } from "mobx";
import { RootStore, useStores } from "@stores";
import axios from "axios";
import BN from "@src/utils/BN";
import { IToken } from "@src/constants";
import { errorMessage, successMessage } from "@components/Notifications";

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
type IReward = {
  reward: BN;
  usdEquivalent: BN;
};

class InvestToPoolInterfaceVM {
  public poolId: string;
  public rootStore: RootStore;

  public stats: TStats | null = null;
  private setStats = (stats: TStats | null) => (this.stats = stats);

  public accountLiquidity: string | null = null;
  private setAccountLiquidity = (value: string) =>
    (this.accountLiquidity = value);

  public accountShareOfPool: string | null = null;
  private setAccountShareOfPool = (value: string) =>
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
    this.updateStats().catch(() =>
      console.error(`Cannot update stats of ${this.poolId}`)
    );
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
    const assetBalance = accountStore.assetBalances.find(
      ({ assetId }) => assetId === token.assetId
    );
    const realBalance = assetBalance?.balance ?? BN.ZERO;
    const [
      globalTokenBalance,
      globalLastCheckTokenEarnings,
      globalIndexStaked,
      globalLastCheckTokenInterest,
      userLastCheckTokenInterest,
      userIndexStaked,
    ] = (
      await Promise.all([
        this.pool.contractRequest(`global_${token.assetId}_balance`),
        this.pool.contractRequest(`global_lastCheck_${token.assetId}_earnings`),
        this.pool.contractRequest("global_indexStaked"),
        this.pool.contractRequest(`global_lastCheck_${token.assetId}_interest`),
        this.pool.contractRequest(
          `${address}_lastCheck_${token.assetId}_interest`
        ),
        this.pool.contractRequest(`${address}_indexStaked`),
      ])
    ).map((v) => {
      return v != null && v.length > 0 ? new BN(v[0].value) : BN.ZERO;
    });

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
      .times(BN.formatUnits(userIndexStaked, token.decimals));

    const rate =
      this.rootStore.poolsStore.usdnRate(token.assetId, 1) ?? BN.ZERO;

    const usdEquivalent = rewardAvailable.times(rate);

    return {
      reward: BN.formatUnits(rewardAvailable, token.decimals),
      assetId: token.assetId,
      usdEquivalent: BN.formatUnits(usdEquivalent, token.decimals),
    };
  };

  updateRewardInfo = async () => {
    const rawData = await Promise.all(
      this.pool.tokens.map(this.getTokenRewardInfo)
    );
    const value = rawData.reduce(
      (acc, { reward, assetId, usdEquivalent }) => ({
        ...acc,
        [assetId]: { reward, usdEquivalent },
      }),
      {} as Record<string, IReward>
    );
    const totalReward = rawData.reduce<BN>(
      (acc, { usdEquivalent }) => acc.plus(usdEquivalent),
      BN.ZERO
    );
    this.setTotalRewardToClaim(totalReward);
    this.setRewardToClaim(value);
  };

  get isThereSomethingToClaim() {
    return this.totalRewardToClaim.eq(0);
  }

  claimRewards = async () => {
    if (this.totalRewardToClaim.eq(0)) {
      errorMessage({ message: "There is nothing to claim" });
    }
    return this.rootStore.accountStore.invoke({
      dApp: this.pool.contractAddress,
      payment: [],
      call: {
        function: "claimIndexRewards",
        args: [],
      },
    });
  };
  withdraw = () => {
    successMessage({
      title: "Coming soon",
    });
  };
}
