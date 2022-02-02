import axios from "axios";
import { NODE_URL_MAP, TChainId } from "@src/constants";

interface INodeData {
  key: string;
  type: "integer" | "string";
  value: number | string;
}

const nodeRequest = async (
  chainId: TChainId,
  contractAddress: string,
  match: string
) => {
  const url = `${NODE_URL_MAP[chainId]}/addresses/data/${contractAddress}?matches=${match}`;
  const response: { data: INodeData[] } = await axios.get(url);
  if (response.data) {
    return response.data;
  } else {
    return null;
  }
};
export default nodeRequest;
