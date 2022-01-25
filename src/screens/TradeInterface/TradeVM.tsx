import React, { useMemo } from "react";
import { useVM } from "@src/hooks/useVM";
import { action, makeAutoObservable, reaction } from "mobx";
import { RootStore, useStores } from "@stores";
import Balance from "@src/entities/Balance";
import BN from "@src/utils/BN";
import aggregatorService, { TCalcRoute } from "@src/services/aggregatorService";
import { TRADE_FEE } from "@src/constants";

const ctx = React.createContext<TradeVM | null>(null);

export const TradeVMProvider: React.FC = ({ children }) => {
  const rootStore = useStores();
  const store = useMemo(() => new TradeVM(rootStore), [rootStore]);
  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

export const useTradeVM = () => useVM(ctx);

class TradeVM {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
    const { TOKENS } = rootStore.accountStore;
    const params = new URLSearchParams(window.location.search);
    const asset0 = params.get("asset0")?.toString();
    const asset1 = params.get("asset1")?.toString();
    this.assetId0 = asset0 ?? TOKENS.USDN.assetId;
    this.assetId1 = asset1 ?? TOKENS.PUZZLE.assetId;
    this._syncAmount1();
    reaction(
      () => [this.assetId0, this.assetId1, this.amount0],
      this._syncAmount1
    );
  }

  synchronizing: boolean = false;
  @action.bound setSynchronizing = (synchronizing: boolean) =>
    (this.synchronizing = synchronizing);

  priceImpact: BN = BN.ZERO;
  @action.bound private _setPriceImpact = (priceImpact: BN) =>
    (this.priceImpact = priceImpact);

  route: Array<TCalcRoute> = [];
  @action.bound private _setRoute = (route: Array<TCalcRoute>) =>
    (this.route = route);

  assetId0: string;
  @action.bound setAssetId0 = (assetId: string) => (this.assetId0 = assetId);

  assetId1: string;
  @action.bound setAssetId1 = (assetId: string) => (this.assetId1 = assetId);

  amount0: BN = BN.ZERO;
  @action.bound setAmount0 = (amount: BN) => (this.amount0 = amount);

  amount1: BN = BN.ZERO;
  @action.bound private _setAmount1 = (amount: BN) => (this.amount1 = amount);

  @action.bound private _syncAmount1 = () => {
    const { amount0, assetId0, assetId1 } = this;
    const invalidAmount = amount0 == null || amount0.isNaN || amount0.lte(0);
    this.setSynchronizing(true);
    aggregatorService
      .calc(assetId0, assetId1, invalidAmount ? new BN(1) : amount0)
      .then(({ estimatedOut, priceImpact, routes }) => {
        !invalidAmount && this._setAmount1(new BN(estimatedOut));
        !invalidAmount && this._setPriceImpact(new BN(priceImpact).times(100));
        this._setRoute(routes);
        console.log(routes);
      })
      .catch(() => {
        this._setAmount1(BN.ZERO);
        this._setPriceImpact(BN.ZERO);
        this._setRoute([]);
      })
      .finally(() => this.setSynchronizing(false));
  };

  get token0() {
    return this.balances.find(({ assetId }) => assetId === this.assetId0)!;
  }

  get balance0() {
    return this.token0?.balance;
  }

  get token1() {
    return this.balances.find(({ assetId }) => assetId === this.assetId1)!;
  }

  get simpleRoute() {
    if (
      this.route == null ||
      this.route.length <= 0 ||
      this.route[0].exchanges.length <= 0
    ) {
      return null;
    }

    const simpleRoute = this.route[0].exchanges.reduce<Array<string>>(
      (acc, e, i) => [
        ...acc,
        ...(i === 0 ? [e.from, e.to] : [e.to]).map((v) => {
          const asset = this.getBalanceByAssetId(v);
          return asset != null ? asset.symbol : "UNKNOWN";
        }),
      ],
      []
    );

    return simpleRoute.length < 4
      ? simpleRoute
      : [simpleRoute[0], "...", simpleRoute[simpleRoute.length - 1]];
  }

  getBalanceByAssetId = (assetId: string) =>
    this.balances.find((b) => assetId === b.assetId);

  get balances() {
    const { accountStore } = this.rootStore;
    return (
      Object.values(this.rootStore.accountStore.TOKENS)
        .map((t) => {
          const balance = accountStore.findBalanceByAssetId(t.assetId);
          return balance ?? new Balance(t);
        })
        // .sort((a, b) => b.symbol.localeCompare(b.symbol));
        .sort((a, b) => {
          if (a.usdnEquivalent == null && b.usdnEquivalent == null) return 0;
          if (a.usdnEquivalent == null && b.usdnEquivalent != null) return 1;
          if (a.usdnEquivalent == null && b.usdnEquivalent == null) return -1;
          return a.usdnEquivalent!.lt(b.usdnEquivalent!) ? 1 : -1;
        })
    );
  }

  get minimumToReceive(): BN {
    return this.amount1.times(TRADE_FEE);
  }

  get price(): BN | null {
    const price = BN.formatUnits(this.amount1, this.token1.decimals).div(
      BN.formatUnits(this.amount0, this.token0.decimals)
    );
    return !price.isNaN() ? price : null;
  }

  switchTokens = () => {
    const assetId0 = this.assetId0;
    this.setAssetId0(this.assetId1);
    this.setAssetId1(assetId0);
  };

  swap = async () => {
    return this.rootStore.accountStore.invoke({
      dApp: "",
      payment: [],
      call: { function: "swap", args: [] },
    });
  };
}
