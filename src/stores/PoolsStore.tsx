import { RootStore } from "./index";
import { makeAutoObservable } from "mobx";

export default class PoolsStore {
  public rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
}
