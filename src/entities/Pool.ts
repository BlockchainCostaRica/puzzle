import {
  IPoolConfig,
  ITokenConfig,
  POOL_NAMES,
  poolConfigs,
} from "@src/constants";
import axios from "axios";

// interface IData {
//   key: string;
//   type: "integer";
//   value: number;
// }

class Pool implements IPoolConfig {
  readonly contractAddress: string;
  readonly baseTokenId: string;
  readonly name: string;
  readonly tokens: Array<ITokenConfig>;

  constructor(name: POOL_NAMES) {
    const config = poolConfigs[name];
    this.contractAddress = config.contractAddress;
    this.baseTokenId = config.baseTokenId;
    this.name = config.name;
    this.tokens = config.tokens;
  }

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
