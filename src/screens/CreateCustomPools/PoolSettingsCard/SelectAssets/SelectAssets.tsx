import styled from "@emotion/styled";
import React, { useState } from "react";
import Card from "@components/Card";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Notification from "@components/Notification";
import Button from "@components/Button";
import { ReactComponent as Add } from "@src/assets/icons/add.svg";
import { observer } from "mobx-react-lite";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";
import TokenCompositionRow from "./TokenCompositionRow";
import TokenSelectModal from "@components/TokensSelectModal/TokenSelectModal";

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
  const [addAssetModal, openAssetModal] = useState(false);
  const vm = useCreateCustomPoolsVM();
  const assetNotification =
    "Please note that the pool must include a USDN asset with at least 2% of pool weight and the maximum of 10 different assets.";
  return (
    <Root>
      <Text type="secondary" weight={500}>
        Select Assets
      </Text>
      <SizedBox height={8} />
      <Card style={{ width: "100%" }}>
        <Notification type="info" text={assetNotification} />
        <Grid>
          {vm.poolsAssets.map(({ asset, share, locked }) => (
            <TokenCompositionRow
              locked={locked}
              onLockClick={() => vm.updateLockedState(asset.assetId, !locked)}
              onUpdateAsset={vm.changeAssetInShareInPool}
              balances={vm.tokensToAdd}
              asset={asset}
              share={share}
              setShare={(e) =>
                vm.changeAssetShareInPool(asset.assetId, Number(e.target.value))
              }
              onDelete={() => vm.removeAssetFromPool(asset.assetId)}
            />
          ))}
        </Grid>
        {vm.poolsAssets.length < 10 && (
          <Button
            fixed
            size="medium"
            kind="secondary"
            onClick={() => openAssetModal(true)}
          >
            Add an asset
            <SizedBox width={10} />
            <Add />
          </Button>
        )}
        <TokenSelectModal
          visible={addAssetModal}
          onSelect={vm.addAssetToPool}
          balances={vm.tokensToAdd}
          onClose={() => openAssetModal(!addAssetModal)}
        />
      </Card>
      <SizedBox height={24} />
      <Button fixed disabled={!vm.canContinue} onClick={() => vm.setStep(1)}>
        Continue
      </Button>
    </Root>
  );
};
export default observer(SelectsAssets);
