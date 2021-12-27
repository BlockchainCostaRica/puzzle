import styled from "@emotion/styled";
import React, { useState } from "react";
import { Row, Column } from "@components/Flex";
import { ReactComponent as BalanceIcon } from "@src/assets/icons/balance.svg";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import centerEllipsis from "@src/utils/centerEllipsis";
import arrowIcon from "@src/assets/icons/arrowRightBorderless.svg";
import * as identityImg from "identity-img";
import { useStores } from "@stores";
import Tooltip from "@components/Tooltip";
import Scrollbar from "@components/Scrollbar";
import Divider from "../Divider";
import copy from "copy-to-clipboard";
import { successMessage } from "@src/old_components/AuthInterface";
import BigNumber from "bignumber.js";
import { observer } from "mobx-react-lite";

interface IProps {}

const Root = styled(Row)`
  align-items: center;
  height: fit-content;
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

const WalletTooltip = styled(Column)`
  .menu-item {
    padding: 10px 0;
    cursor: pointer;
    :first-of-type {
      padding-top: 0;
    }
    :last-of-type {
      padding-bottom: 0;
    }
  }
  .divider {
    margin: 0 -16px;
    width: calc(100% + 32px);
  }
`;

const TokenBalanceRow = styled(Row)`
  align-items: center;
  justify-content: space-between;
  width: 210px;
  margin-bottom: 10px;
  .logo {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const LoggedInAccountInfo: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const { address } = accountStore;
  const avatar = address && identityImg.create(address, { size: 24 * 3 });
  const [accountOpened, setAccountOpened] = useState<boolean>(false);

  const handleCopyAddress = () => {
    address && copy(address);
    successMessage("Your address was copped");
  };

  const handleLogout = () => accountStore.logout();

  return (
    <Root>
      <Tooltip
        config={{ placement: "bottom-end", trigger: "click" }}
        content={
          <Scrollbar style={{ marginRight: -16 }}>
            <Column style={{ maxHeight: 320, width: 224 }}>
              <SizedBox height={8} />
              {accountStore.assetBalances
                .filter((b) => b.usdnEquivalent && b.usdnEquivalent.gt(0))
                .map((t) => (
                  <TokenBalanceRow key={t.assetId}>
                    <Row alignItems="center">
                      <img className="logo" alt={t.symbol} src={t.logo} />
                      <Text>{t.formatBalance}</Text>
                    </Row>
                    <Text style={{ whiteSpace: "nowrap" }} type="secondary">
                      {t.formatUsdnEquivalent}
                    </Text>
                  </TokenBalanceRow>
                ))}
            </Column>
          </Scrollbar>
        }
      >
        <div className="balances">
          <BalanceIcon />
          <SizedBox width={8} />
          <Text>
            $&nbsp;
            {accountStore.assetBalances
              .reduce(
                (acc, { usdnEquivalent }) => acc.plus(usdnEquivalent ?? 0),
                new BigNumber(0)
              )
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
        content={
          <WalletTooltip>
            <Text onClick={handleCopyAddress} className="menu-item">
              Copy address
            </Text>
            <a
              style={{ padding: "10px 0" }}
              rel="noopener noreferrer"
              target="_blank"
              href={`https://wavesexplorer.com/address/${address}`}
            >
              <Text>View in Waves Explorer</Text>
            </a>
            <Divider className="divider" />
            <Text onClick={handleLogout} className="menu-item">
              Disconnect
            </Text>
          </WalletTooltip>
        }
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
