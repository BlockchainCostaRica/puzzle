import {
  IPoolConfig,
  ITokenConfig,
  NODE_URL_MAP,
  POOL_ID,
  poolConfigs,
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
  public readonly contractAddress: string;
  public readonly baseTokenId: string;
  public readonly name: string;
  public readonly defaultAssetId0: string;
  public readonly defaultAssetId1: string;
  public readonly tokens: Array<ITokenConfig> = [];
  public readonly id: POOL_ID;

  public globalVolume: string = "–";
  @action.bound setGlobalVolume = (value: string) =>
    (this.globalVolume = value);

  public globalLiquidity: string = "–";
  @action.bound setGlobalLiquidity = (value: string) =>
    (this.globalLiquidity = value);

  public balances: Record<string, number> = {};
  @action.bound setBalances = (value: Record<string, number>) =>
    (this.balances = value);

  constructor(id: POOL_ID) {
    const config = poolConfigs[id];
    this.id = id;
    this.contractAddress = config.contractAddress;
    this.baseTokenId = config.baseTokenId;
    this.name = config.name;
    this.tokens = config.tokens;
    this.defaultAssetId0 = config.defaultAssetId0;
    this.defaultAssetId1 = config.defaultAssetId1;

    this.syncBalances().then();
    setInterval(this.syncBalances, 5000);
    makeAutoObservable(this);
  }

  syncBalances = async () => {
    const globalAttributesUrl = `${NODE_URL_MAP["W"]}/addresses/data/${this.contractAddress}?matches=global_(.*)`;
    const { data }: { data: IData[] } = await axios.get(globalAttributesUrl);
    const balances = data.reduce<Record<string, number>>(
      (acc, { key, value }) => {
        const regexp = new RegExp("global_(.*)_balance");
        regexp.test(key) && (acc[key.match(regexp)![1]] = value);
        return acc;
      },
      {}
    );
    this.setBalances(balances);

    // Math.floor(this.state.data.get("global_volume") / 1000000);
    const globalVolumeValue = data.find((v) => v.key === "global_volume");
    if (globalVolumeValue?.value != null) {
      const globalVolume = new BigNumber(globalVolumeValue.value)
        .div(1e6)
        .toFormat(2)
        .toString();
      this.setGlobalVolume(globalVolume);
    }

    //global_USDN_balance / (static_USDN_weight/100)
    const usdnAssetId = "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p";
    const usdnToken = this.tokens.find((t) => t.assetId === usdnAssetId);
    const usdnBalance = this.balances[usdnAssetId];
    if (usdnToken != null && usdnBalance != null) {
      const globalLiquidity = new BigNumber(usdnBalance)
        .div(usdnToken.shareAmount)
        .div(1e6)
        .toFormat(2)
        .toString();
      this.setGlobalVolume(globalLiquidity);
    }
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
