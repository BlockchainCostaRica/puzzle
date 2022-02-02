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

  public puzzleAmount: BN = BN.ZERO;
  @action.bound public setPuzzleAmount = (value: BN) =>
    (this.puzzleAmount = value);

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
      addressStaked ? new BN(addressStaked[0].value) : BN.ZERO
    );
    this.setGlobalStaked(
      globalStaked ? new BN(globalStaked[0].value) : BN.ZERO
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
    const { puzzleToken, puzzleAmount } = this;
    return this.rootStore.accountStore.invoke({
      dApp: this.rootStore.accountStore.CONTRACT_ADDRESSES.staking ?? "",
      payment: [
        {
          assetId: puzzleToken.assetId,
          amount: puzzleAmount.toString(),
        },
      ],
      call: {
        function: "stake",
        args: [],
      },
    });
  };
  unStake = () => {
    const { puzzleAmount } = this;
    return this.rootStore.accountStore.invoke({
      dApp: this.rootStore.accountStore.CONTRACT_ADDRESSES.staking ?? "",
      payment: [],
      call: {
        function: "unStake",
        args: [
          {
            type: "integer",
            value: puzzleAmount.toString(),
          },
        ],
      },
    });
  };

  get tokenInputInfo() {
    if (this.action === 0)
      return {
        selectable: false,
        decimals: this.puzzleToken.decimals,
        amount: this.puzzleAmount,
        setAmount: this.setPuzzleAmount,
        assetId: this.puzzleToken.assetId,
        balances: [this.puzzleBalance],
      };
    else {
      return {
        selectable: false,
        decimals: this.puzzleToken.decimals,
        amount: this.puzzleAmount,
        setAmount: this.setPuzzleAmount,
        assetId: this.puzzleToken.assetId,
        balances: [this.puzzleBalance],
      };
    }
  }
}
