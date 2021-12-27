import { RootStore } from "./index";
import { makeAutoObservable } from "mobx";

export enum Language {
  EN = "EN",
  RU = "RU",
}

export default class SettingsStore {
  public rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
}
