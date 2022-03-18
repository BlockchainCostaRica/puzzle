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

interface IPoolToken {
  asset: IToken;
  share: number;
  locked: boolean;
}

class CreateCustomPoolsVm {
  public rootStore: RootStore;

  // loading: boolean = false;
  // private _setLoading = (l: boolean) => (this.loading = l);

  step: number = 2;
  setStep = (s: number) => (this.step = s);

  poolsAssets: IPoolToken[] = [];

  addAssetToPool = (assetId: string) => {
    const balances = this.rootStore.accountStore.assetBalances;
    const asset = balances?.find((b) => b.assetId === assetId);
    if (asset == null) return;
    this.poolsAssets.push({ asset, share: 10, locked: false });
  };
  removeAssetFromPool = (assetId: string) => {
    const usdn = this.rootStore.accountStore.TOKENS.USDN;
    if (assetId === usdn.assetId) return;
    const indexOfObject = this.poolsAssets.findIndex(
      ({ asset }) => asset.assetId === assetId
    );
    this.poolsAssets.splice(indexOfObject, 1);
  };
  changeAssetShareInPool = (assetId: string, share: number) => {
    const indexOfObject = this.poolsAssets.findIndex(
      ({ asset }) => asset.assetId === assetId
    );
    this.poolsAssets[indexOfObject].share = share;
  };
  changeAssetInShareInPool = (oldAssetId: string, newAssetId: string) => {
    const indexOfObject = this.poolsAssets.findIndex(
      ({ asset }) => asset.assetId === oldAssetId
    );
    const balances = this.rootStore.accountStore.assetBalances;
    const asset = balances?.find((b) => b.assetId === newAssetId);
    if (asset == null) return;
    this.poolsAssets[indexOfObject].asset = asset;
  };
  updateLockedState = (assetId: string, val: boolean) => {
    const indexOfObject = this.poolsAssets.findIndex(
      ({ asset }) => asset.assetId === assetId
    );
    this.poolsAssets[indexOfObject].locked = val;
  };

  title: string = "";
  setTitle = (v: string) => (this.title = v);

  domain: string = "";
  setDomain = (v: string) => (this.domain = v);

  swapFee: number = 0.5;
  setSwapFee = (v: number) => (this.swapFee = v);

  logo: string | null = null;
  setLogo = (v: any) => (this.logo = v);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.poolsAssets = [
      { asset: rootStore.accountStore.TOKENS.USDN, share: 50, locked: false },
      { asset: rootStore.accountStore.TOKENS.PUZZLE, share: 30, locked: false },
      { asset: rootStore.accountStore.TOKENS.USDT, share: 10, locked: false },
      { asset: rootStore.accountStore.TOKENS.EURN, share: 10, locked: false },
      { asset: rootStore.accountStore.TOKENS.EURN, share: 10, locked: false },
      { asset: rootStore.accountStore.TOKENS.EURN, share: 10, locked: false },
      { asset: rootStore.accountStore.TOKENS.EURN, share: 10, locked: false },
      { asset: rootStore.accountStore.TOKENS.EURN, share: 10, locked: false },
      { asset: rootStore.accountStore.TOKENS.EURN, share: 10, locked: false },
      { asset: rootStore.accountStore.TOKENS.EURN, share: 10, locked: false },
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

  get tokensToAdd() {
    const balances = this.rootStore.accountStore.assetBalances;
    if (balances == null) return [];
    const currentTokens = this.poolsAssets.reduce<string[]>(
      (acc, v) => [...acc, v.asset.assetId],
      []
    );
    return balances.filter((b) => !currentTokens.includes(b.assetId));
  }
}
