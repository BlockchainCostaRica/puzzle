import { makeAutoObservable } from "mobx";
import SettingsStore from "@stores/SettingsStore";
import PoolsStore from "@stores/PoolsStore";
import AccountStore from "@stores/AccountStore";
import NotificationStore from "@stores/NotificationStore";

export default class RootStore {
  settingsStore = new SettingsStore(this);
  poolsStore = new PoolsStore(this);
  accountStore = new AccountStore(this);
  notificationStore = new NotificationStore(this);

  constructor() {
    makeAutoObservable(this);
  }
}
