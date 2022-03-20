import RootStore from "@stores/RootStore";
import { Signer } from "@waves/signer";
import { ProviderWeb } from "@waves.exchange/provider-web";
import { ProviderCloud } from "@waves.exchange/provider-cloud";
import { ProviderKeeper } from "@waves/provider-keeper";
import {
  CONTRACT_ADDRESSES_MAP,
  EXPLORER_URL_MAP,
  IPoolConfig,
  IToken,
  NODE_URL_MAP,
  POOL_CONFIG,
  POOL_ID,
  ROUTES,
  TOKENS,
} from "@src/constants";
import { action, autorun, makeAutoObservable, reaction } from "mobx";
import Balance from "@src/entities/Balance";
import { getCurrentBrowser } from "@src/utils/getCurrentBrowser";
import BN from "@src/utils/BN";
import { nodeInteraction, waitForTx } from "@waves/waves-transactions";
import tokenLogos from "@src/assets/tokens/tokenLogos";
import nodeService from "@src/services/nodeService";

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

export interface ITransferParams {
  recipient: string;
  amount: string;
  assetId?: string;
  attachment?: string;
  feeAssetId?: string;
}

export interface ISerializedAccountStore {
  address: string | null;
  loginType: LOGIN_TYPE | null;
}

class AccountStore {
  public readonly rootStore: RootStore;

  chainId: "W" | "T" = "W";

  constructor(rootStore: RootStore, initState?: ISerializedAccountStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    if (this.isBrowserSupportsWavesKeeper) {
      this.setupWavesKeeper();
    }
    if (initState) {
      this.setLoginType(initState.loginType);
      if (initState.loginType === LOGIN_TYPE.KEEPER) {
        this.setupSynchronizationWithKeeper();
      }
      this.setAddress(initState.address);
    }
    Promise.all([this.checkScriptedAccount(), this.updateAccountAssets()]);
    setInterval(this.updateAccountAssets, 10 * 1000);
    reaction(
      () => this.address,
      () =>
        Promise.all([this.checkScriptedAccount(), this.updateAccountAssets()])
    );
  }

  isAccScripted = false;
  setIsAccScripted = (v: boolean) => (this.isAccScripted = v);

  isWavesKeeperInstalled = false;
  @action.bound setWavesKeeperInstalled = (state: boolean) =>
    (this.isWavesKeeperInstalled = state);

  assetsBalancesLoading = false;
  @action.bound setAssetsBalancesLoading = (state: boolean) =>
    (this.assetsBalancesLoading = state);

  loginModalOpened: boolean = false;
  @action.bound setLoginModalOpened = (state: boolean) =>
    (this.loginModalOpened = state);

  walletModalOpened: boolean = false;
  @action.bound setWalletModalOpened = (state: boolean) =>
    (this.walletModalOpened = state);

  sendAssetModalOpened: boolean = false;
  @action.bound setSendAssetModalOpened = (state: boolean) =>
    (this.sendAssetModalOpened = state);

  assetToSend: Balance | null = null;
  @action.bound setAssetToSend = (state: Balance | null) =>
    (this.assetToSend = state);

  changePoolModalOpened: boolean = false;
  @action.bound setChangePoolModalOpened = (state: boolean) =>
    (this.changePoolModalOpened = state);

  public assetBalances: Balance[] | null = null;
  @action.bound setAssetBalances = (assetBalances: Balance[] | null) =>
    (this.assetBalances = assetBalances);

  findBalanceByAssetId = (assetId: string) =>
    this.assetBalances &&
    this.assetBalances.find((balance) => balance.assetId === assetId);

  public address: string | null = null;
  @action.bound setAddress = (address: string | null) =>
    (this.address = address);

  public loginType: LOGIN_TYPE | null = null;
  @action.bound setLoginType = (loginType: LOGIN_TYPE | null) =>
    (this.loginType = loginType);

  public signer: Signer | null = null;
  @action.bound setSigner = (signer: Signer | null) => (this.signer = signer);

