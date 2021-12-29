import RootStore from "@stores/RootStore";
import { Signer } from "@waves/signer";
import { ProviderWeb } from "@waves.exchange/provider-web";
import { ProviderCloud } from "@waves.exchange/provider-cloud";
import { ProviderKeeper } from "@waves/provider-keeper";
import {
  IToken,
  NODE_URL_MAP,
  POOL_CONFIG,
  POOL_ID,
  ROUTES,
  TOKENS,
} from "@src/constants";
import { action, autorun, makeAutoObservable } from "mobx";
import Balance from "@src/entities/Balance";
import { errorMessage } from "@src/old_components/AuthInterface";
import axios from "axios";
import { getCurrentBrowser } from "@src/utils/getCurrentBrowser";
import BN from "@src/utils/BN";
import { waitForTx } from "@waves/waves-transactions";

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

  chainId: "W" | "T" = "T";

  isWavesKeeperInstalled = false;

  wallModalOpened: boolean = false;
  @action.bound setWallModalOpened = (state: boolean) =>
    (this.wallModalOpened = state);

  public assetBalances: Balance[] = [];
  @action.bound setAssetBalances = (assetBalances: Balance[]) =>
    (this.assetBalances = assetBalances);

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

  constructor(rootStore: RootStore, initState?: ISerializedAccountStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    if (this.isBrowserSupportsWavesKeeper) {
      this.setupWavesKeeper();
    }
    // this.login(localStorage.getItem("authMethod") as any)
    //   .then(this.updateAccountAssets)
    //   .catch((e) => alert(e.toString()));
    if (initState) {
      this.setAddress(initState.address);
      this.setLoginType(initState.loginType);
    }
    setInterval(this.updateAccountAssets, 5000);
  }

  get isBrowserSupportsWavesKeeper(): boolean {
    const browser = getCurrentBrowser();
    return ["chrome", "firefox", "opera", "edge"].includes(browser);
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
        this.setSigner(new Signer({ NODE_URL: NODE_URL_MAP[this.chainId] }));
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
    this.setAddress(null);
    this.setLoginType(null);
    // localStorage.removeItem("authMethod");
    // localStorage.removeItem("userAddress");
    // localStorage.removeItem("userBalances");
    // window.location.reload();
  }

  setupWavesKeeper = () => {
    let attemptsCount = 0;

    autorun(
      (reaction) => {
        if (attemptsCount === 2) {
          reaction.dispose();
          alert("keeper is not installed");
        } else if (window["WavesKeeper"]) {
          reaction.dispose();
          this.isWavesKeeperInstalled = true;
        } else {
          attemptsCount += 1;
        }
      },
      { scheduler: (run) => setInterval(run, 1000) }
    );
  };

  serialize = (): ISerializedAccountStore => ({
    address: this.address,
    loginType: this.loginType,
  });

  updateAccountAssets = async () => {
    if (this.address == null) {
      this.setAssetBalances([]);
      return;
    }
    const tokens = this.TOKENS;
    const ids = Object.values(tokens).map(({ assetId }) => assetId);
    const assetsUrl = `${NODE_URL_MAP[this.chainId]}/assets/balance/${
      this.address
    }`;
    const wavesUrl = `${NODE_URL_MAP[this.chainId]}/addresses/balance/details/${
      this.address
    }`;
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
        const balance = new BN(numberBalance ?? 0);
        const asset: Omit<IToken, "logo"> = Object.values(tokens).find(
          (t) => t.assetId === assetId
        )!;
        const rate = this.rootStore.poolsStore.usdtRate(assetId, 1) ?? BN.ZERO;
        const usdnEquivalent = rate
          ? rate.times(BN.formatUnits(balance, asset.decimals))
          : BN.ZERO;
        return new Balance({ balance, usdnEquivalent, ...asset });
      })
      .sort((a, b) => {
        if (a.usdnEquivalent == null && b.usdnEquivalent == null) return 0;
        if (a.usdnEquivalent == null && b.usdnEquivalent != null) return 1;
        if (a.usdnEquivalent == null && b.usdnEquivalent == null) return -1;
        return a.usdnEquivalent!.lt(b.usdnEquivalent!) ? 1 : -1;
      });
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
  };

  private invokeWithKeeper = async (txParams: IInvokeTxParams) => {
    const data = {
      fee: { assetId: "WAVES", amount: 500000 },
      dApp: txParams.dApp,
      call: txParams.call,
      payment: txParams.payment,
    };
    console.log(data);
    const tx = await window.WavesKeeper.signAndPublishTransaction({
      type: 16,
      data,
    } as any)
      .then(console.log)
      .catch(console.error);
    // await waitForTx(tx, { apiBase: this.chainId });
    console.log(tx);
    return tx;
  };

  get TOKENS() {
    return TOKENS[this.chainId];
  }

  get POOL_ID() {
    return POOL_ID[this.chainId];
  }

  get ROUTES() {
    return ROUTES[this.chainId];
  }

  get POOL_CONFIG() {
    return POOL_CONFIG[this.chainId];
  }
}

export default AccountStore;
