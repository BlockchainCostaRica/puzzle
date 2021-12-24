import React, { createRef } from "react";
import useOnClickOutside from "@src/hooks/useOnClickOutside";
import SearchInput from "@screens/MultiSwapInterface/SearchInput";
import TokenInfo from "@screens/MultiSwapInterface/TokenSelectModal/TokenInfo";
import Dialog from "@components/Dialog";
import Scrollbar from "@src/Scrollbar";
import { Column } from "@src/components/Flex";
import SizedBox from "@components/SizedBox";
import { ITokenConfig } from "@src/constants";

interface IProps {
  onClose: () => void;
  tokens: ITokenConfig[];
}

const TokenSelectModal: React.FC<IProps> = ({ onClose, tokens }) => {
  const ref = createRef<HTMLDivElement>();
  useOnClickOutside(ref, onClose);
  return (
    <Dialog style={{ maxWidth: 360 }} onClose={onClose} title="Select a token">
      <SearchInput
        value=""
        onClick={() => {}}
        placeholder="Search by name or ticker…"
      />
      <SizedBox height={16} />
      <Scrollbar style={{ marginRight: -16 }}>
        <Column
          crossAxisSize="max"
          style={{ maxHeight: 352, paddingRight: 16 }}
        >
          {tokens.map((t) => (
            <TokenInfo key={t.assetId} token={t} />
          ))}
          <SizedBox height={16} width={16} />
        </Column>
      </Scrollbar>
    </Dialog>
  );
};
export default TokenSelectModal;
