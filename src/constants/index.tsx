import tokens from "./tokens.json";
import tokenLogos from "@src/assets/tokens/tokenLogos";

export { tokens };
export const SLIPPAGE = 0.97; //if puzzle slippage = 0
export const TRADE_FEE = 0.98;
export const CASHBACK_PERCENT = 0.004;

export enum POOL_ID {
  farmsPool1 = "farms",
  farmsPool2 = "farms2",
  defi = "defi",
  puzzle = "puzzle",
  race = "race",
}

export interface IToken {
  assetId: string;
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
}

export interface IPoolConfig {
  contractAddress: string;
  baseTokenId: string;
  name: string;
  defaultAssetId0: string;
  defaultAssetId1: string;
  tokens: Array<IToken & { shareAmount: number }>;
}

export const ROUTES = {
  ROOT: "/",
  STAKE: "/stake",
  pools: {
    farms: POOL_ID.farmsPool1,
    farms2: POOL_ID.farmsPool2,
    defi: POOL_ID.defi,
    race: POOL_ID.race,
    puzzle: POOL_ID.puzzle,
  },
  addLiquidity: {
    farms: `${POOL_ID.farmsPool1}/addLiquidity`,
    farms2: `${POOL_ID.farmsPool2}/addLiquidity`,
    race: `${POOL_ID.race}/addLiquidity`,
    defi: `${POOL_ID.defi}/addLiquidity`,
  },
};

export const poolConfigs: Record<POOL_ID, IPoolConfig> = {
  [POOL_ID.farmsPool1]: {
    contractAddress: "3PPRHHF9JKvDLkAc3aHD3Kd5tRZp1CoqAJa",
    baseTokenId: tokens.EGG.assetId,
    name: "Farms 1",
    defaultAssetId0: tokens.MATH.assetId,
    defaultAssetId1: tokens.USDN.assetId,
    tokens: [
      { ...tokens.DUXPLORER, shareAmount: 0.1, logo: tokenLogos.DUXPLORER },
      { ...tokens.MATH, shareAmount: 0.1, logo: tokenLogos.MATH },
      { ...tokens.TURTLE, shareAmount: 0.1, logo: tokenLogos.TURTLE },
      { ...tokens.EGGSEGGS, shareAmount: 0.1, logo: tokenLogos.EGGSEGGS },
      { ...tokens.PESOLATINO, shareAmount: 0.1, logo: tokenLogos.PESOLATINO },
      { ...tokens.FOMO, shareAmount: 0.1, logo: tokenLogos.FOMO },
      { ...tokens.MUNDO, shareAmount: 0.1, logo: tokenLogos.MUNDO },
      { ...tokens.EGGPOINT, shareAmount: 0.1, logo: tokenLogos.EGGPOINT },
      { ...tokens.EGG, shareAmount: 0.1, logo: tokenLogos.EGG },
      { ...tokens.USDN, shareAmount: 0.1, logo: tokenLogos.USDN },
    ],
  },
  [POOL_ID.farmsPool2]: {
    contractAddress: "3PKYPKJPHZENAAwH9e7TF5edDgukNxxBt3M",
    baseTokenId: tokens.EGG.assetId,
    name: "Farms 2",
    defaultAssetId0: tokens.MARVIN.assetId,
    defaultAssetId1: tokens.USDN.assetId,
    tokens: [
      { ...tokens.ENDO, shareAmount: 0.1, logo: tokenLogos.ENDO },
      { ...tokens.MARVIN, shareAmount: 0.1, logo: tokenLogos.MARVIN },
      { ...tokens.EGGMOON, shareAmount: 0.1, logo: tokenLogos.EGGMOON },
      { ...tokens.STREET, shareAmount: 0.1, logo: tokenLogos.STREET },
      { ...tokens.KOLKHOZ, shareAmount: 0.1, logo: tokenLogos.KOLKHOZ },
      { ...tokens.FORKLOG, shareAmount: 0.1, logo: tokenLogos.FORKLOG },
      { ...tokens.CGU, shareAmount: 0.1, logo: tokenLogos.CGU },
      { ...tokens.EGG, shareAmount: 0.2, logo: tokenLogos.EGG },
      { ...tokens.USDN, shareAmount: 0.1, logo: tokenLogos.USDN },
    ],
  },
  [POOL_ID.defi]: {
    contractAddress: "3PDrYPF6izza2sXWffzTPF7e2Fcir2CMpki",
    baseTokenId: tokens.USDN.assetId,
    name: "Waves DeFi",
    defaultAssetId0: tokens.EGG.assetId,
    defaultAssetId1: tokens.USDN.assetId,
    tokens: [
      { ...tokens.WAVES, shareAmount: 0.2, logo: tokenLogos.WAVES },
      { ...tokens.EGG, shareAmount: 0.1, logo: tokenLogos.EGG },
      { ...tokens.SWOP, shareAmount: 0.05, logo: tokenLogos.SWOP },
      { ...tokens.VIRES, shareAmount: 0.05, logo: tokenLogos.VIRES },
      { ...tokens.NSBT, shareAmount: 0.05, logo: tokenLogos.NSBT },
      { ...tokens.ENNO, shareAmount: 0.05, logo: tokenLogos.ENNO },
      { ...tokens.SIGN, shareAmount: 0.05, logo: tokenLogos.SIGN },
      { ...tokens.PUZZLE, shareAmount: 0.2, logo: tokenLogos.PUZZLE },
      { ...tokens.USDT, shareAmount: 0.1, logo: tokenLogos.USDT },
      { ...tokens.USDN, shareAmount: 0.15, logo: tokenLogos.USDN },
    ],
  },
  [POOL_ID.race]: {
    contractAddress: "3PNK5ypnPJioLmLUzfK6ezpaePHLxZd6QLj",
    baseTokenId: tokens.USDN.assetId,
    name: "MetaRace mega pool",
    defaultAssetId0: tokens.RACE.assetId,
    defaultAssetId1: tokens.USDN.assetId,
    tokens: [
      { ...tokens.EGG, shareAmount: 0.4, logo: tokenLogos.EGG },
      { ...tokens.RACE, shareAmount: 0.4, logo: tokenLogos.RACE },
      { ...tokens.USDN, shareAmount: 0.2, logo: tokenLogos.USDN },
    ],
  },
  [POOL_ID.puzzle]: {
    contractAddress: "3PFDgzu1UtswAkCMxqqQjbTeHaX4cMab8Kh",
    baseTokenId: tokens.USDN.assetId,
    name: "Puzzle Parent Pool",
    defaultAssetId0: tokens.PUZZLE.assetId,
    defaultAssetId1: tokens.USDN.assetId,
    tokens: [
      { ...tokens.USDT, shareAmount: 0.1, logo: tokenLogos.USDT },
      { ...tokens.PUZZLE, shareAmount: 0.8, logo: tokenLogos.PUZZLE },
      { ...tokens.USDN, shareAmount: 0.1, logo: tokenLogos.USDN },
    ],
  },
};
export type TChainId = "W" | "T";

