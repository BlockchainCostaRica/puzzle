import { makeAutoObservable } from "mobx";
import PoolsStore from "@stores/PoolsStore";
import AccountStore, { ISerializedAccountStore } from "@stores/AccountStore";
import NotificationStore from "@stores/NotificationStore";

export interface ISerializedRootStore {
  accountStore?: ISerializedAccountStore;
}

export default class RootStore {
  public accountStore: AccountStore;
  public poolsStore: PoolsStore;
  public notificationStore: NotificationStore;

  constructor(initState?: ISerializedRootStore) {
    this.notificationStore = new NotificationStore(this);
    this.accountStore = new AccountStore(this, initState?.accountStore);
    this.poolsStore = new PoolsStore(this);
    makeAutoObservable(this);
  }

  serialize = (): ISerializedRootStore => ({
    accountStore: this.accountStore.serialize(),
  });
}
