import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable, when } from "mobx";
import { RootStore, useStores } from "@stores";
import { mainnetTokens } from "@src/constants/mainnetConfig";
import BN from "@src/utils/BN";
import statsService, { IArtWork } from "@src/services/statsService";
import nodeService from "@src/services/nodeService";

const ctx = React.createContext<NFTStakingVM | null>(null);

export const NFTStakingVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new NFTStakingVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useNFTStakingVM = () => useVM(ctx);

class NFTStakingVM {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    statsService.getArtworks().then((d) => this._setArtworks(d));
    when(() => rootStore.accountStore.address != null, this.getAccountNFTs);
  }

  public nftDisplayState: number = 0;
  @action.bound setNftDisplayState = (v: number) => (this.nftDisplayState = v);

  public claimedReward: BN | null = null;
  public availableToClaim: BN | null = null;
  public lastClaimDate: BN = BN.ZERO;

  public artworks: IArtWork[] = [];
  public accountArtworks: IArtWork[] = [];
  private _setArtworks = (v: IArtWork[]) => (this.artworks = v);
  private _setAccountArtworks = (v: IArtWork[]) => (this.artworks = v);

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

  getAccountNFTs = async () => {
    const { address } = this.rootStore.accountStore;
    if (address == null) return;
    const nfts = await nodeService.getAddressNfts(address);
    const description =
      "Creator: 3P3iV85eXfkcA3Dd13EpZBYvs1vkKX6AYEN,\n ArtID: Dn3tGwyg8AerfmUjhCixamPcyjy5FSAE2rguKinH9VCH,\n SignID: 5GMCJkjbahpJcbRgjZUp6coxTwhasDLNig3bAbHCdoN,\n Artwork name: Puzzle,\n Issue: 1/1";
    const our = nfts.filter((n) => n.description === description);
    console.log(our);
    // console.log(data);
  };
}
