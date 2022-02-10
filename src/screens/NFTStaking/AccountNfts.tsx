import styled from "@emotion/styled";
import React from "react";
import { observer } from "mobx-react-lite";
import { useNFTStakingVM } from "@screens/NFTStaking/NFTStakingVM";
import Artefact from "@screens/NFTStaking/Artefact";
import Button from "@components/Button";
import { useStores } from "@stores";
import { ReactComponent as LinkIcon } from "@src/assets/icons/link.svg";
import { Row } from "@components/Flex";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import DetailsButton from "@components/DetailsButton";
import NoNfts from "@screens/NFTStaking/NoNfts";

interface IProps {}

const Root = styled.div`
  display: grid;
  row-gap: 16px;
  grid-template-columns: 1fr;
  @media (min-width: 604px) {
    grid-template-columns: repeat(auto-fill, 278px);
    column-gap: 16px;
  }
`;
const AccountNfts: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const vm = useNFTStakingVM();

  if (accountStore.address == null)
    return (
      <NoNfts
        text="Connect your wallet to see your NFTs"
        btnText="Connect wallet"
        onBtnClick={() => accountStore.setWalletModalOpened(true)}
      />
    );
  if (vm.accountArtworks.length === 0)
    return (
      <NoNfts
        text={`You have no NFT on your wallet yet.\nGo to the market tab to buy one.`}
        btnText="Go to Market"
        onBtnClick={() => vm.setNftDisplayState(0)}
      />
    );
  return (
    <Root>
      {vm.artworks.map((art, index) => (
        <Artefact
          key={index}
          {...art}
          buttons={
            <>
              <Button size="medium" fixed>
                Stake
              </Button>
              <DetailsButton style={{ marginLeft: 8 }}>
                <Row alignItems="center">
                  <LinkIcon />
                  <SizedBox width={8} />
                  <Text>View on SignArt</Text>
                </Row>
                <SizedBox height={20} />
                <Row alignItems="center">
                  <LinkIcon />
                  <SizedBox width={8} />
                  <Text>View on Waves Explorer</Text>
                </Row>
              </DetailsButton>
            </>
          }
        />
      ))}
    </Root>
  );
};
export default observer(AccountNfts);
