import mainnetTokens from "./mainnetTokens.json";
import tokenLogos from "@src/assets/tokens/tokenLogos";
import { IPoolConfig } from "@src/constants/index";

export { mainnetTokens };

export enum MAINNET_POOL_ID {
  farmsPool1 = "farms",
  farmsPool2 = "farms2",
  defi = "defi",
  puzzle = "puzzle",
  race = "race",
}

export const MAINNET_ROUTES = {
  ROOT: "/",
  STAKE: "/stake",
  INVEST: "/invest",
  pools: {
    farms: MAINNET_POOL_ID.farmsPool1,
    farms2: MAINNET_POOL_ID.farmsPool2,
    defi: MAINNET_POOL_ID.defi,
    race: MAINNET_POOL_ID.race,
    puzzle: MAINNET_POOL_ID.puzzle,
  },
  addLiquidity: {
    farms: `${MAINNET_POOL_ID.farmsPool1}/addLiquidity`,
    farms2: `${MAINNET_POOL_ID.farmsPool2}/addLiquidity`,
    race: `${MAINNET_POOL_ID.race}/addLiquidity`,
    defi: `${MAINNET_POOL_ID.defi}/addLiquidity`,
  },
  addOneToken: {
    farms: `${MAINNET_POOL_ID.farmsPool1}/addOneToken`,
    farms2: `${MAINNET_POOL_ID.farmsPool2}/addOneToken`,
    race: `${MAINNET_POOL_ID.race}/addOneToken`,
    defi: `${MAINNET_POOL_ID.defi}/addOneToken`,
  },
  invest: {
    farms: `${MAINNET_POOL_ID.farmsPool1}/invest`,
    farms2: `${MAINNET_POOL_ID.farmsPool2}/invest`,
    race: `${MAINNET_POOL_ID.race}/invest`,
    defi: `${MAINNET_POOL_ID.defi}/invest`,
  },
};

export const MAINNET_POOL_CONFIG: Record<MAINNET_POOL_ID, IPoolConfig> = {
  [MAINNET_POOL_ID.farmsPool1]: {
    contractAddress: "3PPRHHF9JKvDLkAc3aHD3Kd5tRZp1CoqAJa",
    baseTokenId: mainnetTokens.EGG.assetId,
    name: "Farms 1",
    defaultAssetId0: mainnetTokens.MATH.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      {
        ...mainnetTokens.DUXPLORER,
        shareAmount: 0.1,
        logo: tokenLogos.DUXPLORER,
      },
      { ...mainnetTokens.MATH, shareAmount: 0.1, logo: tokenLogos.MATH },
      { ...mainnetTokens.TURTLE, shareAmount: 0.1, logo: tokenLogos.TURTLE },
      {
        ...mainnetTokens.EGGSEGGS,
        shareAmount: 0.1,
        logo: tokenLogos.EGGSEGGS,
      },
      {
        ...mainnetTokens.PESOLATINO,
        shareAmount: 0.1,
        logo: tokenLogos.PESOLATINO,
      },
      { ...mainnetTokens.FOMO, shareAmount: 0.1, logo: tokenLogos.FOMO },
      { ...mainnetTokens.MUNDO, shareAmount: 0.1, logo: tokenLogos.MUNDO },
      {
        ...mainnetTokens.EGGPOINT,
        shareAmount: 0.1,
        logo: tokenLogos.EGGPOINT,
      },
      { ...mainnetTokens.EGG, shareAmount: 0.1, logo: tokenLogos.EGG },
      { ...mainnetTokens.USDN, shareAmount: 0.1, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.farmsPool2]: {
    contractAddress: "3PKYPKJPHZENAAwH9e7TF5edDgukNxxBt3M",
    baseTokenId: mainnetTokens.EGG.assetId,
    name: "Farms 2",
    defaultAssetId0: mainnetTokens.MARVIN.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.ENDO, shareAmount: 0.1, logo: tokenLogos.ENDO },
      { ...mainnetTokens.MARVIN, shareAmount: 0.1, logo: tokenLogos.MARVIN },
      { ...mainnetTokens.EGGMOON, shareAmount: 0.1, logo: tokenLogos.EGGMOON },
      { ...mainnetTokens.STREET, shareAmount: 0.1, logo: tokenLogos.STREET },
      { ...mainnetTokens.KOLKHOZ, shareAmount: 0.1, logo: tokenLogos.KOLKHOZ },
      { ...mainnetTokens.FORKLOG, shareAmount: 0.1, logo: tokenLogos.FORKLOG },
      { ...mainnetTokens.CGU, shareAmount: 0.1, logo: tokenLogos.CGU },
      { ...mainnetTokens.EGG, shareAmount: 0.2, logo: tokenLogos.EGG },
      { ...mainnetTokens.USDN, shareAmount: 0.1, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.defi]: {
    contractAddress: "3PDrYPF6izza2sXWffzTPF7e2Fcir2CMpki",
    baseTokenId: mainnetTokens.USDN.assetId,
    name: "DeFi",
    defaultAssetId0: mainnetTokens.EGG.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.WAVES, shareAmount: 0.2, logo: tokenLogos.WAVES },
      { ...mainnetTokens.EGG, shareAmount: 0.1, logo: tokenLogos.EGG },
      { ...mainnetTokens.SWOP, shareAmount: 0.05, logo: tokenLogos.SWOP },
      { ...mainnetTokens.VIRES, shareAmount: 0.05, logo: tokenLogos.VIRES },
      { ...mainnetTokens.NSBT, shareAmount: 0.05, logo: tokenLogos.NSBT },
      { ...mainnetTokens.ENNO, shareAmount: 0.05, logo: tokenLogos.ENNO },
      { ...mainnetTokens.SIGN, shareAmount: 0.05, logo: tokenLogos.SIGN },
      { ...mainnetTokens.PUZZLE, shareAmount: 0.2, logo: tokenLogos.PUZZLE },
      { ...mainnetTokens.USDT, shareAmount: 0.1, logo: tokenLogos.USDT },
      { ...mainnetTokens.USDN, shareAmount: 0.15, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.race]: {
    contractAddress: "3PNK5ypnPJioLmLUzfK6ezpaePHLxZd6QLj",
    baseTokenId: mainnetTokens.USDN.assetId,
    name: "Race",
    defaultAssetId0: mainnetTokens.RACE.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.EGG, shareAmount: 0.4, logo: tokenLogos.EGG },
      { ...mainnetTokens.RACE, shareAmount: 0.4, logo: tokenLogos.RACE },
      { ...mainnetTokens.USDN, shareAmount: 0.2, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.puzzle]: {
    contractAddress: "3PFDgzu1UtswAkCMxqqQjbTeHaX4cMab8Kh",
    baseTokenId: mainnetTokens.USDN.assetId,
    name: "Puzzle",
    defaultAssetId0: mainnetTokens.PUZZLE.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.USDT, shareAmount: 0.1, logo: tokenLogos.USDT },
      { ...mainnetTokens.PUZZLE, shareAmount: 0.8, logo: tokenLogos.PUZZLE },
      { ...mainnetTokens.USDN, shareAmount: 0.1, logo: tokenLogos.USDN },
    ],
  },
};
