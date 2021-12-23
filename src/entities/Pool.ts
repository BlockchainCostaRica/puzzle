import {
  IPoolConfig,
  ITokenConfig,
  NODE_URL_MAP,
  POOL_NAMES,
  poolConfigs,
} from "@src/constants";
import axios from "axios";
import { makeAutoObservable } from "mobx";

interface IData {
  key: string;
  type: "integer";
  value: number;
}

class Pool implements IPoolConfig {
  public readonly contractAddress: string;
  public readonly baseTokenId: string;
  public readonly name: string;
  public readonly tokens: Array<ITokenConfig>;
  public balances: Record<string, number> = {};

  constructor(name: POOL_NAMES) {
    const config = poolConfigs[name];
    this.contractAddress = config.contractAddress;
    this.baseTokenId = config.baseTokenId;
    this.name = config.name;
    this.tokens = config.tokens;

    this.syncBalances().then();
    setInterval(this.syncBalances, 5000);
    makeAutoObservable(this);
  }

  syncBalances = async () => {
    const globalAttributesUrl = `${NODE_URL_MAP["W"]}/addresses/data/${this.contractAddress}?matches=global_(.*)_balance`;
    const { data }: { data: IData[] } = await axios.get(globalAttributesUrl);
    this.balances = data.reduce<Record<string, number>>(
      (acc, { key, value }) => {
        const regexp = new RegExp("global_(.*)_balance");
        regexp.test(key) && (acc[key.match(regexp)![1]] = value);
        return acc;
      },
      {}
    );
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
