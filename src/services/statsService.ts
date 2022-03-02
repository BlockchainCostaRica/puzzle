import axios from "axios";

export interface IStatsPoolItemResponse {
  apy: number;
  liquidity: number;
  monthly_volume: number;
}

export interface IPoolVolume {
  date: number;
  volume: number;
}

export interface IStatsByPoolAndPeriodResponse extends IStatsPoolItemResponse {
  fees: number;
  volume: IPoolVolume[];
}

export interface IArtWork {
  floorPrice?: number;
  marketPrice?: number;
  name?: string;
  imageLink?: string;
  marketLink?: string;
  typeId?: string;
  apy?: number;
}

export interface IStakingStatsResponse {
  classic: { apy: number };
  ultra: { apy: number };
}

type TStatsResponse = Record<string, IStatsPoolItemResponse>;

type TArtworksResponse = IArtWork[];

const statsService = {
  getStats: async (): Promise<TStatsResponse> => {
    const url = "https://api.puzzleswap.org/stats/pools";
    const { data } = await axios.get(url);
    return data;
  },
  getStakingStats: async (): Promise<IStakingStatsResponse> => {
    const url = "https://api.puzzleswap.org/stats/staking";
    const { data } = await axios.get(url);
    return data;
  },
  getArtworks: async (): Promise<TArtworksResponse> => {
    const url = "https://api.puzzleswap.org/stats/artworks";
    const { data } = await axios.get(url);
    return data;
  },

  getStatsByPoolAndPeriod: async (
    poolId: string,
    period = "30d"
  ): Promise<IStatsByPoolAndPeriodResponse> => {
    const url = `https://api.puzzleswap.org/stats/${poolId}/${period}`;
    const { data } = await axios.get(url);
    return data;
  },
};

export default statsService;
