import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import { IToken } from "@src/constants";

const ctx = React.createContext<CreateCustomPoolsVm | null>(null);

export const CreateCustomPoolsVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new CreateCustomPoolsVm(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useCreateCustomPoolsVM = () => useVM(ctx);

class CreateCustomPoolsVm {
  public rootStore: RootStore;

  loading: boolean = false;
  private _setLoading = (l: boolean) => (this.loading = l);

  step: number = 0;
  setStep = (s: number) => (this.step = s);

  poolsAssets: { asset: IToken; share: number }[] = [];
  addAssetToPool = (s: { asset: IToken; share: number }) =>
    this.poolsAssets.push(s);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.poolsAssets = [
      { asset: rootStore.accountStore.TOKENS.USDN, share: 50 },
      { asset: rootStore.accountStore.TOKENS.PUZZLE, share: 50 },
    ];
    makeAutoObservable(this);
  }

  get canContinue() {
    switch (this.step) {
      case 0:
        return true;
      case 1:
        return true;
      case 2:
        return true;
      default:
        return false;
    }
  }
}
