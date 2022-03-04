import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
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

  tokenToSend: Balance | null = null;
  public setTokenToSend = (v: Balance) => (this.tokenToSend = v);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
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
    return balancesAmount.plus(BN.ZERO).toFormat(2);
  }

  get investments() {
    const { poolsStore, stakeStore, accountStore } = this.rootStore;
    const poolsData =
      poolsStore.accountPoolsLiquidity
        ?.filter(({ liquidityInUsdn }) => !liquidityInUsdn.eq(0))
        .map(
          ({
            pool,
            addressStaked,
            indexTokenRate,
            liquidityInUsdn,
            indexTokenName,
          }) => {
            // const pool = this.rootStore.poolsStore.pools.find(
            //   ({ id }) => poolId === id
            // );
            const amount = BN.formatUnits(addressStaked, 8);
            // @ts-ignore
            const path = accountStore.ROUTES.invest[pool.id];
            return {
              onClickPath: path,
              logo: pool?.logo,
              name: pool?.name,
              amount:
                (amount.gte(0.0001) ? amount.toFormat(4) : amount.toFormat(8)) +
                indexTokenName,
              nuclearValue:
                "$ " +
                (indexTokenRate.gte(0.0001)
                  ? indexTokenRate.toFormat(4)
                  : indexTokenRate.toFormat(10)),
              usdnEquivalent: "$ " + liquidityInUsdn.toFormat(2),
            };
          }
        ) ?? [];
    const stakedNftData = this.stakedNfts.map(
      ({ imageLink, marketPrice, name }) => {
        return {
          onClickPath: accountStore.ROUTES.ULTRASTAKE,
          logo: imageLink,
          amount: "1 NFT",
          name,
          nuclearValue: "$ " + new BN(marketPrice ?? 0).toFormat(),
          usdnEquivalent: "$ " + new BN(marketPrice ?? 0).toFormat(),
        };
      }
    );
    const stakedPuzzle = stakeStore.puzzleWallet;
    return [...stakedNftData, ...poolsData, ...stakedPuzzle];
  }

  get stakedNfts() {
    const { nftStore } = this.rootStore;
    return nftStore.stakedAccountNFTs ?? [];
  }
}
