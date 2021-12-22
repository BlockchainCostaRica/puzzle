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

    this.language = navigator.language.includes("ru")
      ? Language.RU
      : Language.EN;
    makeAutoObservable(this);
  }

  language: Language = Language.RU;
}
