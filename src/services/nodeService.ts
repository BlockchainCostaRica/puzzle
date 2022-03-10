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

export interface IStakingStatsResponse {
  classic: { apy: number };
  ultra: { apy: number };
}

export interface INFT {
  assetId: string;
  decimals: number;
  description: string;
  issueHeight: number;
  issueTimestamp: number;
  issuer: string;
  issuerPublicKey: string;
  minSponsoredAssetFee: null | any;
  name: string;
  originTransactionId: string;
  quantity: number;
  reissuable: boolean;
  scripted: boolean;
}

interface IBalance {
  assetId: string;
  balance: number;
}

const nodeService = {
  getAddressNfts: async (address: string): Promise<INFT[]> => {
    const url = `https://nodes.wavesnodes.com/assets/nft/${address}/limit/1000`;
    const { data } = await axios.get(url);
    return data;
  },
  getAddressBalances: async (
    node: string,
    address: string | null
  ): Promise<IBalance[]> => {
    if (address == null) return [];
    const assetsUrl = `${node}/assets/balance/${address}`;
    const wavesUrl = `${node}/addresses/balance/details/${address}`;
    const data = (
      await Promise.all([
        axios.get(assetsUrl).then(({ data }) => data),
        axios.get(wavesUrl).then(({ data }) => ({
          balances: [{ balance: data.regular, assetId: "WAVES" }],
        })),
      ])
    ).reduce<{ assetId: string; balance: number }[]>(
      (acc, { balances }) => [...acc, ...balances],
      []
    );
    return data;
  },
};

export default nodeService;
