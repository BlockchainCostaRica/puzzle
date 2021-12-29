import { RootStore } from "./index";
import { action, makeAutoObservable, reaction } from "mobx";
import Pool from "@src/entities/Pool";
import { TPoolId } from "@src/constants";
import BN from "@src/utils/BN";

export default class PoolsStore {
  public rootStore: RootStore;
  pools: Pool[] = [];
  @action.bound setPools = (pools: Pool[]) => (this.pools = pools);
  getPoolById = (id: TPoolId) => this.pools.find((pool) => pool.id === id);

  get liquidity(): Record<string, BN> {
    return this.pools.reduce<Record<string, BN>>(
      (acc, pool) => ({ ...acc, ...pool.liquidity }),
      {}
    );
  }

  usdtRate = (assetId: string, coefficient = 0.98): BN | null => {
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
}
