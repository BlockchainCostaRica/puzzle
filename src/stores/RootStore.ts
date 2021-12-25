import { makeAutoObservable } from "mobx";
import SettingsStore from "@stores/SettingsStore";
import PoolsStore from "@stores/PoolsStore";
import AccountStore, { ISerializedAccountStore } from "@stores/AccountStore";
import NotificationStore from "@stores/NotificationStore";

export interface ISerializedRootStore {
  accountStore?: ISerializedAccountStore;
}

export default class RootStore {
  public settingsStore: SettingsStore;
  public poolsStore: PoolsStore;
  public accountStore: AccountStore;
  public notificationStore: NotificationStore;

  constructor(initState?: ISerializedRootStore) {
    this.settingsStore = new SettingsStore(this);
    this.poolsStore = new PoolsStore(this);
    this.accountStore = new AccountStore(this, initState?.accountStore);
    this.notificationStore = new NotificationStore(this);
    makeAutoObservable(this);
  }

  serialize = (): ISerializedRootStore => ({
    accountStore: this.accountStore.serialize(),
  });
}
