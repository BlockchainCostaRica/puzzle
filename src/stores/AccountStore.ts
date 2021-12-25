import RootStore from "@stores/RootStore";
import { Signer } from "@waves/signer";
import { ProviderWeb } from "@waves.exchange/provider-web";
import { ProviderCloud } from "@waves.exchange/provider-cloud";
import { ProviderKeeper } from "@waves/provider-keeper";
import { NODE_URL_MAP } from "@src/constants";
import { action, autorun, makeAutoObservable } from "mobx";
import axios from "axios";
import { IIssueParams } from "@waves/waves-transactions";

export interface IAssetBalance {
  assetId: string;
  name: string;
  description?: string;
  decimals: number;
  balance?: number;
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

// const defaultAssets: IAsset[] = [
//   { name: "WAVES", assetId: "WAVES", decimals: 8 },
// ];
//
export interface ISerializedAccountStore {
  address: string | null;
  loginType: LOGIN_TYPE | null;
}

interface IBalancesResponse {
  address: string;
  balances: Array<{
    issueTransaction: IIssueParams;
    balance: number;
    quantity: number;
    assetId: string;
  }>;
}

class AccountStore {
  public readonly rootStore: RootStore;

  public assetBalances: IAssetBalance[] = [];
  @action.bound setAssetBalances = (assetBalances: IAssetBalance[]) =>
    (this.assetBalances = assetBalances);

  public address: string | null = null;
  @action.bound setAddress = (address: string | null) =>
    (this.address = address);

  public loginType: LOGIN_TYPE | null = null;
  @action.bound setLoginType = (loginType: LOGIN_TYPE | null) =>
    (this.loginType = loginType);

  public signer: Signer | null = null;
  @action.bound setSigner = (signer: Signer | null) => (this.signer = signer);

  getAssetBalanceById = (assetId: string) =>
    this.assetBalances.find((asset) => assetId === asset.assetId);

  // public scripted = false;
  // public network: INetwork | null = null;

  constructor(rootStore: RootStore, initState?: ISerializedAccountStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    // this.login(localStorage.getItem("authMethod") as any).then();
    if (initState) {
      this.setAddress(initState.address);
      this.setLoginType(initState.loginType);
    }
    this.updateAccountAssets().then();
    setInterval(this.updateAccountAssets, 5000);
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
    localStorage.setItem("authMethod", loginType);
  };

  logout() {
    localStorage.removeItem("authMethod");
    // localStorage.removeItem("userAddress");
    // localStorage.removeItem("userBalances");
    window.location.reload();
  }

  serialize = (): ISerializedAccountStore => ({
    address: this.address,
    loginType: this.loginType,
  });

  updateAccountAssets = async () => {
    if (this.address == null) return;
    const requestUrl = `${NODE_URL_MAP["W"]}/assets/balance/${this.address}`;
    const { data }: { data: IBalancesResponse } = await axios.get(requestUrl);
    const assetBalances = data.balances.map(
      ({ balance, assetId, issueTransaction }) => ({
        balance,
        assetId,
        decimals: issueTransaction.decimals ?? 8,
        description: issueTransaction.description,
        name: issueTransaction.name,
      })
    );
    this.setAssetBalances(assetBalances);

    //   assetDetails.data.forEach((assetDetails: any) => {
    //     assets.balances
    //       .filter((x) => x.assetId === assetDetails.assetId)
    //       .forEach((x) => {
    //         x.issueTransaction = {
    //           name: assetDetails.name,
    //           decimals: assetDetails.decimals,
    //         };
    //       });
    //   });
    // }
    //
    // if (
    //   "balances" in assets &&
    //   !assets.balances.some((x) => x.issueTransaction === null)
    // ) {
    //   this.rootStore.accountStore.assets = {
    //     WAVES: { name: "WAVES", assetId: "WAVES", decimals: 8 },
    //     ...assets.balances.reduce(
    //       (acc, { assetId, issueTransaction: { name, decimals } }) => ({
    //         ...acc,
    //         [assetId]: { assetId, name, decimals },
    //       }),
    //       {}
    //     ),
    //   };
    // }
  };
}

export default AccountStore;
