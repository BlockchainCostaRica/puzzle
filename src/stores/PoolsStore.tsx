import { RootStore } from "./index";
import { action, makeAutoObservable, reaction } from "mobx";
import Pool from "@src/entities/Pool";
import { TPoolId } from "@src/constants";
import BN from "@src/utils/BN";
import axios from "axios";

interface StatsPoolItemRaw {
  apy: number;
  liquidity: number;
  monthly_volume: number;
}

export interface StatsPoolItem {
  apy: BN;
  liquidity: BN;
  monthly_volume: BN;
}

interface PoolVolume {
  date: number;
  volume: number;
}

export interface PoolStats30DaysRaw extends StatsPoolItemRaw {
  fees: number;
  volume: PoolVolume[];
}

export interface PoolStats30Days extends StatsPoolItem {
  fees: BN;
  volume: PoolVolume[];
}

type TStats = Record<string, StatsPoolItem>;

export default class PoolsStore {
  public rootStore: RootStore;
  pools: Pool[] = [];
  @action.bound setPools = (pools: Pool[]) => (this.pools = pools);
  getPoolById = (id: TPoolId) => this.pools.find((pool) => pool.id === id);

  public poolsStats: TStats | null = null;
  private setPoolStats = (value: TStats) => (this.poolsStats = value);

  findPoolStatsByPoolId = (poolId: string) =>
    this.poolsStats && this.poolsStats[poolId];

  get liquidity(): Record<string, BN> {
    return this.pools.reduce<Record<string, BN>>(
      (acc, pool) => ({ ...acc, ...pool.liquidity }),
      {}
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
      (id) =>
        new Pool({
          id,
          chainId,
          config: (accountStore.POOL_CONFIG as any)[id],
        })
    );
    this.setPools(pools);
  };

  syncPoolsStats = async () => {
    axios
      .get("https://puzzleback.herokuapp.com/stats/pools")
      .then(({ data }) => {
        const formattedData = Object.entries(data).reduce<
          Record<string, StatsPoolItem>
        >((acc, [poolId, obj]) => {
          const bnFormat = Object.entries(obj as StatsPoolItemRaw).reduce<
            Record<string, BN>
          >((ac, [propertyName, propertyValue]) => {
            const value = new BN(propertyValue);
            return { ...ac, [propertyName]: value };
          }, {});
          return {
            ...acc,
            [poolId]: bnFormat as any,
          };
        }, {});
        this.setPoolStats(formattedData);
      })
      .catch(() => console.error(`Cannot update stats of the pools`));
  };
  get30DaysPoolStats = async (poolId: string) => {
    const { data }: { data: PoolStats30DaysRaw } = await axios.get(
      `https://puzzleback.herokuapp.com/stats/${poolId}/30d`
    );
    const formattedData = Object.entries(data).reduce<PoolStats30Days>(
      (acc, [propertyName, propertyValue]) => {
        const value = Array.isArray(propertyValue)
          ? propertyValue
          : new BN(propertyValue);
        return {
          ...acc,
          [propertyName]: value as any,
        };
      },
      {} as any
    );
    return formattedData;
  };
}
