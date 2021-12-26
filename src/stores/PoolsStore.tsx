import { RootStore } from "./index";
import { makeAutoObservable } from "mobx";
import Pool from "@src/entities/Pool";
import { ITokenConfig, POOL_ID } from "@src/constants";

export default class PoolsStore {
  public rootStore: RootStore;
  pools: Pool[];

  getPoolById = (id: POOL_ID) => this.pools.find((pool) => pool.id === id);

  get liquidity(): Record<string, number> {
    return this.pools.reduce<Record<string, number>>(
      (acc, pool) => ({ ...acc, ...pool.liquidity }),
      {}
    );
  }

  get tokens(): Array<ITokenConfig & { shareAmount: number }> {
    return this.pools.reduce<Array<ITokenConfig & { shareAmount: number }>>(
      (acc, pool) => ({ ...acc, ...pool.tokens }),
      []
    );
  }

  currentPrice = (assetId0: string, assetId1: string, coefficient = 0.98) => {
    const asset0 = this.tokens.find(({ assetId }) => assetId === assetId0);
    const asset1 = this.tokens.find(({ assetId }) => assetId === assetId1);
    const liquidity0 = this.liquidity[assetId0];
    const liquidity1 = this.liquidity[assetId1];
    return [asset0, asset1, liquidity0, liquidity1].every((v) => v != null)
      ? Math.round(
          (coefficient *
            (1e4 * (liquidity0 / asset0!.shareAmount / asset0!.decimals))) /
            (1e4 * (liquidity1 / asset1!.shareAmount / asset1!.decimals))
        ) / 1e4
      : 0;
  };

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.pools = Object.values(POOL_ID).map((id) => new Pool(id));
  }
}
