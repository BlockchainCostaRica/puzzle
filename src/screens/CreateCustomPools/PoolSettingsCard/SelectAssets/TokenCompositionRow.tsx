import styled from "@emotion/styled";
import React, { ChangeEvent, useState } from "react";
import { IToken } from "@src/constants";
import Balance from "@src/entities/Balance";
import RoundTokenIcon from "@components/RoundTokenIcon";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import TokenSelectModal from "@components/TokensSelectModal/TokenSelectModal";
import { ReactComponent as ArrowDownIcon } from "@src/assets/icons/arrowDown.svg";
import { ReactComponent as Lock } from "@src/assets/icons/lock.svg";
import { ReactComponent as Unlock } from "@src/assets/icons/unlock.svg";
import { ReactComponent as Close } from "@src/assets/icons/smallClose.svg";
import { Row } from "@src/components/Flex";
import ShareTokenInput from "@screens/CreateCustomPools/PoolSettingsCard/SelectAssets/ShareTokenInput";

interface IProps {
  balances: Balance[];

  asset: IToken;
  onUpdateAsset: (assetId: string, newAssetId: string) => void;

  share: number;
  setShare: (e: ChangeEvent<HTMLInputElement>) => void;

  locked: boolean;
  onLockClick: () => void;

  onDelete: () => void;
}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const AssetContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #f1f2fe;
  border-radius: 10px;
  width: fit-content;
  padding: 8px;
  align-items: center;
`;

const TokenCompositionRow: React.FC<IProps> = ({
  onUpdateAsset,
  asset,
  balances,
  setShare,
  share,
  locked,
  onLockClick,
  onDelete,
}) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Root>
      <AssetContainer>
        <RoundTokenIcon src={asset.logo} />
        <SizedBox width={8} />
        <Text>{asset.symbol}</Text>
        <ArrowDownIcon
          onClick={() => setOpenModal(true)}
          style={{ rotate: "90deg" }}
        />
      </AssetContainer>
      <Row mainAxisSize="fit-content" alignItems="center">
        <ShareTokenInput value={share} onChange={setShare} />
        <SizedBox width={10} />
        {locked ? (
          <Lock onClick={onLockClick} />
        ) : (
          <Unlock onClick={onLockClick} />
        )}
        <SizedBox width={10} />
        <Close style={{ width: 16, height: 16 }} onClick={onDelete} />
      </Row>
      <TokenSelectModal
        selectedTokenId={asset.assetId}
        visible={openModal}
        onSelect={(newAssetId) => onUpdateAsset(asset.assetId, newAssetId)}
        balances={balances}
        onClose={() => setOpenModal(!openModal)}
      />
    </Root>
  );
};
export default TokenCompositionRow;
