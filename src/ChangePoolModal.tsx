import React, { useState } from "react";
import Dialog from "@components/Dialog";
import SearchInput from "@components/SearchInput";
import { useStores } from "@stores";
import SquareTokenIcon from "@components/SquareTokenIcon";
import SizedBox from "@components/SizedBox";
import styled from "@emotion/styled";
import { Column, Row } from "@components/Flex";
import Text from "@components/Text";
import Scrollbar from "./components/Scrollbar";

interface IProps {
  onChange: (id: string) => void;
  onClose: () => void;
  visible: boolean;
  activePoolId?: string;
}

const Pool = styled.div<{ active?: boolean }>`
  position: relative;
  display: flex;
  cursor: ${({ active }) => (!active ? "pointer" : "not-allowed")};
  justify-content: space-between;
  width: 100%;
  padding: 10px 24px;
  box-sizing: border-box;

  :hover {
    ${({ active }) => !active && "background: #f1f2fe;"};
  }
`;

const Gradient = styled.div`
  display: flex;
  bottom: 0;
  left: 0;
  top: 0;
  width: 100%;
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  z-index: 10;
`;
const ChangePoolModal: React.FC<IProps> = ({
  onChange,
  activePoolId,
  ...rest
}) => {
  const { poolsStore, accountStore } = useStores();
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredPools = poolsStore.pools
    .slice()
    .filter(({ id }) =>
      Object.keys(accountStore.ROUTES.invest).some((key) => key === id)
    )
    .filter(({ name, tokens }) =>
      searchValue
        ? [name, ...tokens.map(({ symbol }) => symbol)]
            .map((v) => v.toLowerCase())
            .some((v) => v.includes(searchValue.toLowerCase()))
        : true
    );
  return (
    <Dialog
      style={{ maxWidth: 360 }}
      bodyStyle={{ minHeight: 440 }}
      title="Select a pool"
      {...rest}
    >
      <SearchInput
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search by name or ticker…"
      />
      <SizedBox height={24} />
      <Scrollbar style={{ margin: "0 -24px" }}>
        <Column crossAxisSize="max" style={{ maxHeight: 352 }}>
          {filteredPools && filteredPools.length > 0 ? (
            filteredPools.map((pool) => (
              <Pool
                onClick={() => onChange(pool.id)}
                active={pool.id === activePoolId}
              >
                {pool.id === activePoolId && <Gradient />}
                <Row>
                  <SquareTokenIcon src={pool.logo} size="small" />
                  <SizedBox width={8} />
                  <Column>
                    <Text size="medium">{pool.name}</Text>
                    <Text
                      size="small"
                      type="secondary"
                      style={{ maxWidth: 130, overflowWrap: "anywhere" }}
                    >
                      {pool.tokens.map((t) => t.name).join(", ")}
                    </Text>
                  </Column>
                </Row>
                <Column>
                  <Text>
                    {(poolsStore &&
                      poolsStore.poolsStats &&
                      poolsStore.poolsStats[pool.id].apy.toFormat(2)) ??
                      "--"}
                    %
                  </Text>
                  <Text size="small" type="secondary" textAlign="right">
                    APY
                  </Text>
                </Column>
              </Pool>
            ))
          ) : (
            <Text style={{ padding: "10px 24px" }}>No pools found</Text>
          )}
        </Column>
      </Scrollbar>
    </Dialog>
  );
};

export default ChangePoolModal;
