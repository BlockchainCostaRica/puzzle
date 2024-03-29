import {
  MAINNET_POOL_ID,
  MAINNET_ROUTES,
  MAINNET_POOL_CONFIG,
  mainnetTokens,
  MAINNET_CONTRACTS_ADDRESSES,
} from "@src/constants/mainnetConfig";
import {
  TESTNET_CONTRACTS_ADDRESSES,
  TESTNET_POOL_CONFIG,
  TESTNET_POOL_ID,
  TESTNET_ROUTES,
  testnetTokens,
} from "@src/constants/testnetConfig";

export const TOKENS = {
  W: mainnetTokens,
  T: testnetTokens,
};

export type TPoolId = MAINNET_POOL_ID | TESTNET_POOL_ID;

export const POOL_ID = {
  W: MAINNET_POOL_ID,
  T: TESTNET_POOL_ID,
};

export const ROUTES = {
  W: MAINNET_ROUTES,
  T: TESTNET_ROUTES,
};

export const POOL_CONFIG = {
  W: MAINNET_POOL_CONFIG,
  T: TESTNET_POOL_CONFIG,
};
export const CONTRACT_ADDRESSES_MAP = {
  W: MAINNET_CONTRACTS_ADDRESSES,
  T: TESTNET_CONTRACTS_ADDRESSES,
};

export type TChainId = "W" | "T";

export const NODE_URL_MAP: Record<TChainId, string> = {
  W: "https://nodes-puzzle.wavesnodes.com",
  T: "https://nodes-testnet.wavesnodes.com",
};
export const EXPLORER_URL_MAP: Record<TChainId, string> = {
  W: "https://wavesexplorer.com",
  T: "https://testnet.wavesexplorer.com",
};

export const SLIPPAGE = 0.95; //if puzzle slippage = 0
export const TRADE_FEE = 0.95;
export type TTokenCategory = "global" | "stable" | "defi" | "ducks";
export interface IToken {
  assetId: string;
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
  category?: string[];
}

export interface IPoolConfig {
  contractAddress: string;
  layer2Address?: string;
  baseTokenId: string;
  name: string;
  defaultAssetId0: string;
  defaultAssetId1: string;
  tokens: Array<IToken & { shareAmount: number } & { claimReward?: string }>;
  poolTokenName?: string;
  logo?: string;
}
