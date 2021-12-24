import duxplorerLogo from "@src/assets/tokens/duxplorer-logo.png";
import mathLogo from "@src/assets/tokens/math-logo.png";
import turtleLogo from "@src/assets/tokens/turtle-logo.png";
import eggseggsLogo from "@src/assets/tokens/eggseggs-logo.jpeg";
import latinaLogo from "@src/assets/tokens/latina-logo.png";
import fomoLogo from "@src/assets/tokens/fomo-logo.jpeg";
import mundoLogo from "@src/assets/tokens/mundo-logo.jpeg";
import eggPointLogo from "@src/assets/tokens/eggpoint-logo.jpeg";
import eggLogo from "@src/assets/tokens/EGG.svg";
import usdnLogo from "@src/assets/tokens/usdn-logo.svg";
import endoLogo from "@src/assets/tokens/endo-logo.jpeg";
import marvinLogo from "@src/assets/tokens/marvin-logo.jpeg";
import eggmoonLogo from "@src/assets/tokens/ido-logo.jpeg";
import streetLogo from "@src/assets/tokens/street-logo.svg";
import kolkhozLogo from "@src/assets/tokens/kolkhoz-logo.jpeg";
import cartelLogo from "@src/assets/tokens/cartel-logo.png";
import cguLogo from "@src/assets/tokens/cgu-logo.png";
import wavesLogo from "@src/assets/tokens/waves.png";
import swopLogo from "@src/assets/tokens/SWOP.svg";
import viresLogo from "@src/assets/tokens/VIRES.svg";
import nsbtLogo from "@src/assets/tokens/nsbt-logo.svg";
import ennoLogo from "@src/assets/tokens/enno-logo.svg";
import signLogo from "@src/assets/tokens/sign-logo.svg";
import puzzleLogo from "@src/assets/tokens/PUZZLE.svg";
import usdtLogo from "@src/assets/tokens/USDT.svg";

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
  shareAmount: number;
}

export interface IPoolConfig {
  contractAddress: string;
  baseTokenId: string;
  name: string;
  defaultAssetId0: string;
  defaultAssetId1: string;
  tokens: Array<ITokenConfig>;
}

