import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import BN from "@src/utils/BN";

const ctx = React.createContext<SendAssetVM | null>(null);

export const SendAssetVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new SendAssetVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}> {children} </ctx.Provider>;
};

export const useSendAssetVM = () => useVM(ctx);

class SendAssetVM {
  rootStore: RootStore;

  recipientAddress: string = "";
  public setRecipientAddress = (v: string) => (this.recipientAddress = v);

  amount: BN = BN.ZERO;
  public setAmount = (amount: BN) => (this.amount = amount);

  @action.bound onMaxClick = () => {
    const { assetToSend } = this.rootStore.accountStore;
    this.setAmount(assetToSend!.balance ?? BN.ZERO);
  };

  get recipientError() {
    return this.recipientAddress.startsWith("3P");
  }

  get recipientErrorText() {
    return "Outside of Waves. Try an address starting with “3P”.";
  }

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }
}
