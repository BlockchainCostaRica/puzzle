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

  public globalLiquidity: string = "–";
  @action.bound setGlobalLiquidity = (value: string) =>
    (this.globalLiquidity = value);

  public globalLiquidityRaw: BN = BN.ZERO;
  @action.bound setGlobalLiquidityRaw = (value: BN) =>
    (this.globalLiquidityRaw = value);

  public liquidity: Record<string, BN> = {};
  @action.bound private setLiquidity = (value: Record<string, BN>) =>
    (this.liquidity = value);

  constructor(params: IPoolCreationParams) {
    this.id = params.id;
    this.contractAddress = params.config.contractAddress;
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
      this.setGlobalLiquidity(globalLiquidity.toFormat(2));
      this.setGlobalLiquidityRaw(globalLiquidity);
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

  // updateTokens = async () => {
  //   const staticAttributesUrl = `https://wavesducks.wavesnodes.com/addresses/data/${this.contractAddress}?matches=static_(.*)`;
  //   const { data }: { data: IData[] } = await axios.get(staticAttributesUrl);
  //   const tokens = data.reduce((acc, { key, value }) => {
  //     const id = key.split("_")[1];
  //     const attribute = key.split("_")[2];
  //     const index = acc.findIndex((token) => token.id === id);
  //     if (index === -1) {
  //       // acc[index] =
  //     } else {
  //     }
  //     return acc;
  //   }, [] as Array<{ id: string; decimals: number; weight: number }>);
  // };

  @action.bound public getAccountLiquidityInfo = async (
    address: string
  ): Promise<{ liquidity: string; percent: string }> => {
    //todo change contractRequest
    const ADDRESSIndexStakedUrl = `${
      NODE_URL_MAP[this.chainId]
    }/addresses/data/${this.contractAddress}?matches=${address}_indexStaked`;

    //todo change contractRequest
    const globalIndexStakedResponse = `${
      NODE_URL_MAP[this.chainId]
    }/addresses/data/${this.contractAddress}?matches=global_indexStaked`;

    const nodeRes = await Promise.all([
      axios.get(ADDRESSIndexStakedUrl),
      axios.get(globalIndexStakedResponse),
    ]);

    const ADDRESS_indexStaked =
      nodeRes[0].data.length >= 1 ? new BN(nodeRes[0].data[0].value) : BN.ZERO;
    const global_indexStaked =
      nodeRes[1].data.length >= 1 ? new BN(nodeRes[1].data[0].value) : BN.ZERO;

    if (ADDRESS_indexStaked.eq(0)) {
      return {
        liquidity: "$ 0",
        percent: "0 %",
      };
    }
    const liquidity = this.globalLiquidityRaw
      .times(ADDRESS_indexStaked)
      .div(global_indexStaked);
    const percent = liquidity.times(new BN(100)).div(this.globalLiquidityRaw);

    return {
      liquidity: "$ " + liquidity.toFormat(2),
      percent: percent.toFormat(2).concat(" %"),
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
