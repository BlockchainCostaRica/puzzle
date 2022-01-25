import {
  IPoolConfig,
  IToken,
  NODE_URL_MAP,
  SLIPPAGE,
  TChainId,
  TPoolId,
} from "@src/constants";
import axios from "axios";
import { action, makeAutoObservable } from "mobx";
import BN from "@src/utils/BN";
import tokenLogos from "@src/assets/tokens/tokenLogos";

interface IData {
  key: string;
  type: "integer";
  value: number;
}

interface IPoolCreationParams {
  id: TPoolId;
  chainId: TChainId;
  config: IPoolConfig;
}

class Pool implements IPoolConfig {
  public readonly chainId: TChainId;
  public readonly contractAddress: string;
  public readonly layer2Address?: string;
  public readonly baseTokenId: string;
  public readonly name: string;
  public readonly defaultAssetId0: string;
  public readonly defaultAssetId1: string;
  public readonly tokens: Array<IToken & { shareAmount: number }> = [];
  public readonly id: TPoolId;
  private readonly _logo?: string;

  public get logo() {
    return this._logo ?? tokenLogos.UNKNOWN;
  }

  public get baseToken() {
    return this.getAssetById(this.baseTokenId);
  }

  public getAssetById = (assetId: string) =>
    this.tokens.find((t) => assetId === t.assetId);

  public globalVolume: string = "–";
  @action.bound setGlobalVolume = (value: string) =>
    (this.globalVolume = value);

  public globalLiquidity: BN = BN.ZERO;
  @action.bound setGlobalLiquidity = (value: BN) =>
    (this.globalLiquidity = value);

  public globalPoolTokenAmount: BN = BN.ZERO;
  @action.bound setGlobalPoolTokenAmount = (value: BN) =>
    (this.globalPoolTokenAmount = value);

  public liquidity: Record<string, BN> = {};
  @action.bound private setLiquidity = (value: Record<string, BN>) =>
    (this.liquidity = value);

  constructor(params: IPoolCreationParams) {
    this.id = params.id;
    this.contractAddress = params.config.contractAddress;
    this.layer2Address = params.config.layer2Address;
    this.baseTokenId = params.config.baseTokenId;
    this.name = params.config.name;
    this._logo = params.config.logo;
    this.tokens = params.config.tokens;
    this.defaultAssetId0 = params.config.defaultAssetId0;
    this.defaultAssetId1 = params.config.defaultAssetId1;
    this.chainId = params.chainId;

    this.syncLiquidity().then();
    setInterval(this.syncLiquidity, 5000);
    makeAutoObservable(this);
  }

  @action.bound private syncLiquidity = async () => {
    const globalAttributesUrl = `${NODE_URL_MAP[this.chainId]}/addresses/data/${
      this.contractAddress
    }?matches=global_(.*)`;
    const { data }: { data: IData[] } = await axios.get(globalAttributesUrl);
    const balances = data.reduce<Record<string, BN>>((acc, { key, value }) => {
      const regexp = new RegExp("global_(.*)_balance");
      regexp.test(key) && (acc[key.match(regexp)![1]] = new BN(value));
      return acc;
    }, {});
    this.setLiquidity(balances);

    const globalPoolTokenAmount = data.find(
      (v) => v.key === "global_poolToken_amount"
    );
    if (globalPoolTokenAmount?.value != null) {
      this.setGlobalPoolTokenAmount(new BN(globalPoolTokenAmount.value));
    }

    // Math.floor(this.state.data.get("global_volume") / 1000000);
    const globalVolumeValue = data.find((v) => v.key === "global_volume");
    if (globalVolumeValue?.value != null) {
      const globalVolume = new BN(globalVolumeValue.value).div(1e6).toFormat(2);
      this.setGlobalVolume(globalVolume);
    }
    const usdnAsset = this.tokens.find(({ symbol }) => symbol === "USDN")!;
    const usdnLiquidity = this.liquidity[usdnAsset.assetId];
    if (usdnLiquidity != null && usdnAsset.shareAmount != null) {
      const globalLiquidity = new BN(usdnLiquidity)
        .div(usdnAsset.shareAmount)
        .div(1e6);
      this.setGlobalLiquidity(globalLiquidity);
    }
  };

  currentPrice = (
    assetId0: string,
    assetId1: string,
    coefficient = SLIPPAGE
  ): BN | null => {
    if (this.tokens == null) return null;
    const asset0 = this.getAssetById(assetId0);
    const asset1 = this.getAssetById(assetId1);
    if (asset0?.shareAmount == null || asset1?.shareAmount == null) return null;
    const { decimals: decimals0, shareAmount: shareAmount0 } = asset0;
    const { decimals: decimals1, shareAmount: shareAmount1 } = asset1;
    const liquidity0 = this.liquidity[assetId0];
    const liquidity1 = this.liquidity[assetId1];
    if (liquidity0 == null || liquidity1 == null) return null;
    //(Balance Out / Weight Out) / (Balance In / Weight In)
    const topValue = BN.formatUnits(liquidity1, decimals1).div(shareAmount1);
    const bottomValue = BN.formatUnits(liquidity0, decimals0).div(shareAmount0);
    return topValue.div(bottomValue).times(coefficient);
  };

  @action.bound public getAccountLiquidityInfo = async (
    address: string
  ): Promise<{ liquidity: BN; percent: BN }> => {
    const [address_indexStaked, global_indexStaked] = await Promise.all([
      this.contractRequest(`${address}_indexStaked`),
      this.contractRequest(`global_indexStaked`),
    ]);

    //poolLiquidity * ADDRESS_indexStaked / global_indexStaked
    const addressIndexStaked =
      address_indexStaked && address_indexStaked.length >= 1
        ? new BN(address_indexStaked[0].value)
        : BN.ZERO;

    const globalIndexStaked =
      global_indexStaked && global_indexStaked.length >= 1
        ? new BN(global_indexStaked[0].value)
        : BN.ZERO;

    if (addressIndexStaked.eq(0)) {
      return {
        liquidity: BN.ZERO,
        percent: BN.ZERO,
      };
    }
    const liquidity = this.globalLiquidity
      .times(addressIndexStaked)
      .div(globalIndexStaked);
    const percent = liquidity.times(new BN(100)).div(this.globalLiquidity);

    return {
      liquidity: liquidity,
      percent: percent,
    };
  };

  public contractRequest = async (match: string) => {
    const url = `${NODE_URL_MAP[this.chainId]}/addresses/data/${
      this.contractAddress
    }?matches=${match}`;
    const response: { data: IData[] } = await axios.get(url);
    if (response.data) {
      return response.data;
    } else {
      return null;
    }
  };
}

export default Pool;
