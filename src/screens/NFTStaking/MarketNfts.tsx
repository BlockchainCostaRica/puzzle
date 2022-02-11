import styled from "@emotion/styled";
import React from "react";
import { observer } from "mobx-react-lite";
import { useNFTStakingVM } from "@screens/NFTStaking/NFTStakingVM";
import Artefact from "@screens/NFTStaking/Artefact";
import Button from "@components/Button";
import { Loading } from "@components/Loading";

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
  console.log(vm);
  const arr = Array.from({ length: 4 });
  return (
    <Root>
      {vm.artworks != null
        ? vm.artworks.map((art, index) => (
            <Artefact
              key={index}
              {...art}
              buttons={
                <Button
                  size="medium"
                  fixed
                  onClick={() => window.open(art.marketLink)}
                >
                  Buy on SignArt
                </Button>
              }
            />
          ))
        : arr.map((v, index) => (
            <Artefact
              key={index}
              buttons={
                <Button size="medium" fixed>
                  Loading <Loading />
                </Button>
              }
            />
          ))}
    </Root>
  );
};
export default observer(MarketNfts);
