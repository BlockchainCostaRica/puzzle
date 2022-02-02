import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable, when } from "mobx";
import { RootStore, useStores } from "@stores";
import BN from "@src/utils/BN";
import Balance from "@src/entities/Balance";
import nodeRequest from "@src/utils/nodeRequest";

const ctx = React.createContext<StakingVM | null>(null);

export const StakingVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new StakingVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useStakingVM = () => useVM(ctx);

class StakingVM {
  private stakingContractAddress: string = "";
  @action.bound private _setStakingAddress = (v: string) =>
    (this.stakingContractAddress = v);

  public action: 0 | 1 = 0;
  @action.bound setAction = (v: 0 | 1) => (this.action = v);

  public globalStaked: BN | null = null;
  public addressStaked: BN | null = null;

  @action.bound setGlobalStaked = (v: BN) => (this.globalStaked = v);
  @action.bound setAddressStaked = (v: BN) => (this.addressStaked = v);

  constructor(private rootStore: RootStore) {
    const { accountStore } = this.rootStore;
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
    const { chainId, address } = this.rootStore.accountStore;
    const { stakingContractAddress } = this;

    const [globalStaked, addressStaked] = await Promise.all([
      nodeRequest(chainId, stakingContractAddress, "global_staked"),
      nodeRequest(chainId, stakingContractAddress, `${address}_staked`),
    ]);
    this.setAddressStaked(
      addressStaked && addressStaked.length > 0
        ? new BN(addressStaked[0].value)
        : BN.ZERO
    );
    this.setGlobalStaked(
      globalStaked && globalStaked.length > 0
        ? new BN(globalStaked[0].value)
        : BN.ZERO
    );
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
    const { puzzleToken, puzzleAmountToStake } = this;
    return this.rootStore.accountStore.invoke({
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
    });
  };
  unStake = () => {
    const { puzzleAmountToUnstake } = this;
    return this.rootStore.accountStore.invoke({
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
    });
  };

  get tokenStakeInputInfo() {
    const { address } = this.rootStore.accountStore;
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
    };
  }

  get unstakeTokenInputInfo() {
    const { address } = this.rootStore.accountStore;
    const balances = new Balance({
      ...this.puzzleBalance,
      balance: this.addressStaked ?? BN.ZERO,
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
    };
  }

  get canStake(): boolean {
    return (
      this.puzzleAmountToStake.gt(0) &&
      this.puzzleAmountToStake.lte(this.puzzleAmountToStake) &&
      this.puzzleBalance.balance?.gt(0) != null
    );
  }

  get canUnStake(): boolean {
    return (
      this.puzzleAmountToUnstake.gt(0) &&
      this.puzzleAmountToUnstake.lte(this.puzzleAmountToUnstake) &&
      this.globalStaked?.gt(0) != null
    );
  }
}
