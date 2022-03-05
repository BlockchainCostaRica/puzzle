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

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    setInterval(this.updateStakedInvestments, 5 * 1000);
    reaction(
      () => this.rootStore.accountStore?.address,
      this.updateStakedInvestments
    );
  }

  updateStakedInvestments = async () => {
    const { chainId, address, CONTRACT_ADDRESSES } =
      this.rootStore.accountStore;
    if (address == null) return;
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
  };

  get puzzleWallet() {
    if (this.stakedAccountPuzzle == null) return [];
    const { accountStore, poolsStore } = this.rootStore;
    const puzzle = accountStore.TOKENS.PUZZLE;

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
