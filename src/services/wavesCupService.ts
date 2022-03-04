import axios from "axios";
import BN from "@src/utils/BN";

const wavesCupService = {
  calc: async (): Promise<any> => {
    const url = `https://wavescap.com/api/assets-info.php`;
    const { data } = await axios.get(url);
    return data;
  },
};
export default wavesCupService;
