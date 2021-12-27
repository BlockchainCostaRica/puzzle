import { ITokenConfig } from "@src/constants";
import BigNumber from "bignumber.js";

export interface IAssetBalance extends ITokenConfig {
  balance?: BigNumber;
  usdnEquivalent?: BigNumber;
}

class Balance implements IAssetBalance {
  public readonly assetId: string;
  public readonly name: string;
  public readonly symbol: string;
  public readonly decimals: number;
  public readonly logo: string;
  public readonly balance?: BigNumber;
  public readonly usdnEquivalent?: BigNumber;

  constructor(props: IAssetBalance) {
    this.name = props.name;
    this.assetId = props.assetId;
    this.symbol = props.symbol;
    this.decimals = props.decimals;
    this.logo = props.logo;
    this.balance = props.balance;
    this.usdnEquivalent = props.usdnEquivalent;
  }

  get formatBalance() {
    return this.balance?.div(this.decimals).toFormat(2) ?? "–";
  }
  get formatUsdnEquivalent() {
    return this.usdnEquivalent
      ? `~ $ ${this.usdnEquivalent?.toFormat(2)}`
      : "–";
  }

  // gt = (b: Balance) => {
  //   if (this.usdnEquivalent == null && b.usdnEquivalent == null) return 0;
  //   if (this.usdnEquivalent == null && b.usdnEquivalent != null) return 1;
  //   if (this.usdnEquivalent == null && b.usdnEquivalent == null) return -1;
  //   return this.usdnEquivalent!.lt(b.usdnEquivalent!) ? 1 : -1;
  // };
}
export default Balance;
