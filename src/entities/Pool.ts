import {
  IPoolConfig,
  IToken,
  NODE_URL_MAP,
  POOL_ID,
  poolConfigs,
  SLIPPAGE,
  TChainId,
  tokens,
} from "@src/constants";
import axios from "axios";
import { action, makeAutoObservable } from "mobx";
import BN from "@src/utils/BN";

interface IData {
  key: string;
  type: "integer";
  value: number;
}

class Pool implements IPoolConfig {
  public readonly chainId: TChainId;
  public readonly contractAddress: string;
  public readonly baseTokenId: string;
  public readonly name: string;
  public readonly defaultAssetId0: string;
  public readonly defaultAssetId1: string;
  public readonly tokens: Array<IToken & { shareAmount: number }> = [];
  public readonly id: POOL_ID;

  public getAssetById = (assetId: string) =>
    this.tokens.find((t) => assetId === t.assetId);

  public globalVolume: string = "–";
  @action.bound setGlobalVolume = (value: string) =>
    (this.globalVolume = value);

  public globalLiquidity: string = "–";
  @action.bound setGlobalLiquidity = (value: string) =>
    (this.globalLiquidity = value);

  public liquidity: Record<string, BN> = {};
  @action.bound private setLiquidity = (value: Record<string, BN>) =>
    (this.liquidity = value);

  constructor(id: POOL_ID, chainId: TChainId) {
    const config = poolConfigs[id];
    this.id = id;
    this.contractAddress = config.contractAddress;
    this.baseTokenId = config.baseTokenId;
    this.name = config.name;
    this.tokens = config.tokens;
    this.defaultAssetId0 = config.defaultAssetId0;
    this.defaultAssetId1 = config.defaultAssetId1;
    this.chainId = chainId;

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

    const usdnLiquidity = this.liquidity[tokens.USDN.assetId];
    const shareAmount = this.tokens.find(
      (t) => t.assetId === tokens.USDN.assetId
    )?.shareAmount;
    if (usdnLiquidity != null && shareAmount != null) {
      const globalLiquidity = new BN(usdnLiquidity)
        .div(shareAmount)
        .div(1e6)
        .toFormat(2);
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
}
export default Pool;
