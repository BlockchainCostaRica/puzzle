import { makeAutoObservable } from "mobx";
import PoolsStore from "@stores/PoolsStore";
import AccountStore, { ISerializedAccountStore } from "@stores/AccountStore";
import NotificationStore from "@stores/NotificationStore";
import NftStore from "@stores/NFTStore";

export interface ISerializedRootStore {
  accountStore?: ISerializedAccountStore;
}

export type TPoolStats = {
  apy: number;
  fees: number;
  liquidity: number;
  monthly_volume: number;
  volume: { date: number; volume: number }[];
};

export default class RootStore {
  public accountStore: AccountStore;
  public poolsStore: PoolsStore;
  public notificationStore: NotificationStore;
  public nftStore: NftStore;

  constructor(initState?: ISerializedRootStore) {
    this.notificationStore = new NotificationStore(this);
    this.accountStore = new AccountStore(this, initState?.accountStore);
    this.poolsStore = new PoolsStore(this);
    this.nftStore = new NftStore(this);
    makeAutoObservable(this);
  }

  serialize = (): ISerializedRootStore => ({
    accountStore: this.accountStore.serialize(),
  });
}
