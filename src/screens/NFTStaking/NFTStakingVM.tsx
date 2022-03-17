import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable, reaction, when } from "mobx";
import { RootStore, useStores } from "@stores";
import BN from "@src/utils/BN";
import statsService, { IArtWork } from "@src/services/statsService";
import nodeService from "@src/services/nodeService";
import { NODE_URL_MAP } from "@src/constants";

const ctx = React.createContext<NFTStakingVM | null>(null);

export const NFTStakingVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new NFTStakingVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useNFTStakingVM = () => useVM(ctx);

class NFTStakingVM {
  private contractAddress: string = "";
  private _setContractAddress = (v: string) => (this.contractAddress = v);

  loading: boolean = false;
  private _setLoading = (l: boolean) => (this.loading = l);

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    const { accountStore } = this.rootStore;
    this._setContractAddress(accountStore.CONTRACT_ADDRESSES.ultraStaking);
    statsService.getStakingStats().then((d) => this._setStats(d));
    statsService.getArtworks().then((d) => this._setArtworks(d));
    when(
      () => rootStore.accountStore.address != null,
      this.updateAddressStakingInfo
    );
    reaction(
      () => this.rootStore.accountStore?.address,
      this.updateAddressStakingInfo
    );
  }

  public nftDisplayState: number = 0;
  @action.bound setNftDisplayState = (v: number) => (this.nftDisplayState = v);

  public claimedReward: BN | null = null;
  public availableToClaim: BN | null = null;
  public lastClaimDate: BN = BN.ZERO;

  public stats: any = null;
  private _setStats = (v: any) => (this.stats = v);

  public artworks: IArtWork[] | null = null;
  private _setArtworks = (v: IArtWork[] | null) => (this.artworks = v);

  private _setClaimedReward = (v: BN) => (this.claimedReward = v);
  private _setAvailableToClaim = (v: BN) => (this.availableToClaim = v);
  private _setLastClaimDate = (v: BN) => (this.lastClaimDate = v);

  private updateAddressStakingInfo = async () => {
    const { chainId, address, TOKENS } = this.rootStore.accountStore;
    const { contractAddress } = this;
    const keysArray = {
      globalStaked: "global_staked",
      addressStaked: `${address}_staked`,
      claimedReward: `${address}_${TOKENS.USDN.assetId}_claimed`,
      globalLastCheckInterest: `global_lastCheck_${TOKENS.USDN.assetId}_interest`,
      addressLastCheckInterest: `${address}_lastCheck_${TOKENS.USDN.assetId}_interest`,
      lastClaimDate: `${address}_${TOKENS.USDN.assetId}_lastClaim`,
    };
    const response = await nodeService.nodeKeysRequest(
      NODE_URL_MAP[chainId],
      contractAddress,
      Object.values(keysArray)
    );
    const parsedNodeResponse = [...(response ?? [])].reduce<Record<string, BN>>(
      (acc, { key, value }) => {
        Object.entries(keysArray).forEach(([regName, regValue]) => {
          const regexp = new RegExp(regValue);
          if (regexp.test(key)) {
            acc[regName] = new BN(value);
          }
        });
        return acc;
      },
      {}
    );

    const addressStaked = parsedNodeResponse["addressStaked"];
    const claimedReward = parsedNodeResponse["claimedReward"];
    const globalLastCheckInterest =
      parsedNodeResponse["globalLastCheckInterest"];
    const addressLastCheckInterest =
      parsedNodeResponse["addressLastCheckInterest"];
    const lastClaimDate = parsedNodeResponse["lastClaimDate"];

    if (addressStaked == null) {
      this._setAvailableToClaim(BN.ZERO);
      this._setClaimedReward(BN.ZERO);
      return;
    }

    this._setClaimedReward(claimedReward);
    const availableToClaim = globalLastCheckInterest
      .minus(addressLastCheckInterest)
      .times(addressStaked);
    this._setAvailableToClaim(availableToClaim);
    lastClaimDate && this._setLastClaimDate(lastClaimDate);
  };

  get canClaim(): boolean {
    return this.availableToClaim != null && this.availableToClaim.gt(0);
  }

  claim = async () => {
    if (!this.canClaim) return;
    this._setLoading(true);
    const { accountStore, notificationStore } = this.rootStore;
    await accountStore
      .invoke({
        dApp: this.contractAddress,
        payment: [],
        call: { function: "claimReward", args: [] },
      })
      .then(
        (txId) =>
          txId &&
          notificationStore.notify(`Your rewards was claimed`, {
            type: "success",
            title: `Success`,
            link: `${accountStore.EXPLORER_LINK}/tx/${txId}`,
            linkTitle: "View on Explorer",
          })
      )
      .catch((e) => {
        notificationStore.notify(e.message ?? JSON.stringify(e), {
          type: "error",
          title: "Transaction is not completed",
        });
      })
      .then(this.updateAddressStakingInfo)
      .finally(() => this._setLoading(false));
  };

  stake = async (assetId?: string) => {
    if (assetId == null) return;
    const { accountStore, notificationStore } = this.rootStore;
    this._setLoading(true);
    await accountStore
      .invoke({
        dApp: this.contractAddress,
        payment: [{ assetId, amount: "1" }],
        call: { function: "stake", args: [] },
      })
      .then(
        (txId) =>
          txId &&
          notificationStore.notify(`Your have staked your nft`, {
            type: "success",
            title: `Success`,
            link: `${accountStore.EXPLORER_LINK}/tx/${txId}`,
            linkTitle: "View on Explorer",
          })
      )
      .catch((e) => {
        notificationStore.notify(e.message ?? JSON.stringify(e), {
          type: "error",
          title: "Transaction is not completed",
        });
      })
      .then(async () => {
        this.rootStore.nftStore.setAccountNFTs(null);
        this.rootStore.nftStore.setStakedAccountNFTs(null);
        await Promise.all([
          this.rootStore.nftStore.getAccountNFTs(),
          this.rootStore.nftStore.getAccountNFTsOnStaking(),
          this.updateAddressStakingInfo(),
        ]);
      })
      .finally(() => this._setLoading(false));
  };

  unStake = async (assetId?: string) => {
    if (assetId == null) return;
    this._setLoading(true);
    const { rootStore } = this;
    const { accountStore, notificationStore } = rootStore;
    await accountStore
      .invoke({
        dApp: this.contractAddress,
        payment: [],
        call: {
          function: "unStake",
          args: [{ type: "string", value: assetId }],
        },
      })
      .then(
        (txId) =>
          txId &&
          notificationStore.notify(`Your have unstaked your nft`, {
            type: "success",
            title: `Success`,
            link: `${accountStore.EXPLORER_LINK}/tx/${txId}`,
            linkTitle: "View on Explorer",
          })
      )
      .catch((e) => {
        notificationStore.notify(e.message ?? JSON.stringify(e), {
          type: "error",
          title: "Transaction is not completed",
        });
      })
      .then(async () => {
        this.rootStore.nftStore.setAccountNFTs(null);
        this.rootStore.nftStore.setStakedAccountNFTs(null);
        await Promise.all([
          this.rootStore.nftStore.getAccountNFTs(),
          this.rootStore.nftStore.getAccountNFTsOnStaking(),
          this.updateAddressStakingInfo(),
        ]);
      })
      .finally(() => this._setLoading(false));
  };
}
