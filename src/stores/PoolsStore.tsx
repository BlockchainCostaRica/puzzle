import { RootStore } from "./index";
import { makeAutoObservable } from "mobx";
import Pool from "@src/entities/Pool";
import { POOL_ID } from "@src/constants";

export default class PoolsStore {
  public rootStore: RootStore;
  pools: Pool[];

  getPoolById = (id: POOL_ID) => this.pools.find((pool) => pool.id === id);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.pools = Object.values(POOL_ID).map((id) => new Pool(id));
  }
}
