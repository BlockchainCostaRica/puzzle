import RootStore from "@stores/RootStore";
import { Signer } from "@waves/signer";
import { ProviderWeb } from "@waves.exchange/provider-web";
import { ProviderCloud } from "@waves.exchange/provider-cloud";
import { ProviderKeeper } from "@waves/provider-keeper";
import { NODE_URL_MAP } from "@src/constants";

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
  public rootStore: RootStore;
  public assets: Record<string, IAsset> = defaultAssets;
  public scripted = false;
  public network: INetwork | null = null;
  public address: string | null = null;
  public loginType: LOGIN_TYPE | null = null;
  public signer: Signer | null = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    // autorun(() => this.address && this.updateAccountAssets(this.address));
  }

  get isAuthorized() {
    return this.assets || this.address;
  }

  get fee() {
    return this.scripted ? "0.009" : "0.005";
  }

  login = async (loginType: LOGIN_TYPE) => {
    this.loginType = loginType;

    switch (loginType) {
      case LOGIN_TYPE.KEEPER:
        this.signer = new Signer();
        const authData = { data: "you know what is the main reason" };
        await this.signer.setProvider(new ProviderKeeper(authData));
        break;
      case LOGIN_TYPE.SIGNER_EMAIL:
        this.signer = new Signer();
        await this.signer.setProvider(new ProviderCloud());
        break;
      case LOGIN_TYPE.SIGNER_SEED:
        this.signer = new Signer({ NODE_URL: NODE_URL_MAP["W"] });
        const provider = new ProviderWeb("https://waves.exchange/signer/");
        await this.signer.setProvider(provider);
        break;
      default:
        return;
    }
    const loginData = await this.signer?.login();
    console.log(loginData);

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
