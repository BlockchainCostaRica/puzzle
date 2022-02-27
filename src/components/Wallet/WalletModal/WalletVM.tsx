import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { makeAutoObservable, when } from "mobx";
import { RootStore, useStores } from "@stores";
import copy from "copy-to-clipboard";
import Balance from "@src/entities/Balance";
import { LOGIN_TYPE } from "@src/stores/AccountStore";
import centerEllipsis from "@src/utils/centerEllipsis";
import BN from "@src/utils/BN";

const ctx = React.createContext<WalletVM | null>(null);

export const WalletVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new WalletVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useWalletVM = () => useVM(ctx);

class WalletVM {
  rootStore: RootStore;

  headerExpanded: boolean = true;
  setHeaderExpanded = (state: boolean) => (this.headerExpanded = state);

  poolsLiquidity: any[] | null = null;
  private _setPoolsLiquidity = (v: []) => (this.poolsLiquidity = v);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    when(
      () => rootStore.accountStore.address != null,
      this.getPoolsLiquidityInfo
    );
  }

  handleCopyAddress = () => {
    const { accountStore, notificationStore } = this.rootStore;
    if (accountStore.address) {
      copy(accountStore.address ?? "");
      notificationStore.notify("Your address was copied", {
        type: "success",
        title: "Congratulations!",
      });
    } else {
      notificationStore.notify("There is no address", { type: "error" });
    }
  };

  get signInInfo() {
    const { loginType, address } = this.rootStore.accountStore;
    return `${
      loginType === LOGIN_TYPE.KEEPER ? "Keeper" : "Signer"
    }: ${centerEllipsis(address ?? "", 6)}`;
  }

  get balances() {
    const { accountStore } = this.rootStore;
    return Object.values(this.rootStore.accountStore.TOKENS)
      .map((t) => {
        const balance = accountStore.findBalanceByAssetId(t.assetId);
        return balance ?? new Balance(t);
      })
      .sort((a, b) => {
        if (a.usdnEquivalent == null && b.usdnEquivalent == null) return 0;
        if (a.usdnEquivalent == null && b.usdnEquivalent != null) return 1;
        if (a.usdnEquivalent == null && b.usdnEquivalent == null) return -1;
        return a.usdnEquivalent!.lt(b.usdnEquivalent!) ? 1 : -1;
      });
  }

  get investmentBalances() {
    return [];
  }

  // get poolsLiquidity() {
  //   const { pools } = this.rootStore.poolsStore;
  //   for ()
  //   return "";
  // }
  getPoolsLiquidityInfo = async () => {
    console.log("getPoolsLiquidityInfo");
    const { pools } = this.rootStore.poolsStore;
    const { address } = this.rootStore.accountStore;
    if (address == null) return;
    const v = await Promise.all(
      pools.map((p) => p.getAccountLiquidityInfo(address))
    );
    // const value = v.reduce((acc, value) => {
    //   console.log(value);
    //   return [ ...acc,  ];
    // }, []);
    // for (let i = 0; i < pools.length; i++) {
    //   const p = pools[i];
    //   const poolValues = await p.getAccountLiquidityInfo(address);
    //   if (poolValues.liquidity.gt(0)) {
    //     values = { ...values, [p.id]: new BN(100) };
    //   }
    // }
    // console.log(value);
    this._setPoolsLiquidity([]);
  };
}
