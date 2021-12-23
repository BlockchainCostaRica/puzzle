import { makeAutoObservable } from "mobx";
import SettingsStore from "@stores/SettingsStore";
import PoolsStore from "@stores/PoolsStore";

export default class RootStore {
  settingsStore = new SettingsStore(this);
  poolsStore = new PoolsStore(this);

  constructor() {
    makeAutoObservable(this);
    // Promise.all([this.cardStore.sync(), this.touchesStore.sync()]).then();
  }
}
