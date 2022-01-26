import axios from "axios";
import BN from "@src/utils/BN";

export type TCalcRouteExchangeItem = {
  amountIn: number;
  amountOut: number;
  from: string;
  pool: string;
  to: string;
  type: string;
};

export type TCalcRoute = {
  exchanges: Array<TCalcRouteExchangeItem>;
  in: number;
};

export interface ICalcResponse {
  estimatedOut: number;
  priceImpact: number;
  parameters: string;
  routes: Array<TCalcRoute>;
}

const aggregatorService = {
  calc: async (
    assetId0: string,
    assetId1: string,
    amount: BN
  ): Promise<ICalcResponse> => {
    const url = `https://api.puzzleswap.org//aggregator/calc?token0=${assetId0}&token1=${assetId1}&amountIn=${amount.toString()}`;
    const { data } = await axios.get(url);
    return data;
  },
};
export default aggregatorService;
