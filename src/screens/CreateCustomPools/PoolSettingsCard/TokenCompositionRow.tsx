import styled from "@emotion/styled";
import React, { useState } from "react";
import { IToken } from "@src/constants";
import Balance from "@src/entities/Balance";
import RoundTokenIcon from "@components/RoundTokenIcon";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import TokenSelectModal from "@components/TokensSelectModal/TokenSelectModal";
import { ReactComponent as Arrow } from "@src/assets/icons/arrowRightBorderless.svg";

interface IProps {
  balances: Balance[];

  asset: IToken;
  setAssetId?: (assetId: string) => void;

  share?: number;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
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
  setAssetId,
  asset,
  balances,
  share,
}) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Root>
      <AssetContainer>
        <RoundTokenIcon src={asset.logo} />
        <SizedBox width={8} />
        <Text>{asset.symbol}</Text>
        <Arrow onClick={() => setOpenModal(true)} />
      </AssetContainer>
      <TokenSelectModal
        selectedTokenId={asset.assetId}
        visible={openModal}
        onSelect={() => null}
        balances={balances}
        onClose={() => setOpenModal(!openModal)}
      />
    </Root>
  );
};
export default TokenCompositionRow;
