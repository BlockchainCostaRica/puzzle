import styled from "@emotion/styled";
import React from "react";
import { Column } from "@components/Flex";
import Text from "@components/Text";
import Divider from "@components/Divider";
import copy from "copy-to-clipboard";
import { successMessage } from "@src/old_components/AuthInterface";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";

interface IProps {
  address: string;
}

const Root = styled(Column)`
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

const WalletActionsTooltip: React.FC<IProps> = ({ address }) => {
  const { accountStore } = useStores();

  const handleCopyAddress = () => {
    address && copy(address);
    successMessage("Your address was copped");
  };
  const handleLogout = () => accountStore.logout();

  return (
    <Root>
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
    </Root>
  );
};
export default observer(WalletActionsTooltip);
