import styled from "@emotion/styled";
import React from "react";
import Layout from "@components/Layout";
import { observer, Observer } from "mobx-react-lite";
import Card from "@components/Card";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import SwitchButtons from "@components/SwitchButtons";
import Button from "@components/Button";
import { InvestToPoolInterfaceVMProvider } from "@screens/InvestToPoolInterface/InvestToPoolInterfaceVM";
import { useAddLiquidityInterfaceVM } from "@screens/AddLiquidityInterface/AddLiquidityInterfaceVM";

interface IProps {
  poolId: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  min-height: 100%;
  margin-bottom: 24px;
  margin-top: 40px;
  width: 100%;
  max-width: 560px;
  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const AddLiquidityInterfaceImpl = () => {
  const vm = useAddLiquidityInterfaceVM();
  return (
    <Layout>
      <Observer>
        {() => (
          <Root>
            <Text weight={500} size="large">
              Deposit liquidity
            </Text>
            <SizedBox height={4} />
            <Text size="medium" type="secondary">
              Select a pool to invest
            </Text>
            <SizedBox height={24} />
            <SwitchButtons
              values={["Multiple tokens", "EGG Token"]}
              active={0}
              onActivate={() => null}
            />
            <SizedBox height={24} />
            <Text style={{ width: "100%" }} weight={500} type="secondary">
              To
            </Text>
            <SizedBox height={8} />
            <Card></Card>
            <SizedBox height={24} />

            <Text style={{ width: "100%" }} weight={500} type="secondary">
              Amount
            </Text>
            <SizedBox height={8} />
            <Card></Card>
            <SizedBox height={24} />

            <Text style={{ width: "100%" }} weight={500} type="secondary">
              Deposit composition
            </Text>
            <SizedBox height={8} />
            <Card></Card>
            <SizedBox height={24} />
            <Button fixed>Deposit $ 0</Button>
          </Root>
        )}
      </Observer>
    </Layout>
  );
};

const AddLiquidityInterface: React.FC<IProps> = ({ poolId }) => {
  return (
    <InvestToPoolInterfaceVMProvider poolId={poolId}>
      <AddLiquidityInterfaceImpl />
    </InvestToPoolInterfaceVMProvider>
  );
};

export default observer(AddLiquidityInterface);
