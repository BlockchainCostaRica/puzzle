import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { makeAutoObservable, when } from "mobx";
import { RootStore, useStores } from "@stores";
import axios from "axios";
import BN from "@src/utils/BN";
import { IToken } from "@src/constants";

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

  public accountLiquidity: string | null = null;
  private setAccountLiquidity = (value: string) =>
    (this.accountLiquidity = value);

  public accountShareOfPool: string | null = null;
  private setAccountShareOfPool = (value: string) =>
    (this.accountShareOfPool = value);

  public rewardsToClaim: any[] | null = null;
  private setRewardToClaim = (value: []) => (this.rewardsToClaim = value);

  constructor(rootStore: RootStore, poolId: string) {
    this.poolId = poolId;
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.updateStats().catch(() =>
      console.error(`Cannot update stats of ${this.poolId}`)
    );
    when(() => rootStore.accountStore.address !== null, this.updateRewardInfo);
    this.updateAccountLiquidityInfo().then();
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

  tokenRewardInfo = async (token: IToken) => {
    const assetBalance = this.rootStore.accountStore.assetBalances.find(
      ({ assetId: id }) => id === token.assetId
    );
    const realBalance = assetBalance && assetBalance.balance;

    const tokenLiquidity = this.pool.liquidity[token.assetId];

    const { address } = this.rootStore.accountStore;
    const [
      global_lastCheck_tokenId_earnings,
      global_IndexStaked,
      global_lastCheck_tokenId_interest,
      user_lastCheck_tokenId_interest,
      user_indexStaked,
    ] = await Promise.all([
      this.pool.contractRequest(`global_${token.assetId}_balance`),
      this.pool.contractRequest("global_indexStaked"),
      this.pool.contractRequest(`global_lastCheck_${token.assetId}_interest`),
      this.pool.contractRequest(
        `${address}_lastCheck_${token.assetId}_interest`
      ),
      this.pool.contractRequest(`${address}_indexStaked`),
    ]);

    const globalLastCheckTokenIdEarnings = global_lastCheck_tokenId_earnings
      ? new BN(global_lastCheck_tokenId_earnings[0].value)
      : BN.ZERO;
    const globalIndexStaked = global_IndexStaked
      ? new BN(global_IndexStaked[0].value)
      : BN.ZERO;
    const userLastCheckTokenIdInterest = user_lastCheck_tokenId_interest
      ? new BN(user_lastCheck_tokenId_interest[0].value)
      : BN.ZERO;
    const userIndexStaked = user_indexStaked
      ? new BN(user_indexStaked[0].value)
      : BN.ZERO;

    if (
      tokenLiquidity == null ||
      realBalance == null ||
      global_lastCheck_tokenId_earnings == null ||
      global_IndexStaked == null ||
      global_lastCheck_tokenId_interest == null ||
      user_lastCheck_tokenId_interest == null ||
      user_indexStaked == null
    ) {
      return BN.ZERO.toString();
    }
    const newEarnings = BN.max(
      realBalance.minus(tokenLiquidity),
      globalLastCheckTokenIdEarnings
    ).minus(globalLastCheckTokenIdEarnings);

    const currentInterest = new BN(
      globalIndexStaked.eq(0) ? BN.ZERO : userLastCheckTokenIdInterest
    ).plus(newEarnings.div(globalIndexStaked));

    const rewardAvailable = userIndexStaked.times(
      currentInterest.minus(userLastCheckTokenIdInterest)
    );
    return BN.parseUnits(rewardAvailable, token.decimals);
  };
  updateRewardInfo = async () => {
    console.log("updateRewardInfo");
    const data = await Promise.all(
      this.pool.tokens.map((token) => this.tokenRewardInfo(token))
    );
    console.log(data);
  };

  calculateRewardsToClaim = async () => {};
}
