import RootStore from "@stores/RootStore";
import nodeRequest from "@src/utils/nodeRequest";
import { makeAutoObservable, reaction } from "mobx";
import BN from "@src/utils/BN";
import stakedPuzzleLogo from "@src/assets/tokens/staked-puzzle.svg";

export default class StakeStore {
  public rootStore: RootStore;

  public stakedAccountPuzzle: BN | null = null;
  public setStakedAccountPuzzle = (v: BN | null) =>
    (this.stakedAccountPuzzle = v);

  public loading: boolean = false;
  public setLoading = (v: boolean) => (this.loading = v);

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    setInterval(this.updateStakedInvestments, 5 * 1000);
    reaction(
      () => this.rootStore.accountStore.address,
      () => this.updateStakedInvestments(true)
    );
  }

  updateStakedInvestments = async (force = false) => {
    const { address } = this.rootStore.accountStore;
    if (address === null) {
      this.setStakedAccountPuzzle(null);
      return;
    }
    if (!force && this.loading) return;
    this.setLoading(true);
    const { chainId, CONTRACT_ADDRESSES } = this.rootStore.accountStore;
    if (this.stakedAccountPuzzle != null) {
      this.setLoading(true);
    }
    const addressStakedValue = await nodeRequest(
      chainId,
      CONTRACT_ADDRESSES.staking,
      `${address}_staked`
    );

    const addressStaked =
      addressStakedValue && addressStakedValue?.length > 0
        ? new BN(addressStakedValue[0].value)
        : BN.ZERO;
    this.setStakedAccountPuzzle(addressStaked);
    this.setLoading(false);
  };

  get puzzleWallet() {
    if (
      this.stakedAccountPuzzle == null ||
      this.rootStore.accountStore.address == null
    )
      return [];
    const { accountStore, poolsStore } = this.rootStore;
    const puzzle = accountStore.TOKENS.PUZZLE;

    if (this.stakedAccountPuzzle.eq(0)) return [];
    const puzzleStakedAmount = BN.formatUnits(
      this.stakedAccountPuzzle,
      puzzle.decimals
    );
    const amount = puzzleStakedAmount?.toFormat(2) + ` ${puzzle.symbol}`;
    const puzzleRate = poolsStore.usdnRate(puzzle.assetId) ?? BN.ZERO;
    const usdnEquivalent = puzzleStakedAmount.times(puzzleRate);
    const item = {
      onClickPath: accountStore.ROUTES.STAKE,
      logo: stakedPuzzleLogo,
      name: "Puzzle Staking",
      amount,
      nuclearValue: "$ " + puzzleRate.toFormat(2),
      usdnEquivalent: "$ " + usdnEquivalent.toFormat(2),
    };
    return !usdnEquivalent.eq(0) ? [{ ...item }] : [];
  }
}
