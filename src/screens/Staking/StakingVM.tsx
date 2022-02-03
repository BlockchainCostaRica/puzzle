import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable, when } from "mobx";
import { RootStore, useStores } from "@stores";
import BN from "@src/utils/BN";
import Balance from "@src/entities/Balance";
import nodeRequest from "@src/utils/nodeRequest";
import stakedPuzzleLogo from "@src/assets/tokens/staked-puzzle.svg";
import statsService from "@src/services/statsService";

const ctx = React.createContext<StakingVM | null>(null);

export const StakingVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new StakingVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useStakingVM = () => useVM(ctx);

export interface IStakingStats {
  apy: BN;
}

class StakingVM {
  private stakingContractAddress: string = "";
  @action.bound private _setStakingAddress = (v: string) =>
    (this.stakingContractAddress = v);

  public stats: IStakingStats | null = null;
  private _setStats = (v: IStakingStats) => (this.stats = v);

  public action: 0 | 1 = 0;
  @action.bound setAction = (v: 0 | 1) => (this.action = v);

  public globalStaked: BN | null = null;
  public addressStaked: BN | null = null;
  public claimedReward: BN | null = null;
  public availableToClaim: BN | null = null;
  public lastClaimDate: BN = BN.ZERO;

  private _setGlobalStaked = (v: BN) => (this.globalStaked = v);
  private _setAddressStaked = (v: BN) => (this.addressStaked = v);
  private _setClaimedReward = (v: BN) => (this.claimedReward = v);
  private _setAvailableToClaim = (v: BN) => (this.availableToClaim = v);
  private _setLastClaimDate = (v: BN) => (this.lastClaimDate = v);

  constructor(private rootStore: RootStore) {
    const { accountStore } = this.rootStore;
    this.syncStats().then();
    this._setStakingAddress(accountStore.CONTRACT_ADDRESSES.staking);
    makeAutoObservable(this);
    when(() => accountStore.address !== null, this.getAddressStakingInfo);
  }

  public puzzleAmountToStake: BN = BN.ZERO;
  @action.bound public setPuzzleAmountToStake = (value: BN) =>
    (this.puzzleAmountToStake = value);

  public puzzleAmountToUnstake: BN = BN.ZERO;
  @action.bound public setPuzzleAmountToUnStake = (value: BN) =>
    (this.puzzleAmountToUnstake = value);

  public get puzzleToken() {
    return this.rootStore.accountStore.TOKENS.PUZZLE;
  }

  get puzzleBalance() {
    const { accountStore } = this.rootStore;
    const puzzleBalance = accountStore.findBalanceByAssetId(
      this.puzzleToken.assetId
    );
    return puzzleBalance ? puzzleBalance : new Balance(this.puzzleToken);
  }

  get shareOfTotalStake() {
    const { addressStaked, globalStaked } = this;
    if (addressStaked == null || globalStaked == null) return BN.ZERO;
    return addressStaked.div(globalStaked).times(100);
  }

  getAddressStakingInfo = async () => {
    const { chainId, address, TOKENS } = this.rootStore.accountStore;
    const { stakingContractAddress } = this;

    const [globalValues, addressValues] = await Promise.all([
      nodeRequest(chainId, stakingContractAddress, `global_(.*)`),
      nodeRequest(chainId, stakingContractAddress, `${address}_(.*)`),
    ]);

    const keysArray = {
      globalStaked: "global_staked",
      addressStaked: `${address}_staked`,
      claimedReward: `${address}_${TOKENS.USDN.assetId}_claimed`,
      globalLastCheckInterest: `global_lastCheck_${TOKENS.USDN.assetId}_interest`,
      addressLastCheckInterest: `${address}_lastCheck_${TOKENS.USDN.assetId}_interest`,
      lastClaimDate: `${address}_${TOKENS.USDN.assetId}_lastClaim`,
    };
    //todo вынести в отдельную фунцию
    const parsedNodeResponse = [
      ...(globalValues ?? []),
      ...(addressValues ?? []),
    ].reduce<Record<string, BN>>((acc, { key, value }) => {
      Object.entries(keysArray).forEach(([regName, regValue]) => {
        const regexp = new RegExp(regValue);
        if (regexp.test(key)) {
          acc[regName] = new BN(value);
        }
      });
      return acc;
    }, {});

    const globalStaked = parsedNodeResponse["globalStaked"];
    const addressStaked = parsedNodeResponse["addressStaked"];
    const claimedReward = parsedNodeResponse["claimedReward"];
    const globalLastCheckInterest =
      parsedNodeResponse["globalLastCheckInterest"];
    const addressLastCheckInterest =
      parsedNodeResponse["addressLastCheckInterest"];
    const lastClaimDate = parsedNodeResponse["lastClaimDate"];

    this._setGlobalStaked(globalStaked);
    this._setAddressStaked(addressStaked);
    this._setClaimedReward(claimedReward);
    this._setClaimedReward(claimedReward);
    const availableToClaim = globalLastCheckInterest
      .minus(addressLastCheckInterest)
      .times(addressStaked);
    addressStaked && this._setAvailableToClaim(availableToClaim);
    lastClaimDate && this._setLastClaimDate(lastClaimDate);
  };

