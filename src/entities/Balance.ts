import { IToken } from "@src/constants";
import tokenLogos from "@src/assets/tokens/tokenLogos";
import BN from "@src/utils/BN";

export interface IAssetBalance extends Omit<IToken, "logo"> {
  balance?: BN;
  usdnEquivalent?: BN;
  logo?: string;
}

class Balance implements IAssetBalance {
  public readonly assetId: string;
  public readonly name: string;
  public readonly symbol: string;
  public readonly decimals: number;
  private readonly _logo?: string;
  public readonly balance?: BN;
  public readonly usdnEquivalent?: BN;

  constructor(props: IAssetBalance) {
    this.name = props.name;
    this.assetId = props.assetId;
    this.symbol = props.symbol;
    this.decimals = props.decimals;
    this._logo = props.logo;
    this.balance = props.balance;
    this.usdnEquivalent = props.usdnEquivalent;
  }

  get logo() {
    return this._logo ?? tokenLogos[this.symbol] ?? tokenLogos.UNKNOWN;
  }

  get formatBalance() {
    if (this.balance == null) return "—";
    const value = BN.formatUnits(this.balance ?? 0, this.decimals);
    return value.gt(0.01) ? value.toFormat(2) : value.toFormat(6);
  }

  get formatUsdnEquivalent() {
    if (this.usdnEquivalent == null) {
      return "—";
    }
    const v = this.usdnEquivalent.gt(0.01)
      ? this.usdnEquivalent.toFormat(2)
      : this.usdnEquivalent.toFormat(6);
    return `~ ${v} $`;
  }
}

export default Balance;
