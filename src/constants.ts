import mathLogo from "@src/assets/tokens/math-logo.png";
import turtleLogo from "@src/assets/tokens/turtle-logo.png";
import eggseggsLogo from "@src/assets/tokens/eggseggs-logo.jpeg";
import latinaLogo from "@src/assets/tokens/latina-logo.png";
import fomoLogo from "@src/assets/tokens/fomo-logo.jpeg";
import mundoLogo from "@src/assets/tokens/mundo-logo.jpeg";
import eggPointLogo from "@src/assets/tokens/eggpoint-logo.jpeg";
import eggLogo from "@src/assets/tokens/EGG.svg";
import endoLogo from "@src/assets/tokens/endo-logo.jpeg";
import marvinLogo from "@src/assets/tokens/marvin-logo.jpeg";
import eggmoonLogo from "@src/assets/tokens/ido-logo.jpeg";
import streetLogo from "@src/assets/tokens/street-logo.svg";
import kolkhozLogo from "@src/assets/tokens/kolkhoz-logo.jpeg";
import cartelLogo from "@src/assets/tokens/cartel-logo.png";
import cguLogo from "@src/assets/tokens/cgu-logo.png";
import swopLogo from "@src/assets/tokens/SWOP.svg";
import viresLogo from "@src/assets/tokens/VIRES.svg";
import nsbtLogo from "@src/assets/tokens/nsbt-logo.svg";
import ennoLogo from "@src/assets/tokens/enno-logo.svg";
import signLogo from "@src/assets/tokens/sign-logo.svg";
import duxplorerLogo from "@src/assets/tokens/duxplorer-logo.png";
import usdtLogo from "@src/assets/tokens/USDT.svg";
import puzzleLogo from "@src/assets/tokens/PUZZLE.svg";
import wavesLogo from "@src/assets/tokens/waves.png";
import usdnLogo from "@src/assets/tokens/usdn-logo.svg";

export enum POOL_ID {
  farmsPool1 = "farms",
  farmsPool2 = "farms2",
  defi = "defi",
  puzzle = "puzzle",
}

export interface ITokenConfig {
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
  tokens: Array<ITokenConfig & { shareAmount: number }>;
}

export const ROUTES = {
  ROOT: "/",
  STAKE: "/stake",
  pools: {
    farms: POOL_ID.farmsPool1,
    farms2: POOL_ID.farmsPool2,
    defi: POOL_ID.defi,
    puzzle: POOL_ID.puzzle,
  },
  addLiquidity: {
    farms: `${POOL_ID.farmsPool1}/addLiquidity`,
    farms2: `${POOL_ID.farmsPool2}/addLiquidity`,
    defi: `${POOL_ID.defi}/addLiquidity`,
  },
};

