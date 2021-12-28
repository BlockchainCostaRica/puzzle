import {
  IPoolConfig,
  IToken,
  NODE_URL_MAP,
  POOL_ID,
  poolConfigs,
  TChainId,
  tokens,
} from "@src/constants";
import axios from "axios";
import { action, makeAutoObservable } from "mobx";
import BigNumber from "bignumber.js";

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

  public globalVolume: string = "–";
  @action.bound setGlobalVolume = (value: string) =>
    (this.globalVolume = value);

  public globalLiquidity: string = "–";
  @action.bound setGlobalLiquidity = (value: string) =>
    (this.globalLiquidity = value);

  public liquidity: Record<string, number> = {};
  @action.bound private setLiquidity = (value: Record<string, number>) =>
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
    const balances = data.reduce<Record<string, number>>(
      (acc, { key, value }) => {
        const regexp = new RegExp("global_(.*)_balance");
        regexp.test(key) && (acc[key.match(regexp)![1]] = value);
        return acc;
      },
      {}
    );
    this.setLiquidity(balances);

    // Math.floor(this.state.data.get("global_volume") / 1000000);
    const globalVolumeValue = data.find((v) => v.key === "global_volume");
    if (globalVolumeValue?.value != null) {
      const globalVolume = new BigNumber(globalVolumeValue.value)
        .div(1e6)
        .toFormat(2);
      this.setGlobalVolume(globalVolume);
    }

    const usdnLiquidity = this.liquidity[tokens.USDN.assetId];
    const shareAmount = this.tokens.find(
      (t) => t.assetId === tokens.USDN.assetId
    )?.shareAmount;
    if (usdnLiquidity != null && shareAmount != null) {
      const globalLiquidity = new BigNumber(usdnLiquidity)
        .div(shareAmount)
        .div(1e6)
        .toFormat(2);
      this.setGlobalLiquidity(globalLiquidity);
    }
  };

  currentPrice = (
    assetId0: string,
    assetId1: string,
    coefficient = 0.98
  ): BigNumber | null => {
    if (this.tokens == null) return null;
    const asset0 = this.tokens.find(({ assetId }) => assetId === assetId0);
    const asset1 = this.tokens.find(({ assetId }) => assetId === assetId1);
    if (asset0?.shareAmount == null || asset1?.shareAmount == null) return null;
    const liquidity0 = this.liquidity[assetId0];
    const liquidity1 = this.liquidity[assetId1];
    if (liquidity0 == null || liquidity1 == null) return null;
    //(Balance Out / Weight Out) / (Balance In / Weight In)

    const bottomValue = new BigNumber(liquidity0)
      .div(asset0!.decimals)
      .div(asset0!.shareAmount);

    const topValue = new BigNumber(liquidity1)
      .div(asset1!.decimals)
      .div(asset1!.shareAmount);

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
