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
  egg = "egg",
}

export const MAINNET_ROUTES = {
  ROOT: "/",
  STAKE: "/stake",
  TRADE: "/trade",
  INVEST: "/invest",
  ULTRASTAKE: "/ultrastake",
  withdraw: {
    farms: `${MAINNET_POOL_ID.farmsPool1}/withdraw`,
    farms2: `${MAINNET_POOL_ID.farmsPool2}/withdraw`,
    race: `${MAINNET_POOL_ID.race}/withdraw`,
    defi: `${MAINNET_POOL_ID.defi}/withdraw`,
    egg: `${MAINNET_POOL_ID.egg}/withdraw`,
  },
  pools: {
    farms: MAINNET_POOL_ID.farmsPool1,
    farms2: MAINNET_POOL_ID.farmsPool2,
    defi: MAINNET_POOL_ID.defi,
    race: MAINNET_POOL_ID.race,
    puzzle: MAINNET_POOL_ID.puzzle,
    egg: MAINNET_POOL_ID.egg,
  },
  addLiquidity: {
    farms: `${MAINNET_POOL_ID.farmsPool1}/addLiquidity`,
    farms2: `${MAINNET_POOL_ID.farmsPool2}/addLiquidity`,
    race: `${MAINNET_POOL_ID.race}/addLiquidity`,
    defi: `${MAINNET_POOL_ID.defi}/addLiquidity`,
    egg: `${MAINNET_POOL_ID.egg}/addLiquidity`,
  },
  addOneToken: {
    farms: `${MAINNET_POOL_ID.farmsPool1}/addOneToken`,
    farms2: `${MAINNET_POOL_ID.farmsPool2}/addOneToken`,
    race: `${MAINNET_POOL_ID.race}/addOneToken`,
    defi: `${MAINNET_POOL_ID.defi}/addOneToken`,
    egg: `${MAINNET_POOL_ID.egg}/addOneToken`,
  },
  invest: {
    farms: `${MAINNET_POOL_ID.farmsPool1}/invest`,
    farms2: `${MAINNET_POOL_ID.farmsPool2}/invest`,
    race: `${MAINNET_POOL_ID.race}/invest`,
    defi: `${MAINNET_POOL_ID.defi}/invest`,
    egg: `${MAINNET_POOL_ID.egg}/invest`,
  },
};

export const MAINNET_POOL_CONFIG: Record<MAINNET_POOL_ID, IPoolConfig> = {
  [MAINNET_POOL_ID.farmsPool1]: {
    contractAddress: "3PPRHHF9JKvDLkAc3aHD3Kd5tRZp1CoqAJa",
    layer2Address: "3PDVDYZiwJzK3pu8vcknuLiKCYBPx6XZntG",
    baseTokenId: mainnetTokens.EGG.assetId,
    name: "Farms 1",
    logo: tokenLogos.EGG,
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
    layer2Address: "3PLNxoMJYKzcA8qQ7hQidGDaUJNvM4w36nj",
    baseTokenId: mainnetTokens.EGG.assetId,
    name: "Farms 2",
    logo: tokenLogos.EGG,
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
    layer2Address: "3PJAg4A4gPQXtSLKQNAf5VxbXV2QVM9wPei",
    baseTokenId: mainnetTokens.USDN.assetId,
    name: "DeFi",
    logo: tokenLogos.WAVES,
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
    layer2Address: "3PQSAdwsdyPVVpfBwjtgXboVXUZgeYHycWM",
    baseTokenId: mainnetTokens.USDN.assetId,
    name: "Race",
    logo: tokenLogos.RACE,
    defaultAssetId0: mainnetTokens.RACE.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.EGG, shareAmount: 0.4, logo: tokenLogos.EGG },
      { ...mainnetTokens.RACE, shareAmount: 0.4, logo: tokenLogos.RACE },
      { ...mainnetTokens.USDN, shareAmount: 0.2, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.egg]: {
    contractAddress: "3PMHkdVCzeLAYuCh92FPtusuxdLk5xMB51y",
    layer2Address: "3P84BhX5dCVs1TCgYnGa57kCHrMz4mUBXyE",
    baseTokenId: mainnetTokens.EGG.assetId,
    name: "Egg",
    logo: tokenLogos.EGG,
    defaultAssetId0: mainnetTokens.USDN.assetId,
    defaultAssetId1: mainnetTokens.EGG.assetId,
    tokens: [
      { ...mainnetTokens.EGG, shareAmount: 0.8, logo: tokenLogos.EGG },
      { ...mainnetTokens.USDN, shareAmount: 0.2, logo: tokenLogos.USDN },
    ],
  },
  [MAINNET_POOL_ID.puzzle]: {
    contractAddress: "3PFDgzu1UtswAkCMxqqQjbTeHaX4cMab8Kh",
    baseTokenId: mainnetTokens.USDN.assetId,
    name: "Puzzle",
    logo: tokenLogos.PUZZLE,
    defaultAssetId0: mainnetTokens.PUZZLE.assetId,
    defaultAssetId1: mainnetTokens.USDN.assetId,
    tokens: [
      { ...mainnetTokens.USDT, shareAmount: 0.1, logo: tokenLogos.USDT },
      { ...mainnetTokens.PUZZLE, shareAmount: 0.8, logo: tokenLogos.PUZZLE },
      { ...mainnetTokens.USDN, shareAmount: 0.1, logo: tokenLogos.USDN },
    ],
  },
};

export const MAINNET_CONTRACTS_ADDRESSES = {
  staking: "3PFTbywqxtFfukX3HyT881g4iW5K4QL3FAS",
  ultraStaking: "3PKUxbZaSYfsR7wu2HaAgiirHYwAMupDrYW",
  aggregator: "3PGFHzVGT4NTigwCKP1NcwoXkodVZwvBuuU",
};
