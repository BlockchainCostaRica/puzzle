import styled from "@emotion/styled";
import React from "react";
import { useWalletVM } from "@components/Wallet/WalletModal/WalletVM";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";
import SquareTokenIcon from "@components/SquareTokenIcon";

interface IProps {}

const PoolsBalances: React.FC<IProps> = () => {
  const vm = useWalletVM();
  const { poolsStore } = useStores();
  return (
    <>
      {poolsStore.pools.map((pool) => {
        return <SquareTokenIcon src={pool.logo} />;
      })}
    </>
  );
};
export default observer(PoolsBalances);