export const tokens: Record<string, ITokenConfig> = {
  DUXPLORER: {
    assetId: "EfdcPXw7o7rrrPWmMBr2sa66Dk95n56622ngujbaGhye",
    name: "DUXPLORER token",
    symbol: "DUXPLORER",
    decimals: 100000000,
    logo: duxplorerLogo,
  },
  MATH: {
    assetId: "B543bkZcZNo5GrUnd5fxB6EwkiJhAVyKCkPn5nWzZC2s",
    name: "MATH token",
    symbol: "MATH",
    decimals: 100000000,
    logo: mathLogo,
  },
  TURTLE: {
    assetId: "5bcAh1r6ydrpk44FEmrnmJQjumgKo3NKEEsyfgmZYwxC",
    name: "TURTLE token",
    symbol: "TURTLE",
    decimals: 100000000,
    logo: turtleLogo,
  },
  EGGSEGGS: {
    assetId: "54UszKAj3MtYmkdRCqSXAcaQLaVALBy7CCrVkfmfzhxR",
    name: "EGGSEGGS token",
    symbol: "EGGSEGGS",
    decimals: 100000000,
    logo: eggseggsLogo,
  },
  PESOLATINO: {
    assetId: "5nk9JW8yRonyNBEwhChoksLxpBECVxbVLqaNuQs9EJn1",
    name: "PESOLATINO token",
    symbol: "PESOLATINO",
    decimals: 100000000,
    logo: latinaLogo,
  },
  FOMO: {
    assetId: "Dfx6LJPndo1h5Umk9SofDhMDs6Gi8cHyT3873pSgoASU",
    name: "FOMO token",
    symbol: "FOMO",
    decimals: 100000000,
    logo: fomoLogo,
  },
  MUNDO: {
    assetId: "4kwKSf4Bx2Wq8YxKnVZBhcEHyXzEtJ2pw7ixfJgirwf2",
    name: "MUNDO token",
    symbol: "MUNDO",
    decimals: 100000000,
    logo: mundoLogo,
  },
  EGGPOINT: {
    assetId: "Ej7kEzxvUsoiMtJKiuFpMD9tC6qfCADpZynyW2vqcWW",
    name: "EGGPOINT token",
    symbol: "EGGPOINT",
    decimals: 100000000,
    logo: eggPointLogo,
  },
  EGG: {
    assetId: "C1iWsKGqLwjHUndiQ7iXpdmPum9PeCDFfyXBdJJosDRS",
    name: "EGG token",
    symbol: "EGG",
    decimals: 100000000,
    logo: eggLogo,
  },
  USDN: {
    assetId: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    name: "USDN token",
    symbol: "USDN",
    decimals: 1000000,
    logo: usdnLogo,
  },

  ENDO: {
    assetId: "5HGPPLj58XUx3ryMgkASJoqYq33zwBbTMf1CGxfKw6jp",
    name: "ENDO token",
    symbol: "ENDO",
    decimals: 100000000,
    logo: endoLogo,
  },
  MARVIN: {
    assetId: "yDf4UTg4DS75sCNP7oC1HraTN4KHtqmd6WueTid4PF1",
    name: "MARVIN token",
    symbol: "MARVIN",
    decimals: 100000000,
    logo: marvinLogo,
  },
  EGGMOON: {
    assetId: "2R57nL7ftpuwbgdprcmAeA9i7ykLH6A4wzLkZHWPiHKc",
    name: "EGGMOON token",
    symbol: "EGGMOON",
    decimals: 100000000,
    logo: eggmoonLogo,
  },
  STREET: {
    assetId: "CE5cxMvz7865CyFZPFUmDiL4KRkYXP6b6oYgN3vmWdV5",
    name: "STREET token",
    symbol: "STREET",
    decimals: 100000000,
    logo: streetLogo,
  },
  KOLKHOZ: {
    assetId: "5m5stLsMZSPomwxTTjJGMMEnjMafRMfap5vZyaLwgMKD",
    name: "KOLKHOZ token",
    symbol: "KOLKHOZ",
    decimals: 100000000,
    logo: kolkhozLogo,
  },
  FORKLOG: {
    assetId: "46PdJcKzDuYfzLuLNjffM3F8jR8hL357V9AdGK2xN3kx",
    name: "FORKLOG token",
    symbol: "FORKLOG",
    decimals: 100000000,
    logo: cartelLogo,
  },
  CGU: {
    assetId: "ESaD2AREvgk7o4C9eQkZ8Nmau9BSHqgTK5ymHV36xocy",
    name: "CGU token",
    symbol: "CGU",
    decimals: 100000000,
    logo: cguLogo,
  },

  WAVES: {
    assetId: "WAVES",
    name: "WAVES token",
    symbol: "WAVES",
    decimals: 100000000,
    logo: wavesLogo,
  },
  SWOP: {
    assetId: "Ehie5xYpeN8op1Cctc6aGUrqx8jq3jtf1DSjXDbfm7aT",
    name: "SWOP token",
    symbol: "SWOP",
    decimals: 100000000,
    logo: swopLogo,
  },
  VIRES: {
    assetId: "DSbbhLsSTeDg5Lsiufk2Aneh3DjVqJuPr2M9uU1gwy5p",
    name: "VIRES token",
    symbol: "VIRES",
    decimals: 100000000,
    logo: viresLogo,
  },
  NSBT: {
    assetId: "6nSpVyNH7yM69eg446wrQR94ipbbcmZMU1ENPwanC97g",
    name: "NSBT token",
    symbol: "NSBT",
    decimals: 1000000,
    logo: nsbtLogo,
  },
  ENNO: {
    assetId: "7LMV3s1J4dKpMQZqge5sKYoFkZRLojnnU49aerqos4yg",
    name: "ENNO token",
    symbol: "ENNO",
    decimals: 100000000,
    logo: ennoLogo,
  },
  SIGN: {
    assetId: "9sQutD5HnRvjM1uui5cVC4w9xkMPAfYEV8ymug3Mon2Y",
    name: "SIGN token",
    symbol: "SIGN",
    decimals: 100000000,
    logo: signLogo,
  },
  PUZZLE: {
    assetId: "HEB8Qaw9xrWpWs8tHsiATYGBWDBtP2S7kcPALrMu43AS",
    name: "PUZZLE token",
    symbol: "PUZZLE",
    decimals: 100000000,
    logo: puzzleLogo,
  },
  USDT: {
    assetId: "34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ",
    name: "USDT token",
    symbol: "USDT",
    decimals: 1000000,
    logo: usdtLogo,
  },
};

