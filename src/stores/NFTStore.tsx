import statsService, { IArtWork } from "@src/services/statsService";
import RootStore from "@stores/RootStore";
import nodeService, { INFT } from "@src/services/nodeService";
import { makeAutoObservable, reaction } from "mobx";
import { NODE_URL_MAP } from "@src/constants";

export default class NftStore {
  public rootStore: RootStore;

  public artworks: IArtWork[] | null = null;
  private _setArtworks = (v: IArtWork[]) => (this.artworks = v);

  public stakedAccountNFTs: Array<IArtWork & Partial<INFT>> | null = null;
  public setStakedAccountNFTs = (v: Array<IArtWork & Partial<INFT>> | null) =>
    (this.stakedAccountNFTs = v);

  public accountNFTs: Array<IArtWork & Partial<INFT>> | null = null;
  public setAccountNFTs = (v: Array<IArtWork & Partial<INFT>> | null) =>
    (this.accountNFTs = v);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    statsService
      .getArtworks()
      .then((d) => this._setArtworks(d))
      .then(() =>
        Promise.all([this.getAccountNFTs(), this.getAccountNFTsOnStaking()])
      );

    reaction(
      () => this.rootStore.accountStore.address,
      () => Promise.all([this.getAccountNFTs(), this.getAccountNFTsOnStaking()])
    );
    setInterval(
      () =>
        Promise.all([this.getAccountNFTs(), this.getAccountNFTsOnStaking()]),
      40 * 1000
    );
  }

  getAccountNFTs = async () => {
    const { address, chainId } = this.rootStore.accountStore;
    const { artworks } = this;
    if (address == null || artworks == null) return;
    const nfts = await nodeService.getAddressNfts(
      NODE_URL_MAP[chainId],
      address
    );
    const supportedPuzzleNft = nfts
      .filter(({ description }) =>
        artworks.some(({ typeId }) => typeId && description.includes(typeId))
      )
      .map((nft) => ({
        ...nft,
        ...(artworks.find(
          ({ typeId }) => typeId && nft.description.includes(typeId)
        ) ?? []),
      }))
      .map((nft) => {
        const searchTerm = "Issue: ";
        const searchIndex = nft.description?.indexOf(searchTerm) ?? 0;
        const strOut = nft.description?.substr(searchIndex + searchTerm.length);
        const numberName = `${nft.name} #${strOut}`;
        return { ...nft, name: numberName };
      });
    this.setAccountNFTs(supportedPuzzleNft);
  };

  getAccountNFTsOnStaking = async () => {
    const { artworks, rootStore } = this;
    const { address, chainId } = this.rootStore.accountStore;
    if (address == null || artworks == null) return;
    const ultra = rootStore.accountStore.CONTRACT_ADDRESSES.ultraStaking;

    const allNftOnStaking = await nodeService.getAddressNfts(
      NODE_URL_MAP[chainId],
      ultra
    );
    const addressStakingNft = await nodeService.nodeMatchRequest(
      NODE_URL_MAP[chainId],
      ultra,
      `address_${address}_nft_(.*)`
    );

    if (addressStakingNft == null) return;
    const stakedNftIds = addressStakingNft?.reduce<string[]>(
      (acc, { key }) => [...acc, key.split("_")[3]],
      []
    );
    if (stakedNftIds?.length === 0) {
      this.setStakedAccountNFTs([]);
      return;
    }
    const supportedPuzzleNft = allNftOnStaking
      .filter(({ assetId }) => stakedNftIds?.some((id) => id === assetId))
      .map((nft) => ({
        ...nft,
        ...(artworks?.find(
          ({ typeId }) => typeId && nft.description.includes(typeId)
        ) ?? []),
      }))
      .map((nft) => {
        const searchTerm = "Issue: ";
        const searchIndex = nft.description?.indexOf(searchTerm) ?? 0;
        const strOut = nft.description?.substr(searchIndex + searchTerm.length);
        const numberName = `${nft.name} #${strOut}`;
        return { ...nft, name: numberName };
      });
    this.setStakedAccountNFTs(supportedPuzzleNft);
  };
}