  get isBrowserSupportsWavesKeeper(): boolean {
    const browser = getCurrentBrowser();
    return ["chrome", "firefox", "opera", "edge"].includes(browser);
  }

  setupSynchronizationWithKeeper = () =>
    new Promise((resolve, reject) => {
      let attemptsCount = 0;
      const interval = setInterval(async () => {
        if (window["WavesKeeper"] == null) {
          attemptsCount = attemptsCount + 1;
          if (attemptsCount > 10) {
            clearInterval(interval);
            reject("❌ There is no waves keeper");
          }
        } else {
          clearInterval(interval);
        }

        const result = await window["WavesKeeper"].initialPromise
          .then((keeperApi) => keeperApi.publicState())
          .then(() => this.subscribeToKeeperUpdate())
          .catch(({ code }) => code === "14" && this.subscribeToKeeperUpdate());
        resolve(result);
      }, 500);
    });

  checkScriptedAccount = async () => {
    const { address, chainId } = this;
    if (address == null) return;
    const res = await nodeInteraction.scriptInfo(
      address,
      NODE_URL_MAP[chainId]
    );
    this.setIsAccScripted(res.script != null);
  };

  login = async (loginType: LOGIN_TYPE) => {
    this.setLoginType(loginType);
    switch (loginType) {
      case LOGIN_TYPE.KEEPER:
        this.setSigner(new Signer());
        const authData = { data: "you know what is the main reason" };
        await this.setupSynchronizationWithKeeper();
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
  };

  logout() {
    this.setAddress(null);
    this.setLoginType(null);
  }

  setupWavesKeeper = () => {
    let attemptsCount = 0;

    autorun(
      (reaction) => {
        if (attemptsCount === 2) {
          reaction.dispose();
        } else if (window["WavesKeeper"]) {
          reaction.dispose();
          this.setWavesKeeperInstalled(true);
        } else {
          attemptsCount += 1;
        }
      },
      { scheduler: (run) => setInterval(run, 5 * 1000) }
    );
  };

  subscribeToKeeperUpdate = () =>
    window["WavesKeeper"].on("update", (publicState) =>
      this.setAddress(publicState.account?.address ?? null)
    );

  serialize = (): ISerializedAccountStore => ({
    address: this.address,
    loginType: this.loginType,
  });

  updateAccountAssets = async (force = false) => {
    if (this.address == null) {
      this.setAssetBalances([]);
      return;
    }
    if (!force && this.assetsBalancesLoading) return;
    this.setAssetsBalancesLoading(true);

    const tokens = this.TOKENS;
    const address = this.address;
    const data = await nodeService.getAddressBalances(
      NODE_URL_MAP[this.chainId],
      address
    );
    const assetBalances = Object.entries(tokens).map(([_, asset]) => {
      const t = data.find(({ assetId }) => assetId === asset.assetId);
      const balance = new BN(t != null ? t.balance : 0);
      const rate =
        this.rootStore.poolsStore.usdnRate(asset.assetId, 1) ?? BN.ZERO;
      const usdnEquivalent = rate
        ? rate.times(BN.formatUnits(balance, asset.decimals))
        : BN.ZERO;
      return new Balance({ balance, usdnEquivalent, ...asset });
    });
    const newAddress = this.address;
    if (address !== newAddress) return;

    this.setAssetBalances(assetBalances);
    this.setAssetsBalancesLoading(false);
  };

  ///------------------transfer
  public transfer = async (trParams: ITransferParams) =>
    this.loginType === LOGIN_TYPE.KEEPER
      ? this.transferWithKeeper(trParams)
      : this.transferWithSigner(trParams);

  private transferWithSigner = async (
    data: ITransferParams
  ): Promise<string | null> => {
    if (this.signer == null) {
      await this.login(this.loginType ?? LOGIN_TYPE.SIGNER_EMAIL);
    }
    if (this.signer == null) {
      this.rootStore.notificationStore.notify("You need to login firstly", {
        title: "Error",
        type: "error",
      });
      return null;
    }
    try {
      const ttx = this.signer.transfer({
        ...data,
        fee: this.isAccScripted ? 500000 : 100000,
      });
      const txId = await ttx.broadcast().then((tx: any) => tx.id);
      await waitForTx(txId, {
        apiBase: NODE_URL_MAP[this.chainId],
      });
      return txId;
    } catch (e: any) {
      console.warn(e);
      this.rootStore.notificationStore.notify(e.toString(), {
        type: "error",
        title: "Transaction is not completed",
      });
      return null;
    }
  };

  private transferWithKeeper = async (
    data: ITransferParams
  ): Promise<string | null> => {
    const tokenAmount = BN.formatUnits(
      data.amount,
      this.assetToSend?.decimals
    ).toString();
    const tx = await window.WavesKeeper.signAndPublishTransaction({
      type: 4,
      data: {
        amount: { tokens: tokenAmount, assetId: data.assetId },
        fee: {
          tokens: this.isAccScripted ? "0.005" : "0.001",
          assetId: "WAVES",
        },
        recipient: data.recipient,
      },
    } as any);

    const txId = JSON.parse(tx).id;
    await waitForTx(txId, {
      apiBase: NODE_URL_MAP[this.chainId],
    });
    return txId;
  };

  ///////////------------invoke

  public invoke = async (txParams: IInvokeTxParams) =>
    this.loginType === LOGIN_TYPE.KEEPER
      ? this.invokeWithKeeper(txParams)
      : this.invokeWithSigner(txParams);

  private invokeWithSigner = async (
    txParams: IInvokeTxParams
  ): Promise<string | null> => {
    if (this.signer == null) {
      await this.login(this.loginType ?? LOGIN_TYPE.SIGNER_EMAIL);
    }
    if (this.signer == null) {
      this.rootStore.notificationStore.notify("You need to login firstly", {
        title: "Error",
        type: "error",
      });
      return null;
    }
    const ttx = this.signer.invoke({
      dApp: txParams.dApp,
      fee: this.isAccScripted ? 900000 : 500000,
      payment: txParams.payment,
      call: txParams.call,
    });

    const txId = await ttx.broadcast().then((tx: any) => tx.id);
    await waitForTx(txId, {
      apiBase: NODE_URL_MAP[this.chainId],
    });
    return txId;
  };

  private invokeWithKeeper = async (
    txParams: IInvokeTxParams
  ): Promise<string | null> => {
    const data = {
      fee: { assetId: "WAVES", amount: this.isAccScripted ? 900000 : 500000 },
      dApp: txParams.dApp,
      call: txParams.call,
      payment: txParams.payment,
    };
    const tx = await window.WavesKeeper.signAndPublishTransaction({
      type: 16,
      data,
    } as any);

    const txId = JSON.parse(tx).id;
    await waitForTx(txId, {
      apiBase: NODE_URL_MAP[this.chainId],
    });
    return txId;
  };

  get TOKENS() {
    return Object.values(TOKENS[this.chainId])
      .map((t) => ({
        ...t,
        logo: tokenLogos[t.symbol] ?? tokenLogos.UNKNOWN,
      }))
      .reduce(
        (acc, token) => ({ ...acc, [token.symbol]: token }),
        {} as Record<string, IToken>
      );
  }

  get POOL_ID() {
    return POOL_ID[this.chainId];
  }

  get ROUTES() {
    return ROUTES[this.chainId];
  }

  get POOL_CONFIG(): Record<string, IPoolConfig> {
    return POOL_CONFIG[this.chainId];
  }

  get EXPLORER_LINK() {
    return EXPLORER_URL_MAP[this.chainId];
  }

  get CONTRACT_ADDRESSES() {
    return CONTRACT_ADDRESSES_MAP[this.chainId];
  }
}

export default AccountStore;
