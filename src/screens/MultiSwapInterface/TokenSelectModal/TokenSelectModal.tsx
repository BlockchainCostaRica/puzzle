import React, { createRef } from "react";
import useOnClickOutside from "@src/hooks/useOnClickOutside";
import SearchInput from "@screens/MultiSwapInterface/SearchInput";
import TokenInfo from "@screens/MultiSwapInterface/TokenSelectModal/TokenInfo";
import Dialog from "@components/Dialog";
import Scrollbar from "@src/Scrollbar";
import { Column } from "@src/components/Flex";
import SizedBox from "@components/SizedBox";

interface IProps {
  onClose: () => void;
}

const tokens = [
  {
    name: "Waves",
    symbol: "Waves",
    price: "200.00",
    dollarPrice: "14,432.13",
  },
  {
    name: "Puzzle Token",
    symbol: "PUZZLE",
    dollarPrice: "14,432.13",
    price: "136.0123",
    active: true,
  },
  {
    symbol: "USDN",
    name: "Neutrino USD",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
  {
    symbol: "SWOP",
    name: "SWOPfi",
    dollarPrice: "14,432.13",
    price: "",
    active: true,
  },
];
const TokenSelectModal: React.FC<IProps> = ({ onClose }) => {
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
            <TokenInfo key={t.name} {...t} />
          ))}
          <SizedBox height={16} width={16} />
        </Column>
      </Scrollbar>
    </Dialog>
  );
};
export default TokenSelectModal;
