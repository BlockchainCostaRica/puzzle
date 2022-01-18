import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Column } from "@components/Flex";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import { useStores } from "@stores";
import { useInvestToPoolInterfaceVM } from "@screens/InvestToPoolInterface/InvestToPoolInterfaceVM";

interface IProps {}

const Root = styled.div`
  width: 100%;
  display: grid;
  column-gap: 8px;
  grid-template-columns: 1fr 1fr;
`;
const LoggedInLiquidityInfo: React.FC<IProps> = () => {
  const vm = useInvestToPoolInterfaceVM();
  const [info, setInfo] = useState<{ liquidity: string; percent: string }>({
    liquidity: "-",
    percent: "-",
  });
  const { accountStore } = useStores();
  const { getAccountLiquidityInfo } = vm.pool;

  useEffect(() => {
    accountStore.address &&
      getAccountLiquidityInfo(accountStore.address).then((res) => setInfo(res));
  }, [accountStore, getAccountLiquidityInfo]);

  if (vm.pool == null || accountStore.address == null) return null;

  return (
    <Root>
      <Column crossAxisSize="max">
        <Text type="secondary">Value</Text>
        <SizedBox height={4} />
        <Text style={{ fontSize: 24 }}>{info.liquidity}</Text>
        <SizedBox height={16} />
        <Button fixed size="medium" kind="secondary">
          Withdraw
        </Button>
      </Column>
      <Column crossAxisSize="max">
        <Text type="secondary">Share of pool</Text>
        <SizedBox height={4} />
        <Text style={{ fontSize: 24 }}>{info.percent}</Text>
        <SizedBox height={16} />
        <Button fixed size="medium">
          Deposit
        </Button>
      </Column>
    </Root>
  );
};
export default observer(LoggedInLiquidityInfo);
