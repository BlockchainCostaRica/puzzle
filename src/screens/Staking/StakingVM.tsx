import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable, reaction } from "mobx";
import { RootStore, useStores } from "@stores";
import BN from "@src/utils/BN";
import Balance from "@src/entities/Balance";
import stakedPuzzleLogo from "@src/assets/tokens/staked-puzzle.svg";
import statsService from "@src/services/statsService";
import nodeService from "@src/services/nodeService";
import { NODE_URL_MAP } from "@src/constants";

const ctx = React.createContext<StakingVM | null>(null);

export const StakingVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new StakingVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useStakingVM = () => useVM(ctx);

export interface IStakingStats {
  classic: BN;
  ultra: BN;
}

class StakingVM {
  private stakingContractAddress: string = "";
  private _setStakingAddress = (v: string) => (this.stakingContractAddress = v);

  loading: boolean = false;
  private _setLoading = (l: boolean) => (this.loading = l);

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
    this.updateAddressStakingInfo();
    // when(() => accountStore.address !== null, this.updateAddressStakingInfo);
    reaction(
      () => this.rootStore.accountStore?.address,
      this.updateAddressStakingInfo
    );
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
    const { addressStaked, globalStaked, rootStore } = this;
    if (rootStore.accountStore.address == null) return BN.ZERO;
    if (addressStaked == null || globalStaked == null) return null;
    return addressStaked.div(globalStaked).times(100);
  }

  private updateAddressStakingInfo = async () => {
    const { chainId, address, TOKENS } = this.rootStore.accountStore;
    const { stakingContractAddress } = this;
    if (address == null) {
      this._setGlobalStaked(BN.ZERO);
      this._setAddressStaked(BN.ZERO);
      this._setClaimedReward(BN.ZERO);
      this._setClaimedReward(BN.ZERO);
      this._setAvailableToClaim(BN.ZERO);
      this._setLastClaimDate(BN.ZERO);
      return;
    }
    const keysArray = {
      globalStaked: "global_staked",
      addressStaked: `${address}_staked`,
      claimedReward: `${address}_${TOKENS.USDN.assetId}_claimed`,
      globalLastCheckInterest: `global_lastCheck_${TOKENS.USDN.assetId}_interest`,
      addressLastCheckInterest: `${address}_lastCheck_${TOKENS.USDN.assetId}_interest`,
      lastClaimDate: `${address}_${TOKENS.USDN.assetId}_lastClaim`,
    };
    const response = await nodeService.nodeKeysRequest(
      NODE_URL_MAP[chainId],
      stakingContractAddress,
      Object.values(keysArray)
    );
    //todo вынести в отдельную фунцию
    const parsedNodeResponse = [...(response ?? [])].reduce<Record<string, BN>>(
      (acc, { key, value }) => {
        Object.entries(keysArray).forEach(([regName, regValue]) => {
          const regexp = new RegExp(regValue);
          if (regexp.test(key)) {
            acc[regName] = new BN(value);
          }
        });
        return acc;
      },
      {}
    );

    const globalStaked = parsedNodeResponse["globalStaked"];
    const addressStaked = parsedNodeResponse["addressStaked"];
    const claimedReward = parsedNodeResponse["claimedReward"];
    const globalLastCheckInterest =
      parsedNodeResponse["globalLastCheckInterest"];
    const addressLastCheckInterest =
      parsedNodeResponse["addressLastCheckInterest"];
    const lastClaimDate = parsedNodeResponse["lastClaimDate"];

    this._setGlobalStaked(globalStaked);
    this._setAddressStaked(addressStaked ?? BN.ZERO);
    this._setClaimedReward(claimedReward ?? BN.ZERO);
    const availableToClaim = globalLastCheckInterest
      .minus(addressLastCheckInterest)
      .times(addressStaked);
    this._setAvailableToClaim(addressStaked ? availableToClaim : BN.ZERO);
    lastClaimDate && this._setLastClaimDate(lastClaimDate);
  };

  syncStats = async () => {
    const data = await statsService.getStakingStats();
    const formattedData = Object.entries(data).reduce(
      (acc, [name, { apy }]) => ({ ...acc, [name]: new BN(apy) }),
      {} as IStakingStats
    );
    this._setStats(formattedData);
  };

  claimReward = async () => {
    if (!this.canClaim) return;
    this._setLoading(true);
    const { accountStore, notificationStore } = this.rootStore;
    await accountStore
      .invoke({
        dApp: accountStore.CONTRACT_ADDRESSES.staking!,
        payment: [],
        call: {
          function: "claimReward",
          args: [],
        },
      })
      .then((txId) => {
        if (txId == null) return;
        notificationStore.notify(`Your rewards was claimed`, {
          type: "success",
          title: `Success`,
          link: `${accountStore.EXPLORER_LINK}/tx/${txId}`,
          linkTitle: "View on Explorer",
        });
      })
      .catch((e) => {
        notificationStore.notify(e.message ?? JSON.stringify(e), {
          type: "error",
          title: "Transaction is not completed",
        });
      })
      .then(this.updateAddressStakingInfo)
      .finally(() => this._setLoading(false));
  };
  stake = async () => {
    if (!this.canStake) return;
    this._setLoading(true);
    const { puzzleToken, puzzleAmountToStake, rootStore } = this;
    const { accountStore, notificationStore } = rootStore;
    const puzzleAmount = BN.formatUnits(
      this.puzzleAmountToStake,
      this.puzzleToken.decimals
    ).toFormat(2);
    await accountStore
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
        this._setAddressStaked(
          this.addressStaked?.plus(this.puzzleAmountToStake) ?? BN.ZERO
        );
        notificationStore.notify(
          `You can track your reward on the staking page`,
          {
            type: "success",
            title: `${puzzleAmount} PUZZLE successfully staked`,
            link: `${accountStore.EXPLORER_LINK}/tx/${txId}`,
            linkTitle: "View on Explorer",
          }
        );
      })
      .catch((e) => {
        notificationStore.notify(e.message ?? JSON.stringify(e), {
          type: "error",
          title: "Transaction is not completed",
        });
      })
      .then(this.updateAddressStakingInfo)
      .finally(() => this._setLoading(false));
  };
  unStake = async () => {
    if (!this.canUnStake) return;
    this._setLoading(true);
    const { puzzleAmountToUnstake, rootStore } = this;
    const { accountStore, notificationStore } = rootStore;
    const puzzleAmount = BN.formatUnits(
      this.puzzleAmountToUnstake,
      this.puzzleToken.decimals
    ).toFormat(2);
    await accountStore
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
        txId &&
          this._setAddressStaked(
            this.addressStaked?.minus(this.puzzleAmountToUnstake ?? BN.ZERO) ??
              BN.ZERO
          );
        txId &&
          notificationStore.notify(
            `You can track your available to trade PUZZLE balance in the header section`,
            {
              type: "success",
              title: `${puzzleAmount} PUZZLE successfully unstaked`,
              link: `${accountStore.EXPLORER_LINK}/tx/${txId}`,
              linkTitle: "View on Explorer",
            }
          );
      })
      .catch((e) => {
        notificationStore.notify(e.message ?? JSON.stringify(e), {
          type: "error",
          title: "Transaction is not completed",
        });
      })
      .then(this.updateAddressStakingInfo)
      .finally(() => this._setLoading(false));
  };

  get tokenStakeInputInfo() {
    const { address } = this.rootStore.accountStore;
    const rate =
      this.rootStore.poolsStore.usdnRate(this.puzzleToken.assetId, 1) ??
      BN.ZERO;
    const usdnEquivalentValue = rate.times(this.puzzleAmountToStake);
    const usdnEquivalent =
      "~ $ " +
      BN.formatUnits(usdnEquivalentValue, this.puzzleToken.decimals).toFixed(0);
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
      "~ $ " +
      BN.formatUnits(usdnEquivalentValue, this.puzzleToken.decimals).toFixed(0);
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
