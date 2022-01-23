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

  a {
    width: 100%;
  }
`;
const LoggedInLiquidityInfo: React.FC<IProps> = () => {
  const vm = useInvestToPoolInterfaceVM();
  const liquidity = vm.accountLiquidity?.toFormat(2);
  const shareOfPool = vm.accountShareOfPool?.toFormat(2);

  return (
    <Root>
      <Column crossAxisSize="max">
        <Text type="secondary">Value</Text>
        <SizedBox height={4} />
        <Text nowrap style={{ fontSize: 24 }}>
          {liquidity ? "$" + liquidity : "-"}
        </Text>
        <SizedBox height={16} />
        <Link to={`/${vm.pool.id}/withdraw`}>
          <Button fixed size="medium" kind="secondary">
            Withdraw
          </Button>
        </Link>
      </Column>
      <Column crossAxisSize="max">
        <Text nowrap type="secondary">
          Share of pool
        </Text>
        <SizedBox height={4} />
        <Text style={{ fontSize: 24 }}>
          {shareOfPool ? shareOfPool.concat("%") : "-"}
        </Text>
        <SizedBox height={16} />
        <Link to={`/${vm.pool.id}/addLiquidity`}>
          <Button fixed size="medium">
            Deposit
          </Button>
        </Link>
      </Column>
    </Root>
  );
};
export default observer(LoggedInLiquidityInfo);
