import { RootStore } from "./index";
import { action, makeAutoObservable, reaction } from "mobx";
import Pool from "@src/entities/Pool";
import { TPoolId } from "@src/constants";
import BN from "@src/utils/BN";
import statsService, {
  IPoolVolume,
  IStatsPoolItemResponse,
} from "@src/services/statsService";

export interface IStatsPoolItem {
  apy: BN;
  liquidity: BN;
  monthly_volume: BN;
}

export interface IPoolStats30Days extends IStatsPoolItem {
  fees: BN;
  volume: IPoolVolume[];
}

export default class PoolsStore {
  public rootStore: RootStore;
  pools: Pool[] = [];
  @action.bound setPools = (pools: Pool[]) => (this.pools = pools);
  getPoolById = (id: TPoolId) => this.pools.find((pool) => pool.id === id);

  public poolsStats: Record<string, IStatsPoolItem> | null = null;
  private setPoolStats = (value: Record<string, IStatsPoolItem>) =>
    (this.poolsStats = value);

  findPoolStatsByPoolId = (poolId: string) =>
    this.poolsStats && this.poolsStats[poolId];

  get liquidity(): Record<string, BN> {
    return this.pools.reduce<Record<string, BN>>(
      (acc, pool) => ({ ...acc, ...pool.liquidity }),
      {}
    );
  }

  get globalVolume(): BN {
    return this.pools.reduce(
      (acc, pool) => acc.plus(pool.globalVolume ?? BN.ZERO),
      BN.ZERO
    );
  }

  usdnRate = (assetId: string, coefficient = 0.98): BN | null => {
    const pool = this.pools.find(({ tokens }) =>
      tokens.some((t) => t.assetId === assetId)
    );
    if (pool == null) return null;
    const tokens = this.rootStore.accountStore.TOKENS;
    return pool.currentPrice(assetId, tokens.USDN.assetId, coefficient);
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    setInterval(this.syncPoolsStats, 5000);
    this.syncPools();
    reaction(() => this.rootStore.accountStore.chainId, this.syncPools);
  }

  syncPools = () => {
    const accountStore = this.rootStore.accountStore;
    const chainId = accountStore.chainId;
    const pools = Object.values(accountStore.POOL_ID).map(
      (id) => new Pool({ id, chainId, config: accountStore.POOL_CONFIG[id] })
    );
    this.setPools(pools);
  };

  syncPoolsStats = async () => {
    const data = await statsService.getStats();
    const formattedData = Object.entries(data).reduce((acc, [poolId, obj]) => {
      const bnFormat = Object.entries(obj as IStatsPoolItemResponse).reduce(
        (ac, [propertyName, propertyValue]) => {
          const value = new BN(propertyValue);
          return { ...ac, [propertyName]: value };
        },
        {} as IStatsPoolItem
      );
      return { ...acc, [poolId]: bnFormat };
    }, {} as Record<string, IStatsPoolItem>);
    this.setPoolStats(formattedData);
  };

  get poolDataWithApy() {
    return this.pools.map((p) => {
      const apy =
        this.poolsStats != null ? this.poolsStats[p.id]?.apy : BN.ZERO;
      return { ...p, apy };
    });
  }

  get30DaysPoolStats = async (poolId: string): Promise<IPoolStats30Days> => {
    const data = await statsService.getStatsByPoolAndPeriod(poolId);
    return Object.entries(data).reduce((acc, [propertyName, propertyValue]) => {
      const value = Array.isArray(propertyValue)
        ? propertyValue
        : new BN(propertyValue);
      return { ...acc, [propertyName]: value };
    }, {} as IPoolStats30Days);
  };
}