export const poolConfigs: Record<POOL_ID, IPoolConfig> = {
  [POOL_ID.farmsPool1]: {
    contractAddress: "3PPRHHF9JKvDLkAc3aHD3Kd5tRZp1CoqAJa",
    baseTokenId: "C1iWsKGqLwjHUndiQ7iXpdmPum9PeCDFfyXBdJJosDRS",
    name: "Farms 1",
    defaultAssetId0: "B543bkZcZNo5GrUnd5fxB6EwkiJhAVyKCkPn5nWzZC2s",
    defaultAssetId1: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    tokens: [
      { ...tokens.DUXPLORER, shareAmount: 0.1 },
      { ...tokens.MATH, shareAmount: 0.1 },
      { ...tokens.TURTLE, shareAmount: 0.1 },
      { ...tokens.EGGSEGGS, shareAmount: 0.1 },
      { ...tokens.PESOLATINO, shareAmount: 0.1 },
      { ...tokens.FOMO, shareAmount: 0.1 },
      { ...tokens.MUNDO, shareAmount: 0.1 },
      { ...tokens.EGGPOINT, shareAmount: 0.1 },
      { ...tokens.EGG, shareAmount: 0.1 },
      { ...tokens.USDN, shareAmount: 0.1 },
    ],
  },
  [POOL_ID.farmsPool2]: {
    contractAddress: "3PKYPKJPHZENAAwH9e7TF5edDgukNxxBt3M",
    baseTokenId: "C1iWsKGqLwjHUndiQ7iXpdmPum9PeCDFfyXBdJJosDRS",
    name: "Farms 2",
    defaultAssetId0: "yDf4UTg4DS75sCNP7oC1HraTN4KHtqmd6WueTid4PF1",
    defaultAssetId1: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    tokens: [
      { ...tokens.ENDO, shareAmount: 0.1 },
      { ...tokens.MARVIN, shareAmount: 0.1 },
      { ...tokens.EGGMOON, shareAmount: 0.1 },
      { ...tokens.STREET, shareAmount: 0.1 },
      { ...tokens.KOLKHOZ, shareAmount: 0.1 },
      { ...tokens.FORKLOG, shareAmount: 0.1 },
      { ...tokens.CGU, shareAmount: 0.1 },
      { ...tokens.EGG, shareAmount: 0.2 },
      { ...tokens.USDN, shareAmount: 0.1 },
    ],
  },
  [POOL_ID.defi]: {
    contractAddress: "3PDrYPF6izza2sXWffzTPF7e2Fcir2CMpki",
    baseTokenId: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    name: "Waves DeFi",
    defaultAssetId0: "C1iWsKGqLwjHUndiQ7iXpdmPum9PeCDFfyXBdJJosDRS",
    defaultAssetId1: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    tokens: [
      { ...tokens.WAVES, shareAmount: 0.2 },
      { ...tokens.EGG, shareAmount: 0.1 },
      { ...tokens.SWOP, shareAmount: 0.05 },
      { ...tokens.VIRES, shareAmount: 0.05 },
      { ...tokens.NSBT, shareAmount: 0.05 },
      { ...tokens.ENNO, shareAmount: 0.05 },
      { ...tokens.SIGN, shareAmount: 0.05 },
      { ...tokens.PUZZLE, shareAmount: 0.2 },
      { ...tokens.USDT, shareAmount: 0.1 },
      { ...tokens.USDN, shareAmount: 0.15 },
    ],
  },
  [POOL_ID.puzzle]: {
    contractAddress: "3PFDgzu1UtswAkCMxqqQjbTeHaX4cMab8Kh",
    baseTokenId: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    name: "Puzzle Parent Pool",
    defaultAssetId0: "HEB8Qaw9xrWpWs8tHsiATYGBWDBtP2S7kcPALrMu43AS",
    defaultAssetId1: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    tokens: [
      { ...tokens.USDT, shareAmount: 0.1 },
      { ...tokens.PUZZLE, shareAmount: 0.8 },
      { ...tokens.USDN, shareAmount: 0.1 },
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
