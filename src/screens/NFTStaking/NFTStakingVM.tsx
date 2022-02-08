import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { makeAutoObservable } from "mobx";
import { RootStore, useStores } from "@stores";
import { mainnetTokens } from "@src/constants/mainnetConfig";
import BN from "@src/utils/BN";
import statsService from "@src/services/statsService";

const ctx = React.createContext<NFTStakingVM | null>(null);

export const NFTStakingVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new NFTStakingVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useStakingVM = () => useVM(ctx);

class NFTStakingVM {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    statsService.getArtworks().then((d) => this._setArtworks(d));
  }

  public claimedReward: BN | null = null;
  public availableToClaim: BN | null = null;
  public lastClaimDate: BN = BN.ZERO;

  public artworks = [];
  private _setArtworks = (v: any) => (this.artworks = v);

  private _setClaimedReward = (v: BN) => (this.claimedReward = v);
  private _setAvailableToClaim = (v: BN) => (this.availableToClaim = v);
  private _setLastClaimDate = (v: BN) => (this.lastClaimDate = v);

  public get puzzleToken() {
    return this.rootStore.accountStore.findBalanceByAssetId(
      mainnetTokens.PUZZLE.assetId
    );
  }

  get canClaim(): boolean {
    return this.availableToClaim !== null && this.availableToClaim.gt(0);
  }

  claim = () => {
    if (!this.canClaim) return;
    this.rootStore.accountStore
      .invoke({
        dApp: this.rootStore.accountStore.CONTRACT_ADDRESSES.staking ?? "",
        payment: [],
        call: {
          function: "claimReward",
          args: [],
        },
      })
      .then();
  };
}
