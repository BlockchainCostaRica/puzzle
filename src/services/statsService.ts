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

type TStatsResponse = Record<string, IStatsPoolItemResponse>;

const statsService = {
  getStats: async (): Promise<TStatsResponse> => {
    const url = "https://api.puzzleswap.org/stats/pools";
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
