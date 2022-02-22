import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";
import { Column } from "@components/Flex";
import Text from "@components/Text";
import BN from "@src/utils/BN";
import { useStores } from "@stores";
import copy from "copy-to-clipboard";
import { ReactComponent as Copy } from "@src/assets/icons/copy.svg";
import { ReactComponent as Link } from "@src/assets/icons/link.svg";
import { ReactComponent as Disconnect } from "@src/assets/icons/disconnect.svg";
import { observer } from "mobx-react-lite";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 8px;
`;
const Action = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  cursor: pointer;
  padding: 10px;
  height: 60px;

  .img {
    height: 24px;
    width: 24px;
  }
`;

const WalletModalHeader: React.FC<IProps> = () => {
  const { accountStore, notificationStore } = useStores();
  const assetBalances = [...accountStore.assetBalances];
  const handleCopyAddress = () => {
    copy(accountStore.address ?? "");
    notificationStore.notify("Your address was copied", {
      type: "success",
      title: "Congratulations!",
    });
  };
  const action = [
    {
      icon: <Copy className="img" />,
      text: "Copy address",
      onClick: handleCopyAddress,
    },
    {
      icon: <Link className="img" />,
      text: "View on Explorer",
      onClick: () => window.open("https://google.com", "_blank"),
    },
    {
      icon: <Disconnect className="img" />,
      text: "Disconnect",
      onClick: () => accountStore.logout(),
    },
  ];
  // const loginType = accountStore.loginType;
  return (
    <Root>
      {/*<SizedBox height={48} />*/}
      <Column alignItems="center">
        <Text fitContent type="light">
          Keeper: 3PA…4sZ
        </Text>
        <Text fitContent type="light" size="large">
          $&nbsp;
          {assetBalances
            .reduce((acc, b) => acc.plus(b.usdnEquivalent ?? "0"), BN.ZERO)
            .toFormat(2)}
        </Text>
        <SizedBox height={16} />
        <Actions>
          {action.map(({ text, icon, onClick }) => (
            <Action onClick={onClick}>
              {icon}
              <SizedBox height={6} />
              <Text type="light" fitContent>
                {text}
              </Text>
            </Action>
          ))}
        </Actions>
      </Column>
    </Root>
  );
};
export default observer(WalletModalHeader);
