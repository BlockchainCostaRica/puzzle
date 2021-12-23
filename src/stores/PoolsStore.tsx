import { RootStore } from "./index";
import { makeAutoObservable } from "mobx";
import Pool from "@src/entities/Pool";
import { POOL_NAMES } from "@src/constants";

export default class PoolsStore {
  public rootStore: RootStore;
  pools: Pool[];
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.pools = Object.values(POOL_NAMES).map((name) => new Pool(name));
  }
}