  syncStats = async () => {
    const data = await statsService.getStakingStats();
    const formattedData = Object.entries(data).reduce((acc, [field, value]) => {
      return { ...acc, [field]: new BN(value) };
    }, {} as IStakingStats);
    this._setStats(formattedData);
  };

  claimRewards = () => {
    return this.rootStore.accountStore.invoke({
      dApp: this.rootStore.accountStore.CONTRACT_ADDRESSES.staking ?? "",
      payment: [],
      call: {
        function: "claimReward",
        args: [],
      },
    });
  };
  stake = () => {
    const { puzzleToken, puzzleAmountToStake, rootStore } = this;
    const { accountStore, notificationStore } = rootStore;
    const puzzleAmount = BN.parseUnits(
      this.puzzleAmountToStake,
      this.puzzleToken.decimals
    ).toFormat(2);
    accountStore
      .invoke({
        dApp: this.rootStore.accountStore.CONTRACT_ADDRESSES.staking ?? "",
        payment: [
          {
            assetId: puzzleToken.assetId,
            amount: puzzleAmountToStake.toString(),
          },
        ],
        call: {
          function: "stake",
          args: [],
        },
      })
      .then((txId) => {
        if (txId == null) return;
        notificationStore.notify(
          `You can track your reward on the staking page`,
          {
            type: "success",
            title: `${puzzleAmount} PUZZLE successfully staked`,
            link: `${accountStore.EXPLORER_LINK}/tx/${txId}`,
            linkTitle: "View on Explorer",
          }
        );
      });
  };
  unStake = () => {
    const { puzzleAmountToUnstake, rootStore } = this;
    const { accountStore, notificationStore } = rootStore;
    const puzzleAmount = BN.parseUnits(
      this.puzzleAmountToUnstake,
      this.puzzleToken.decimals
    ).toFormat(2);
    accountStore
      .invoke({
        dApp: this.rootStore.accountStore.CONTRACT_ADDRESSES.staking ?? "",
        payment: [],
        call: {
          function: "unStake",
          args: [
            {
              type: "integer",
              value: puzzleAmountToUnstake.toString(),
            },
          ],
        },
      })
      .then((txId) => {
        if (txId == null) return;
        notificationStore.notify(
          `You can track your available to trade PUZZLE balance in the header section`,
          {
            type: "success",
            title: `${puzzleAmount} PUZZLE successfully unstaked`,
            link: `${accountStore.EXPLORER_LINK}/tx/${txId}`,
            linkTitle: "View on Explorer",
          }
        );
      });
  };

  get tokenStakeInputInfo() {
    const { address } = this.rootStore.accountStore;
    const rate =
      this.rootStore.poolsStore.usdnRate(this.puzzleToken.assetId, 1) ??
      BN.ZERO;
    const usdnEquivalentValue = rate.times(this.puzzleAmountToStake);
    const usdnEquivalent =
      "~ " +
      BN.formatUnits(usdnEquivalentValue, this.puzzleToken.decimals).toFixed(2);
    const onMaxClick =
      address != null
        ? () =>
            this.setPuzzleAmountToStake(this.puzzleBalance.balance ?? BN.ZERO)
        : undefined;
    return {
      selectable: false,
      decimals: this.puzzleToken.decimals,
      amount: this.puzzleAmountToStake,
      setAmount: this.setPuzzleAmountToStake,
      assetId: this.puzzleToken.assetId,
      balances: [this.puzzleBalance],
      onMaxClick,
      usdnEquivalent,
    };
  }

  get unstakeTokenInputInfo() {
    const { address } = this.rootStore.accountStore;
    const rate =
      this.rootStore.poolsStore.usdnRate(this.puzzleToken.assetId, 1) ??
      BN.ZERO;
    const usdnEquivalentValue = rate.times(this.puzzleAmountToUnstake);
    const usdnEquivalent =
      "~ " +
      BN.formatUnits(usdnEquivalentValue, this.puzzleToken.decimals).toFixed(2);
    const balances = new Balance({
      ...this.puzzleBalance,
      balance: this.addressStaked ?? BN.ZERO,
      logo: stakedPuzzleLogo,
    });
    const onMaxClick =
      address != null
        ? () => this.setPuzzleAmountToUnStake(this.addressStaked ?? BN.ZERO)
        : undefined;
    return {
      selectable: false,
      decimals: this.puzzleToken.decimals,
      amount: this.puzzleAmountToUnstake,
      setAmount: this.setPuzzleAmountToUnStake,
      assetId: this.puzzleToken.assetId,
      balances: [balances],
      onMaxClick,
      usdnEquivalent,
    };
  }

  get canStake(): boolean {
    return (
      this.puzzleAmountToStake.gt(0) &&
      this.puzzleAmountToStake.lte(this.puzzleBalance.balance ?? BN.ZERO) &&
      this.puzzleBalance.balance?.gt(0) != null
    );
  }

  get canUnStake(): boolean {
    return (
      this.puzzleAmountToUnstake.gt(0) &&
      this.puzzleAmountToUnstake.lte(this.addressStaked ?? BN.ZERO) &&
      this.globalStaked?.gt(0) != null
    );
  }

  get canClaim(): boolean {
    return this.availableToClaim !== null && this.availableToClaim.gt(0);
  }
}
