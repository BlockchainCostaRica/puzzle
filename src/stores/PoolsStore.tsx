import { RootStore } from "./index";
import { makeAutoObservable } from "mobx";
import Pool from "@src/entities/Pool";
import { POOL_ID, tokens } from "@src/constants";
import BN from "@src/utils/BN";

export default class PoolsStore {
  public rootStore: RootStore;
  pools: Pool[];

  getPoolById = (id: POOL_ID) => this.pools.find((pool) => pool.id === id);

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
    return pool.currentPrice(assetId, tokens.USDN.assetId, coefficient);
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.pools = Object.values(POOL_ID).map(
      (id) => new Pool(id, this.rootStore.accountStore.chainId)
    );
  }
}
