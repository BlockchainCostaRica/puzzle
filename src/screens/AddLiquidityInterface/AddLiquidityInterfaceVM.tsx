import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable, reaction } from "mobx";
import { RootStore, useStores } from "@stores";
import BN from "@src/utils/BN";
import axios from "axios";

const ctx = React.createContext<AddLiquidityInterfaceVM | null>(null);

export const AddLiquidityInterfaceVMProvider: React.FC<{ poolId: string }> = ({
  poolId,
  children,
}) => {
  const rootStore = useStores();
  const store = useMemo(
    () => new AddLiquidityInterfaceVM(rootStore, poolId),
    [rootStore, poolId]
  );
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useAddLiquidityInterfaceVM = () => useVM(ctx);

type TStats = {
  apy: number;
  fees: number;
  liquidity: number;
  monthly_volume: number;
  volume: { date: number; volume: number }[];
};

interface IDepositToken {
  assetId: string;
  amount: BN;
  decimal: number;
}

class AddLiquidityInterfaceVM {
  public poolId: string;
  public rootStore: RootStore;
  public baseTokenAmount: BN = BN.ZERO;
  @action.bound public setBaseTokenAmount = (value: BN) =>
    (this.baseTokenAmount = value);

  public stats: TStats | null = null;
  private setStats = (stats: TStats | null) => (this.stats = stats);

  //todo combine into one variable
  public depositComposition: Record<string, BN> | null = null;
  private setDepositComposition = (value: Record<string, BN>) =>
    (this.depositComposition = value);

  //fixme
  public tokensToDepositAmount: Record<string, IDepositToken> | null = null;
  private setTokensToDepositAmount = (value: Record<string, IDepositToken>) =>
    (this.tokensToDepositAmount = value);

  public minAssetFromPool: BN | null = null;
  private setMinAssetFromPool = (value: BN) => (this.minAssetFromPool = value);

  providedPercentOfPool: BN = new BN(50);
  @action.bound setProvidedPercentOfPool = (value: number) =>
    (this.providedPercentOfPool = new BN(value));

  constructor(rootStore: RootStore, poolId: string) {
    this.poolId = poolId;
    this.rootStore = rootStore;
    this.updateStats().catch(() =>
      console.error(`Cannot update stats of ${this.poolId}`)
    );
    reaction(
      () => this.rootStore.accountStore.assetBalances,
      this.updateDepositComposition
    );
    makeAutoObservable(this);
  }

  updateStats = () =>
    axios
      .get(`https://puzzleback.herokuapp.com/stats/${this.poolId}/30d`)
      .then(({ data }) => this.setStats(data));

  public get poolStats() {
    const { apy, monthly_volume, liquidity } = this.stats ?? {};
    return {
      apy: apy ? new BN(apy).toFormat(4).concat("%") : "–",
      monthlyVolume: monthly_volume ? new BN(monthly_volume).toFormat(1) : "–",
      liquidity: liquidity ? new BN(liquidity).toFormat(4) : "–",
    };
  }

  public get pool() {
    return this.rootStore.poolsStore.pools.find(({ id }) => id === this.poolId);
  }

  public get baseToken() {
    return this.pool!.getAssetById(this.pool!.baseTokenId)!;
  }

  //алгоритм для ползунка в addLiquidity
  //
  // для каждого из токенов в пуле с tokenId:
  //
  // 1- userTokenIdBalance = баланс пользователя токенов tokenId
  // 2- найти значение maxIssuePossible(tokenId) = global_poolToken_amount * userTokenIdBalance / global_tokenId_balance
  // 3- найти минимальное из maxIssuePossible - это будет число индекс токенов, которые пользователь выпустит при значении ползунка 100%

  get minimaAssetBalance() {
    return this.depositComposition != null
      ? BN.min(...Object.values(this.depositComposition))
      : BN.ZERO;
  }

  get minPIssued() {
    if (this.pool == null) return null;

    return BN.min(
      ...this.pool.tokens.map(({ assetId }) => {
        const asset = this.rootStore.accountStore.assetBalances.find(
          (token) => token.assetId === assetId
        );
        return this.pool!.globalPoolTokenAmount.times(
          asset?.balance ?? BN.ZERO
        ).div(this.pool!.liquidity[assetId]);
      })
    );
  }

  //todo make getter
  updateDepositComposition = () => {
    if (this.pool == null) return;

    const value = this.pool.tokens.reduce<Record<string, BN>>(
      (acc, { assetId }) => {
        const asset = this.rootStore.accountStore.assetBalances.find(
          (token) => token.assetId === assetId
        );
        const available =
          asset && asset.balance
            ? BN.formatUnits(asset.balance, asset.decimals)
            : BN.ZERO;
        return {
          ...acc,
          [assetId]: available,
        };
      },
      {}
    );
    this.setDepositComposition(value);
  };

  get calculateAmountsToDeposit() {
    if (this.pool == null) return;

    const value = this.pool.tokens.reduce<Record<string, string>>(
      (acc, { assetId }) => {
        // const Dk =  (((poolTokenAmount + minPIssued) / poolTokenAmount - 1) * Bk) /
        //   this.poolData.tokenDecimals[tokenNum];
        const tokenBalance =
          (this.pool && this.pool.liquidity[assetId]) ?? BN.ZERO;
        const dk = this.pool!.globalPoolTokenAmount.plus(
          this.minPIssued ?? BN.ZERO
        )
          .div(this.pool!.globalPoolTokenAmount)
          .minus(new BN(1))
          .times(tokenBalance)
          .times(this.providedPercentOfPool)
          .times(0.01)
          .toFormat(2);
        //fixme to correct decimal
        return {
          ...acc,
          [assetId]: dk,
        };
      },
      {}
    );
    return value;
  }

  //call invoke
  //or (const name of this.poolData.tokenNames) {
  //   payments.push({
  //     assetId: this.dicBalances[name].tokenId,
  //     amount: Math.floor(
  //       Math.floor(
  //         this.calculateTokenToDeposit(name) *
  //           Number(this.state.percentage) *
  //           0.01 *
  //           this.dicBalances[name].decimals
  //       )
  //     ),
  //   });
  // }
  // console.log(payments);
  // globalSigner.signer
  //   .invoke({
  //     dApp: this.poolData.layer2Address,
  //     fee: 500000,
  //     payment: payments,
  //     call: {
  //       function: "generateIndexAndStake",
  //       args: [],
  //     },
  //     feeAssetId: "WAVES",
  //   })
  //   .broadcast()
}
