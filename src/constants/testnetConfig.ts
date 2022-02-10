import testnetTokens from "./testnetTokens.json";
import tokenLogos from "@src/assets/tokens/tokenLogos";
import { IPoolConfig } from "@src/constants/index";
import { MAINNET_POOL_ID } from "@src/constants/mainnetConfig";

export { testnetTokens };

export enum TESTNET_POOL_ID {
  farmsPool1 = "farms",
}

export const TESTNET_ROUTES = {
  ROOT: "/",
  STAKE: "/stake",
  TRADE: "/trade",
  INVEST: "/invest",
  ULTRASTAKE: "/ultrastake",
  withdraw: {
    farms: `${TESTNET_POOL_ID.farmsPool1}/withdraw`,
  },
  pools: {
    farms: TESTNET_POOL_ID.farmsPool1,
  },
  addLiquidity: {
    farms: `${TESTNET_POOL_ID.farmsPool1}/addLiquidity`,
  },
  addOneToken: {
    farms: `${MAINNET_POOL_ID.farmsPool1}/addOneToken`,
  },
  invest: {
    farms: `${MAINNET_POOL_ID.farmsPool1}/invest`,
  },
};

export const TESTNET_POOL_CONFIG: Record<TESTNET_POOL_ID, IPoolConfig> = {
  [TESTNET_POOL_ID.farmsPool1]: {
    contractAddress: "3MwvyoYUQzKNQvLL24b3WyoD4EAfBxgTANQ",
    baseTokenId: "",
    name: "Farms 1",
    defaultAssetId0: testnetTokens.USDN.assetId,
    defaultAssetId1: testnetTokens.WAVES.assetId,
    tokens: [
      { ...testnetTokens.PUZZLE, logo: tokenLogos.PUZZLE, shareAmount: 0.2 },
      { ...testnetTokens.USDN, logo: tokenLogos.USDN, shareAmount: 0.4 },
      { ...testnetTokens.WAVES, logo: tokenLogos.WAVES, shareAmount: 0.4 },
    ],
  },
};

export const TESTNET_CONTRACTS_ADDRESSES = {
  staking: "",
  ultraStaking: "",
  aggregator: "",
};

export const TESTNET_NFT_ISSUERS_WHITELIST = [];
