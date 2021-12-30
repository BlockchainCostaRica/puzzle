import testnetTokens from "./testnetTokens.json";
import tokenLogos from "@src/assets/tokens/tokenLogos";
import { IPoolConfig } from "@src/constants/index";

export { testnetTokens };

export enum TESTNET_POOL_ID {
  farmsPool = "farms",
}

export const TESTNET_ROUTES = {
  ROOT: "/",
  STAKE: "/stake",
  pools: {
    farms: TESTNET_POOL_ID.farmsPool,
  },
  addLiquidity: {
    farms: `${TESTNET_POOL_ID.farmsPool}/addLiquidity`,
  },
};

export const TESTNET_POOL_CONFIG: Record<TESTNET_POOL_ID, IPoolConfig> = {
  [TESTNET_POOL_ID.farmsPool]: {
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
