import styled from "@emotion/styled";
import React from "react";
import { observer } from "mobx-react-lite";
import { useNFTStakingVM } from "@screens/NFTStaking/NFTStakingVM";
import Artefact, { ArtefactSkeleton } from "@screens/NFTStaking/Artefact";
import Button from "@components/Button";
import { Loading } from "@components/Loading";
import useWindowSize from "@src/hooks/useWindowSize";

interface IProps {}

const Root = styled.div`
  display: grid;
  row-gap: 16px;
  grid-template-columns: repeat(auto-fill);
  @media (min-width: 880px) {
    grid-template-columns: repeat(auto-fill, 278px);
    column-gap: 16px;
  }
`;
const MarketNfts: React.FC<IProps> = () => {
  const vm = useNFTStakingVM();
  const { width } = useWindowSize();
  const arr = Array.from({ length: width && width > 880 ? 4 : 1 });

  return (
    <Root>
      {vm.artworks != null
        ? vm.artworks.map((art, index) => (
            <Artefact
              key={index}
              {...art}
              buttons={
                <a
                  style={{ width: "100%" }}
                  href={art.marketLink}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <Button size="medium" fixed>
                    Buy on SignArt
                  </Button>
                </a>
              }
            />
          ))
        : arr.map((v, index) => <ArtefactSkeleton key={index} />)}
    </Root>
  );
};
export default observer(MarketNfts);
