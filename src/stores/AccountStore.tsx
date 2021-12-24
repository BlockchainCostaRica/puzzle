import { RootStore } from "./index";
import { autorun, makeAutoObservable } from "mobx";
import Pool from "@src/entities/Pool";
import { POOL_ID } from "@src/constants";

export default class AccountStore {
  public rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    // autorun(() => this.address && this.updateAccountAssets(this.address));
  }

  // assets: { [name: string]: IAsset } = {
  //   WAVES: { name: "WAVES", assetId: "WAVES", decimals: 8 },
  // };
  // scripted = false;
  // network: INetwork | null = null;
  // address: string | null = null;
  // loginType: ELoginType | null = null;
  //
  // @computed get isAuthorized() {
  //   return (
  //     this.rootStore.keeperStore.isApplicationAuthorizedInWavesKeeper ||
  //     this.rootStore.signerStore.isApplicationAuthorizedInWavesExchange
  //   );
  // }
  //
  // @computed get fee() {
  //   return this.scripted ? "0.009" : "0.005";
  // }
  //
  // @action
  // async updateAccountAssets(address: string) {
  //   if (!this.network) return;
  //   const server = this.network.server;
  //   const path = `${checkSlash(server)}assets/balance/${address}`;
  //   const resp = await fetch(path);
  //   const data = await resp.json();
  //
  //   const nftResp = await fetch(
  //     `${checkSlash(server)}assets/nft/${address}/limit/1000`
  //   );
  //   const nft: { assetId: "string"; name: "string"; decimals: 0 }[] =
  //     await nftResp.json();
  //
  //   const assets: {
  //     balances: {
  //       assetId: string;
  //       issueTransaction: { name: string; decimals: number };
  //     }[];
  //   } = data;
  //
  //   assets.balances = [
  //     ...assets.balances,
  //     ...nft.map(({ assetId, name, decimals }) => ({
  //       assetId: assetId,
  //       issueTransaction: { name, decimals },
  //     })),
  //   ];
  //
  //   const ids: any = assets.balances
  //     .filter((balance) => balance.issueTransaction === null)
  //     .map((x) => x.assetId);
  //   if (ids.length !== 0) {
  //     const assetDetails = await axios.post(
  //       "/assets/details",
  //       { ids },
  //       { baseURL: `${checkSlash(server)}` }
  //     );
  //
  //     assetDetails.data.forEach((assetDetails: any) => {
  //       assets.balances
  //         .filter((x) => x.assetId === assetDetails.assetId)
  //         .forEach((x) => {
  //           x.issueTransaction = {
  //             name: assetDetails.name,
  //             decimals: assetDetails.decimals,
  //           };
  //         });
  //     });
  //   }
  //
  //   if (
  //     "balances" in assets &&
  //     !assets.balances.some((x) => x.issueTransaction === null)
  //   ) {
  //     this.rootStore.accountStore.assets = {
  //       WAVES: { name: "WAVES", assetId: "WAVES", decimals: 8 },
  //       ...assets.balances.reduce(
  //         (acc, { assetId, issueTransaction: { name, decimals } }) => ({
  //           ...acc,
  //           [assetId]: { assetId, name, decimals },
  //         }),
  //         {}
  //       ),
  //     };
  //   }
  // }
  //
  // getNetworkByAddress = (address: string): INetwork | null => {
  //   const byte = base58Decode(address)[1];
  //
  //   try {
  //     const network = Network.getNetworkByByte(byte);
  //
  //     return network ? network : null;
  //   } catch (e) {
  //     this.rootStore.notificationStore.notify(e.message, { type: "error" });
  //   }
  //   return null;
  // };
}
