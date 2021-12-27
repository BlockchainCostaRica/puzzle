import RootStore from "@stores/RootStore";
import { Signer } from "@waves/signer";
import { ProviderWeb } from "@waves.exchange/provider-web";
import { ProviderCloud } from "@waves.exchange/provider-cloud";
import { ProviderKeeper } from "@waves/provider-keeper";
import { ITokenConfig, NODE_URL_MAP, tokens } from "@src/constants";
import { action, makeAutoObservable } from "mobx";
import BigNumber from "bignumber.js";
import Balance from "@src/entities/Balance";
import { errorMessage } from "@src/old_components/AuthInterface";
import axios from "axios";

export enum LOGIN_TYPE {
  SIGNER_SEED = "SIGNER_SEED",
  SIGNER_EMAIL = "SIGNER_EMAIL",
  KEEPER = "KEEPER",
}

export interface IInvokeTxParams {
  dApp: string;
  payment: Array<{ assetId: string; amount: string }>;
  call: {
    function: string;
    args: Array<{ type: "integer" | "string"; value: string }>;
  };
}

export interface ISerializedAccountStore {
  address: string | null;
  loginType: LOGIN_TYPE | null;
}

class AccountStore {
  public readonly rootStore: RootStore;

  wallModalOpened: boolean = false;
  @action.bound setWallModalOpened = (state: boolean) =>
    (this.wallModalOpened = state);

  public assetBalances: Balance[] = [];
  @action.bound setAssetBalances = (assetBalances: Balance[]) =>
    (this.assetBalances = assetBalances);

  public address: string | null = "3P6Ksahs71SiKQgQ4qaZuFAVhqncdi2nvJQ";
  @action.bound setAddress = (address: string | null) =>
    (this.address = address);

  public loginType: LOGIN_TYPE | null = LOGIN_TYPE.KEEPER;
  @action.bound setLoginType = (loginType: LOGIN_TYPE | null) =>
    (this.loginType = loginType);

  public signer: Signer | null = null;
  @action.bound setSigner = (signer: Signer | null) => (this.signer = signer);

  // public scripted = false;
  // public network: INetwork | null = null;

  constructor(rootStore: RootStore, initState?: ISerializedAccountStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    this.login(localStorage.getItem("authMethod") as any).then();
    // if (initState) {
    //   this.setAddress(initState.address);
    //   this.setLoginType(initState.loginType);
    // }
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
    // localStorage.setItem("authMethod", loginType);
  };

  logout() {
    this.setAddress(null);
    this.setLoginType(null);
    // localStorage.removeItem("authMethod");
    // localStorage.removeItem("userAddress");
    // localStorage.removeItem("userBalances");
    // window.location.reload();
  }

  serialize = (): ISerializedAccountStore => ({
    address: this.address,
    loginType: this.loginType,
  });

  updateAccountAssets = async () => {
    if (this.address == null) {
      this.setAssetBalances([]);
      return;
    }
    const ids = Object.values(tokens).map(({ assetId }) => assetId);
    const assetsUrl = `${NODE_URL_MAP["W"]}/assets/balance/${this.address}`;
    const wavesUrl = `${NODE_URL_MAP["W"]}/addresses/balance/details/${this.address}`;
    const data = (
      await Promise.all([
        axios.post(assetsUrl, { ids }).then(({ data }) => data),
        axios.get(wavesUrl).then(({ data }) => ({
          balances: [{ balance: data.regular, assetId: "WAVES" }],
        })),
      ])
    ).reduce<{ assetId: string; balance: number }[]>(
      (acc, { balances }) => [...acc, ...balances],
      []
    );
    const assetBalances = data
      .map(({ balance: numberBalance, assetId }) => {
        const balance = new BigNumber(numberBalance ?? 0);
        const asset: ITokenConfig = Object.values(tokens).find(
          (t) => t.assetId === assetId
        )!;
        const rate = this.rootStore.poolsStore.usdtRate(assetId, 1);
        return new Balance({
          balance,
          usdnEquivalent: rate
            ? rate.times(balance.div(asset.decimals))
            : undefined,
          ...asset,
        });
      })
      .sort((a, b) => (a.gt(b) ? -1 : 1));
    this.setAssetBalances(assetBalances);
  };

  public invoke = async (txParams: IInvokeTxParams) =>
    this.loginType === LOGIN_TYPE.KEEPER
      ? this.invokeWithKeeper(txParams)
      : this.invokeWithSigner(txParams);

  private invokeWithSigner = async (txParams: IInvokeTxParams) => {
    if (this.signer == null) {
      errorMessage("You need login firstly");
      return;
    }
    const ttx = this.signer.invoke({
      dApp: txParams.dApp,
      fee: 500000,
      payment: txParams.payment,
      call: txParams.call,
    });
    const tx = await ttx.broadcast();
    console.log(tx);
    return tx;
    // .then((tx: any) => handleExchangePromise(tx))
    // .catch((error: any) => handleExchangeError(error));
  };

  private invokeWithKeeper = async (txParams: IInvokeTxParams) => {
    const tx = await window.WavesKeeper.signAndPublishTransaction({
      type: 16,
      data: {
        fee: { assetId: "WAVES", amount: 500000 },
        dApp: txParams.dApp,
        call: txParams.call,
        payment: txParams.payment,
      },
    });
    console.log(tx);
    return tx;
    // .then((tx: any) => handleExchangePromise(tx))
    // .catch((error: any) => handleExchangeError(error));
  };
}

export default AccountStore;
