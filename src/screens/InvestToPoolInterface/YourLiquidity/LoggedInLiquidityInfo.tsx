import styled from "@emotion/styled";
import React from "react";
import { observer } from "mobx-react-lite";
import { Column } from "@components/Flex";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import { useInvestToPoolInterfaceVM } from "@screens/InvestToPoolInterface/InvestToPoolInterfaceVM";
import { Link } from "react-router-dom";

interface IProps {}

const Root = styled.div`
  width: 100%;
  display: grid;
  column-gap: 8px;
  grid-template-columns: 1fr 1fr;
`;
const LoggedInLiquidityInfo: React.FC<IProps> = () => {
  const vm = useInvestToPoolInterfaceVM();

  return (
    <Root>
      <Column crossAxisSize="max">
        <Text type="secondary">Value</Text>
        <SizedBox height={4} />
        <Text nowrap style={{ fontSize: 24 }}>
          {vm.accountLiquidity ?? "-"}
        </Text>
        <SizedBox height={16} />
        <Button fixed size="medium" kind="secondary">
          Withdraw
        </Button>
      </Column>
      <Column crossAxisSize="max">
        <Text nowrap type="secondary">
          Share of pool
        </Text>
        <SizedBox height={4} />
        <Text style={{ fontSize: 24 }}>{vm.accountShareOfPool ?? "-"}</Text>
        <SizedBox height={16} />
        <Button fixed size="medium">
          Deposit
        </Button>
      </Column>
    </Root>
  );
};
export default observer(LoggedInLiquidityInfo);
