import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import copy from "copy-to-clipboard";
import Balance from "@src/entities/Balance";
import { LOGIN_TYPE } from "@src/stores/AccountStore";
import centerEllipsis from "@src/utils/centerEllipsis";
import { IShortPoolInfo } from "@src/entities/Pool";
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

  poolsLiquidity: IShortPoolInfo[] | null = null;
  private _setPoolsLiquidity = (v: IShortPoolInfo[]) =>
    (this.poolsLiquidity = v);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    setInterval(this.getPoolsLiquidityInfo, 5000);
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
      .filter(({ balance }) => balance && !balance.eq(0))
      .sort((a, b) => {
        if (a.usdnEquivalent == null && b.usdnEquivalent == null) return 0;
        if (a.usdnEquivalent == null && b.usdnEquivalent != null) return 1;
        if (a.usdnEquivalent == null && b.usdnEquivalent == null) return -1;
        return a.usdnEquivalent!.lt(b.usdnEquivalent!) ? 1 : -1;
      });
  }

  get totalInvestmentAmount() {
    const balancesAmount = this.balances.reduce(
      (acc, b) => acc.plus(b.usdnEquivalent ?? 0),
      BN.ZERO
    );
    const poolsAmount = this.poolsLiquidity?.reduce(
      (acc, b) => acc.plus(b.liquidity ?? 0),
      BN.ZERO
    );
    return balancesAmount.plus(poolsAmount ?? BN.ZERO).toFormat(2);
  }

  get investments() {
    const poolsData =
      this.poolsLiquidity?.map(({ poolId, liquidity, indexTokenRate }) => {
        const pool = this.rootStore.poolsStore.pools.find(
          ({ id }) => poolId === id
        );
        const usdnEquivalent = liquidity.times(indexTokenRate);
        return {
          logo: pool?.logo,
          amount: liquidity.toFormat(2) + "-lp",
          name: pool?.name,
          nuclearValue: "$ " + indexTokenRate.toFormat(2),
          usdnEquivalent: "$ " + usdnEquivalent.toFormat(2),
        };
      }) ?? [];
    const stakedNftData = this.stakedNfts.map(
      ({ imageLink, floorPrice, name }) => {
        return {
          logo: imageLink,
          amount: "1 NFT",
          name,
          nuclearValue: floorPrice?.toString(),
          usdnEquivalent: floorPrice?.toString(),
        };
      }
    );
    return [...stakedNftData, ...poolsData];
  }

  get stakedNfts() {
    const { nftStore } = this.rootStore;
    return nftStore.stakedAccountNFTs ?? [];
  }

  getPoolsLiquidityInfo = async () => {
    const { pools } = this.rootStore.poolsStore;
    const { address } = this.rootStore.accountStore;
    if (address == null) return;
    const poolsInfo = await Promise.all(
      pools.map((p) => p.getAccountLiquidityInfo(address))
    );
    const able = poolsInfo.filter(({ liquidity }) => liquidity.gt(0));
    this._setPoolsLiquidity(able);
  };
}
