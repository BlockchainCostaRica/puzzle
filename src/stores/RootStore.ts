import { makeAutoObservable } from "mobx";
import SettingsStore from "@stores/SettingsStore";
import PoolsStore from "@stores/PoolsStore";
import AccountStore from "@stores/AccountStore";

export default class RootStore {
  settingsStore = new SettingsStore(this);
  poolsStore = new PoolsStore(this);
  accountStore = new AccountStore(this);

  constructor() {
    makeAutoObservable(this);
    // Promise.all([this.cardStore.sync(), this.touchesStore.sync()]).then();
  }
}