export const NODE_URL_MAP: Record<TChainId, string> = {
  W: "https://wavesducks.wavesnodes.com",
  T: "https://nodes-testnet.wavesnodes.com",
};

// export const tokens: Record<string, ITokenConfig> = {
//   PUZZLE: {
//     assetId: "ddqVbZyTz88iWpyw1tFdsxwVKb1nnivJThi37eYEE8e",
//     name: "PUZZLE token",
//     symbol: "PUZZLE",
//     decimals: 1e8,
//     logo: puzzleLogo,
//   },
//   USDN: {
//     assetId: "5fKHyu9mSxCwBcu5Ujfx1p5Uvf8kjicNsVi2gQw1zqdL",
//     name: "USDN token",
//     symbol: "USDN",
//     decimals: 1e6,
//     logo: usdnLogo,
//   },
//   WAVES: {
//     assetId: "WAVES",
//     name: "WAVES token",
//     symbol: "WAVES",
//     decimals: 100000000,
//     logo: wavesLogo,
//   },
// };
//
// export const poolConfigs: Record<POOL_ID, IPoolConfig> = {
//   [POOL_ID.farmsPool1]: {
//     contractAddress: "3MwvyoYUQzKNQvLL24b3WyoD4EAfBxgTANQ",
//     baseTokenId: "",
//     name: "Farms 1",
//     defaultAssetId0: tokens.PUZZLE.assetId,
//     defaultAssetId1: tokens.USDN.assetId,
//     tokens: [
//       { ...tokens.PUZZLE, shareAmount: 0.2 },
//       { ...tokens.USDN, shareAmount: 0.4 },
//       { ...tokens.WAVES, shareAmount: 0.4 },
//     ],
//   },
//   [POOL_ID.farmsPool2]: {
//     contractAddress: "3MwvyoYUQzKNQvLL24b3WyoD4EAfBxgTANQ",
//     baseTokenId: "",
//     name: "Farms 2",
//     defaultAssetId0: tokens.PUZZLE.assetId,
//     defaultAssetId1: tokens.USDN.assetId,
//     tokens: [
//       { ...tokens.PUZZLE, shareAmount: 0.2 },
//       { ...tokens.USDN, shareAmount: 0.4 },
//       { ...tokens.WAVES, shareAmount: 0.4 },
//     ],
//   },
//   [POOL_ID.defi]: {
//     contractAddress: "3MwvyoYUQzKNQvLL24b3WyoD4EAfBxgTANQ",
//     baseTokenId: "",
//     name: "Defi",
//     defaultAssetId0: tokens.PUZZLE.assetId,
//     defaultAssetId1: tokens.USDN.assetId,
//     tokens: [
//       { ...tokens.PUZZLE, shareAmount: 0.2 },
//       { ...tokens.USDN, shareAmount: 0.4 },
//       { ...tokens.WAVES, shareAmount: 0.4 },
//     ],
//   },
//   [POOL_ID.puzzle]: {
//     contractAddress: "3MwvyoYUQzKNQvLL24b3WyoD4EAfBxgTANQ",
//     baseTokenId: "",
//     name: "Puzzle",
//     defaultAssetId0: tokens.PUZZLE.assetId,
//     defaultAssetId1: tokens.USDN.assetId,
//     tokens: [
//       { ...tokens.PUZZLE, shareAmount: 0.2 },
//       { ...tokens.USDN, shareAmount: 0.4 },
//       { ...tokens.WAVES, shareAmount: 0.4 },
//     ],
//   },
// };
