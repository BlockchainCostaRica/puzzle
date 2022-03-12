import styled from "@emotion/styled";
import React from "react";
import Card from "@components/Card";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Notification from "@components/Notification";
import Button from "@components/Button";
import { ReactComponent as Add } from "@src/assets/icons/add.svg";
import { observer } from "mobx-react-lite";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";
import TokenCompositionRow from "@screens/CreateCustomPools/PoolSettingsCard/TokenCompositionRow";
import { useStores } from "@stores";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Grid = styled.div`
  display: grid;
  row-gap: 26px;
  padding: 24px 0;
`;
const SelectsAssets: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const vm = useCreateCustomPoolsVM();
  const assetNotification =
    "Please note that the pool must include a USDN asset with at least 2% of pool weight and the maximum of 10 different assets.";
  return (
    <Root>
      <Text type="secondary" weight={500}>
        Select Assets
      </Text>
      <SizedBox height={8} />
      <Card style={{ width: "100%" }}>
        <Notification type="info" text={assetNotification} />
        <Grid>
          {vm.poolsAssets.map(({ asset }) => (
            <TokenCompositionRow
              balances={accountStore.assetBalances ?? []}
              asset={asset}
            />
          ))}
        </Grid>
        {vm.poolsAssets.length < 10 && (
          <Button fixed size="medium" kind="secondary">
            Add an asset
            <SizedBox width={10} />
            <Add />
          </Button>
        )}
      </Card>
      <SizedBox height={24} />
      <Button fixed disabled={!vm.canContinue} onClick={() => vm.setStep(1)}>
        Continue
      </Button>
    </Root>
  );
};
export default observer(SelectsAssets);
