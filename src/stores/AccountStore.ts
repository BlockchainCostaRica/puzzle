import RootStore from "@stores/RootStore";
import { Signer } from "@waves/signer";
import { ProviderWeb } from "@waves.exchange/provider-web";
import { ProviderCloud } from "@waves.exchange/provider-cloud";
import { ProviderKeeper } from "@waves/provider-keeper";
import { NODE_URL_MAP } from "@src/constants";
import { action, makeAutoObservable } from "mobx";

export interface IAsset {
  assetId: string;
  name: string;
  decimals: number;
}

export interface INetwork {
  code: string;
  server: string;
  clientOrigin?: string;
  matcher?: string;
}

export enum LOGIN_TYPE {
  SIGNER_SEED = "SIGNER_SEED",
  SIGNER_EMAIL = "SIGNER_EMAIL",
  KEEPER = "KEEPER",
}

const defaultAssets = {
  WAVES: { name: "WAVES", assetId: "WAVES", decimals: 8 },
};

class AccountStore {
  public readonly rootStore: RootStore;

  public assets: Record<string, IAsset> = defaultAssets;
  @action.bound setAssets = (assets: Record<string, IAsset>) =>
    (this.assets = assets);

  public address: string | null = null;
  @action.bound setAddress = (address: string | null) =>
    (this.address = address);

  public loginType: LOGIN_TYPE | null = null;
  @action.bound setLoginType = (loginType: LOGIN_TYPE | null) =>
    (this.loginType = loginType);

  public signer: Signer | null = null;
  @action.bound setSigner = (signer: Signer | null) => (this.signer = signer);

  // public scripted = false;
  // public network: INetwork | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    // autorun(() => this.address && this.updateAccountAssets(this.address));
  }

  get isAuthorized() {
    return this.assets || this.address;
  }

  // get fee() {
  //   return this.scripted ? "0.009" : "0.005";
  // }

  login = async (loginType: LOGIN_TYPE) => {
    this.loginType = loginType;

    switch (loginType) {
      case LOGIN_TYPE.KEEPER:
        this.setSigner(new Signer());
        const authData = { data: "you know what is the main reason" };
        await this.signer?.setProvider(new ProviderKeeper(authData));
        break;
      case LOGIN_TYPE.SIGNER_EMAIL:
        this.setSigner(new Signer());
        await this.signer?.setProvider(new ProviderCloud());
        break;
      case LOGIN_TYPE.SIGNER_SEED:
        this.setSigner(new Signer({ NODE_URL: NODE_URL_MAP["W"] }));
        const provider = new ProviderWeb("https://waves.exchange/signer/");
        await this.signer?.setProvider(provider);
        break;
      default:
        return;
    }
    const loginData = await this.signer?.login();
    this.setAddress(loginData?.address ?? null);
    // localStorage.setItem("authMethod", loginType);
    // console.log("initialized with ", loginType);
  };

  logout() {
    // localStorage.removeItem("authMethod");
    // localStorage.removeItem("userAddress");
    // localStorage.removeItem("userBalances");

    window.location.reload();
  }

  // async updateAccountAssets(address: string) {
  //   if (!this.network) return;
  //   const server = this.network.server;
  //   const path = `${checkSlash(server)}assets/balance/${address}`;
  //   const resp = await fetch(path);
  //   const data = await resp.json();
  //
  //   const assets: {
  //     balances: {
  //       assetId: string;
  //       issueTransaction: { name: string; decimals: number };
  //     }[];
  //   } = data;
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
}

export default AccountStore;
