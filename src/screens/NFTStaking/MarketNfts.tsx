import styled from "@emotion/styled";
import React from "react";
import { observer } from "mobx-react-lite";
import Artefact, { ArtefactSkeleton } from "@screens/NFTStaking/Artefact";
import Button from "@components/Button";
import { Anchor } from "@components/Anchor";
import { useStores } from "@stores";

interface IProps {}

const Root = styled.div`
  display: grid;
  row-gap: 16px;
  grid-template-columns: repeat(auto-fill);
  @media (min-width: 604px) {
    grid-template-columns: repeat(auto-fill, 278px);
    column-gap: 16px;
  }
`;
const MarketNfts: React.FC<IProps> = () => {
  const { nftStore } = useStores();

  return (
    <Root>
      {nftStore.artworks != null
        ? nftStore.artworks.map((art, index) => (
            <Artefact
              key={index}
              {...art}
              buttons={
                <Anchor style={{ width: "100%" }} href={art.marketLink}>
                  <Button size="medium" fixed>
                    Buy on SignArt
                  </Button>
                </Anchor>
              }
            />
          ))
        : Array.from({ length: 2 }).map((v, index) => (
            <ArtefactSkeleton key={index} />
          ))}
    </Root>
  );
};
export default observer(MarketNfts);
