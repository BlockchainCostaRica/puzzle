import styled from "@emotion/styled";
import React, { useState } from "react";
import { Row } from "@components/Flex";
import { ReactComponent as BalanceIcon } from "@src/assets/icons/balance.svg";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import centerEllipsis from "@src/utils/centerEllipsis";
import arrowIcon from "@src/assets/icons/arrowRightBorderless.svg";
import * as identityImg from "identity-img";
import { useStores } from "@stores";
import Tooltip from "@components/Tooltip";
import { observer } from "mobx-react-lite";
import BN from "@src/utils/BN";
import WalletBalancesTooltip from "@src/screens/TradeInterface/TokenSelectModal/WalletBalancesTooltip";
import WalletActionsTooltip from "@src/screens/TradeInterface/TokenSelectModal/WalletActionsTooltip";
// import WalletActionsTooltip from "@screens/TradeInterface/TokenSelectModal/WalletActionsTooltip";
// import WalletBalancesTooltip from "@screens/TradeInterface/TokenSelectModal/WalletBalancesTooltip";

interface IProps {}

const Root = styled(Row)`
  align-items: center;
  height: fit-content;
  justify-content: space-between;
  @media (min-width: 880px) {
    justify-content: flex-end;
  }
  .balances {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const AddressContainer = styled.div<{ expanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 16px;
  box-sizing: border-box;
  border: 1px solid #f1f2fe;
  border-radius: 10px;
  cursor: pointer;
  background: ${({ expanded }) => (expanded ? "#f1f2fe" : "#fff")};
  :hover {
    background: #f1f2fe;
  }

  .avatar {
    transition: 0.4s;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
  .menu-arrow {
    transition: 0.4s;
    transform: ${({ expanded }) =>
      expanded ? "rotate(-90deg)" : "rotate(90deg)"};
  }
`;

const LoggedInAccountInfo: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const { address } = accountStore;
  const avatar = address && identityImg.create(address, { size: 24 * 3 });
  const [accountOpened, setAccountOpened] = useState<boolean>(false);

  const assetBalances = [...accountStore.assetBalances];
  return (
    <Root>
      <Tooltip
        config={{ placement: "bottom-end", trigger: "click" }}
        content={<WalletBalancesTooltip assetBalances={assetBalances} />}
      >
        <div className="balances">
          <BalanceIcon />
          <SizedBox width={8} />
          <Text>
            $&nbsp;
            {assetBalances
              .reduce((acc, b) => acc.plus(b.usdnEquivalent ?? "0"), BN.ZERO)
              .toFormat(2)}
          </Text>
        </div>
      </Tooltip>
      <SizedBox width={24} />
      <Tooltip
        config={{
          placement: "bottom-end",
          trigger: "click",
          onVisibleChange: setAccountOpened,
        }}
        content={<WalletActionsTooltip address={address!} />}
      >
        <AddressContainer expanded={accountOpened}>
          <img className="avatar" src={avatar!} alt="avatar" />
          <Text>{centerEllipsis(address ?? "", 6)}</Text>
          <SizedBox width={10} />
          <img src={arrowIcon} className="menu-arrow" alt="arrow" />
        </AddressContainer>
      </Tooltip>
    </Root>
  );
};
export default observer(LoggedInAccountInfo);