export const poolConfigs: Record<POOL_ID, IPoolConfig> = {
  [POOL_ID.farmsPool1]: {
    contractAddress: "3PPRHHF9JKvDLkAc3aHD3Kd5tRZp1CoqAJa",
    baseTokenId: "C1iWsKGqLwjHUndiQ7iXpdmPum9PeCDFfyXBdJJosDRS",
    name: "Farms 1",
    defaultAssetId0: "B543bkZcZNo5GrUnd5fxB6EwkiJhAVyKCkPn5nWzZC2s",
    defaultAssetId1: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    tokens: [
      {
        assetId: "EfdcPXw7o7rrrPWmMBr2sa66Dk95n56622ngujbaGhye",
        name: "DUXPLORER token",
        symbol: "DUXPLORER",
        decimals: 100000000,
        logo: duxplorerLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "B543bkZcZNo5GrUnd5fxB6EwkiJhAVyKCkPn5nWzZC2s",
        name: "MATH token",
        symbol: "MATH",
        decimals: 100000000,
        logo: mathLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "5bcAh1r6ydrpk44FEmrnmJQjumgKo3NKEEsyfgmZYwxC",
        name: "TURTLE token",
        symbol: "TURTLE",
        decimals: 100000000,
        logo: turtleLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "54UszKAj3MtYmkdRCqSXAcaQLaVALBy7CCrVkfmfzhxR",
        name: "EGGSEGGS token",
        symbol: "EGGSEGGS",
        decimals: 100000000,
        logo: eggseggsLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "5nk9JW8yRonyNBEwhChoksLxpBECVxbVLqaNuQs9EJn1",
        name: "PESOLATINO token",
        symbol: "PESOLATINO",
        decimals: 100000000,
        logo: latinaLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "Dfx6LJPndo1h5Umk9SofDhMDs6Gi8cHyT3873pSgoASU",
        name: "FOMO token",
        symbol: "FOMO",
        decimals: 100000000,
        logo: fomoLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "4kwKSf4Bx2Wq8YxKnVZBhcEHyXzEtJ2pw7ixfJgirwf2",
        name: "MUNDO token",
        symbol: "MUNDO",
        decimals: 100000000,
        logo: mundoLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "Ej7kEzxvUsoiMtJKiuFpMD9tC6qfCADpZynyW2vqcWW",
        name: "EGGPOINT token",
        symbol: "EGGPOINT",
        decimals: 100000000,
        logo: eggPointLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "C1iWsKGqLwjHUndiQ7iXpdmPum9PeCDFfyXBdJJosDRS",
        name: "EGG token",
        symbol: "EGG",
        decimals: 100000000,
        logo: eggLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
        name: "USDN token",
        symbol: "USDN",
        decimals: 1000000,
        logo: usdnLogo,
        shareAmount: 0.1,
      },
    ],
  },
  [POOL_ID.farmsPool2]: {
    contractAddress: "3PKYPKJPHZENAAwH9e7TF5edDgukNxxBt3M",
    baseTokenId: "C1iWsKGqLwjHUndiQ7iXpdmPum9PeCDFfyXBdJJosDRS",
    name: "Farms 2",
    defaultAssetId0: "yDf4UTg4DS75sCNP7oC1HraTN4KHtqmd6WueTid4PF1",
    defaultAssetId1: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    tokens: [
      {
        assetId: "5HGPPLj58XUx3ryMgkASJoqYq33zwBbTMf1CGxfKw6jp",
        name: "ENDO token",
        symbol: "ENDO",
        decimals: 100000000,
        logo: endoLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "yDf4UTg4DS75sCNP7oC1HraTN4KHtqmd6WueTid4PF1",
        name: "MARVIN token",
        symbol: "MARVIN",
        decimals: 100000000,
        logo: marvinLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "2R57nL7ftpuwbgdprcmAeA9i7ykLH6A4wzLkZHWPiHKc",
        name: "EGGMOON token",
        symbol: "EGGMOON",
        decimals: 100000000,
        logo: eggmoonLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "CE5cxMvz7865CyFZPFUmDiL4KRkYXP6b6oYgN3vmWdV5",
        name: "STREET token",
        symbol: "STREET",
        decimals: 100000000,
        logo: streetLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "5m5stLsMZSPomwxTTjJGMMEnjMafRMfap5vZyaLwgMKD",
        name: "KOLKHOZ token",
        symbol: "KOLKHOZ",
        decimals: 100000000,
        logo: kolkhozLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "46PdJcKzDuYfzLuLNjffM3F8jR8hL357V9AdGK2xN3kx",
        name: "FORKLOG token",
        symbol: "FORKLOG",
        decimals: 100000000,
        logo: cartelLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "ESaD2AREvgk7o4C9eQkZ8Nmau9BSHqgTK5ymHV36xocy",
        name: "CGU token",
        symbol: "CGU",
        decimals: 100000000,
        logo: cguLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "C1iWsKGqLwjHUndiQ7iXpdmPum9PeCDFfyXBdJJosDRS",
        name: "EGG token",
        symbol: "EGG",
        decimals: 100000000,
        logo: eggLogo,
        shareAmount: 0.2,
      },
      {
        assetId: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
        name: "USDN token",
        symbol: "USDN",
        decimals: 1000000,
        logo: usdnLogo,
        shareAmount: 0.1,
      },
    ],
  },
  [POOL_ID.defi]: {
    contractAddress: "3PDrYPF6izza2sXWffzTPF7e2Fcir2CMpki",
    baseTokenId: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    name: "Waves DeFi",
    defaultAssetId0: "C1iWsKGqLwjHUndiQ7iXpdmPum9PeCDFfyXBdJJosDRS",
    defaultAssetId1: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    tokens: [
      {
        assetId: "WAVES",
        name: "WAVES token",
        symbol: "WAVES",
        decimals: 100000000,
        logo: wavesLogo,
        shareAmount: 0.2,
      },
      {
        assetId: "C1iWsKGqLwjHUndiQ7iXpdmPum9PeCDFfyXBdJJosDRS",
        name: "EGG token",
        symbol: "EGG",
        decimals: 100000000,
        logo: eggLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "Ehie5xYpeN8op1Cctc6aGUrqx8jq3jtf1DSjXDbfm7aT",
        name: "SWOP token",
        symbol: "SWOP",
        decimals: 100000000,
        logo: swopLogo,
        shareAmount: 0.05,
      },
      {
        assetId: "DSbbhLsSTeDg5Lsiufk2Aneh3DjVqJuPr2M9uU1gwy5p",
        name: "VIRES token",
        symbol: "VIRES",
        decimals: 100000000,
        logo: viresLogo,
        shareAmount: 0.05,
      },
      {
        assetId: "6nSpVyNH7yM69eg446wrQR94ipbbcmZMU1ENPwanC97g",
        name: "NSBT token",
        symbol: "NSBT",
        decimals: 1000000,
        logo: nsbtLogo,
        shareAmount: 0.05,
      },
      {
        assetId: "7LMV3s1J4dKpMQZqge5sKYoFkZRLojnnU49aerqos4yg",
        name: "ENNO token",
        symbol: "ENNO",
        decimals: 100000000,
        logo: ennoLogo,
        shareAmount: 0.05,
      },
      {
        assetId: "9sQutD5HnRvjM1uui5cVC4w9xkMPAfYEV8ymug3Mon2Y",
        name: "SIGN token",
        symbol: "SIGN",
        decimals: 100000000,
        logo: signLogo,
        shareAmount: 0.05,
      },
      {
        assetId: "HEB8Qaw9xrWpWs8tHsiATYGBWDBtP2S7kcPALrMu43AS",
        name: "PUZZLE token",
        symbol: "PUZZLE",
        decimals: 100000000,
        logo: puzzleLogo,
        shareAmount: 0.2,
      },
      {
        assetId: "34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ",
        name: "USDT token",
        symbol: "USDT",
        decimals: 1000000,
        logo: usdtLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
        name: "USDN token",
        symbol: "USDN",
        decimals: 1000000,
        logo: usdnLogo,
        shareAmount: 0.15,
      },
    ],
  },
  [POOL_ID.puzzle]: {
    contractAddress: "3PFDgzu1UtswAkCMxqqQjbTeHaX4cMab8Kh",
    baseTokenId: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    name: "Puzzle Parent Pool",
    defaultAssetId0: "HEB8Qaw9xrWpWs8tHsiATYGBWDBtP2S7kcPALrMu43AS",
    defaultAssetId1: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
    tokens: [
      {
        assetId: "34N9YcEETLWn93qYQ64EsP1x89tSruJU44RrEMSXXEPJ",
        name: "USDT token",
        symbol: "USDT",
        decimals: 1000000,
        logo: usdtLogo,
        shareAmount: 0.1,
      },
      {
        assetId: "HEB8Qaw9xrWpWs8tHsiATYGBWDBtP2S7kcPALrMu43AS",
        name: "PUZZLE token",
        symbol: "PUZZLE",
        decimals: 100000000,
        logo: puzzleLogo,
        shareAmount: 0.8,
      },
      {
        assetId: "DG2xFkPdDwKUoBkzGAhQtLpSGzfXLiCYPEzeKH2Ad24p",
        name: "USDN token",
        symbol: "USDN",
        decimals: 1000000,
        logo: usdnLogo,
        shareAmount: 0.1,
      },
    ],
  },
};

export const NODE_URL_MAP = {
  W: "https://wavesducks.wavesnodes.com",
  T: "https://nodes-testnet.wavesnodes.com",
};
