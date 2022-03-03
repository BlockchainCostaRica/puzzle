import {
  IPoolConfig,
  IToken,
  NODE_URL_MAP,
  TChainId,
  TPoolId,
  TRADE_FEE,
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

export interface IShortPoolInfo {
  poolId: string;
  liquidityInUsdn: BN;
  addressStaked: BN;
  shareOfPool: BN;
  indexTokenRate: BN;
  indexTokenName: string;
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

  public globalVolume: BN | null = null;
  @action.bound setGlobalVolume = (value: BN) => (this.globalVolume = value);

  public globalLiquidity: BN = BN.ZERO;
  @action.bound setGlobalLiquidity = (value: BN) =>
    (this.globalLiquidity = value);

  public globalPoolTokenAmount: BN = BN.ZERO;
  @action.bound setGlobalPoolTokenAmount = (value: BN) =>
    (this.globalPoolTokenAmount = value);

  public liquidity: Record<string, BN> = {};
  private setLiquidity = (value: Record<string, BN>) =>
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
    setInterval(this.syncLiquidity, 15000);
    makeAutoObservable(this);
  }

  private syncLiquidity = async () => {
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
      // const globalVolume = new BN(globalVolumeValue.value).div(1e6).toFormat(2);
      const globalVolume = new BN(globalVolumeValue.value).div(1e6);
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
    coefficient = TRADE_FEE
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
    const topValue = BN.formatUnits(liquidity1, decimals1).div(shareAmount1);
    const bottomValue = BN.formatUnits(liquidity0, decimals0).div(shareAmount0);
    return topValue.div(bottomValue).times(coefficient);
  };

  @action.bound public getAccountLiquidityInfo = async (
    address: string
  ): Promise<IShortPoolInfo> => {
    const [globalValues, addressValues, staticPoolDomainValue] =
      await Promise.all([
        this.contractRequest(`global_(.*)`),
        this.contractRequest(`${address}_indexStaked`),
        this.contractRequest(`static_poolDomain`),
      ]);

    const staticPoolDomain =
      staticPoolDomainValue && staticPoolDomainValue[0].value;
    const keysArray = {
      addressIndexStaked: `${address}_indexStaked`,
      globalIndexStaked: `global_indexStaked`,
      globalPoolTokenAmount: "global_poolToken_amount",
    };

    const parsedNodeResponse = [
      ...(globalValues ?? []),
      ...(addressValues ?? []),
    ].reduce<Record<string, BN>>((acc, { key, value }) => {
      Object.entries(keysArray).forEach(([regName, regValue]) => {
        const regexp = new RegExp(regValue);
        if (regexp.test(key)) {
          acc[regName] = new BN(value);
        }
      });
      return acc;
    }, {});
    console.log(parsedNodeResponse);
    const addressIndexStaked = parsedNodeResponse["addressIndexStaked"];
    const globalIndexStaked = parsedNodeResponse["globalIndexStaked"];
    const globalPoolTokenAmount = parsedNodeResponse["globalPoolTokenAmount"];
    const indexTokenRate = this.globalLiquidity.div(
      BN.formatUnits(globalPoolTokenAmount, 8)
    );

    if (addressIndexStaked == null || addressIndexStaked.eq(0)) {
      return {
        addressStaked: BN.ZERO,
        liquidityInUsdn: BN.ZERO,
        shareOfPool: BN.ZERO,
        poolId: this.id,
        indexTokenRate,
        indexTokenName: "PZ" + staticPoolDomain,
      };
    }
    const liquidityInUsdn = this.globalLiquidity
      .times(addressIndexStaked)
      .div(globalIndexStaked);
    const percent = liquidityInUsdn
      .times(new BN(100))
      .div(this.globalLiquidity);

    return {
      liquidityInUsdn,
      addressStaked: addressIndexStaked,
      shareOfPool: percent,
      poolId: this.id,
      indexTokenRate,
      indexTokenName: "PZ" + staticPoolDomain,
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
