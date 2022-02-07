import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import Card from "@components/Card";
import { Column } from "@src/components/Flex";
import eagle from "@src/assets/eagle.png";
import Button from "@components/Button";
import SizedBox from "@components/SizedBox";
import { useStores } from "@stores";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useStakingVM } from "@screens/Staking/StakingVM";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 24px;
`;
const Img = styled.img`
  height: 160px;
  width: 160px;
  margin: -24px;
  @media (min-width: 880px) {
    height: 176px;
    width: 176px;
    margin: -24px;
  }
`;
const Title = styled(Text)`
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
`;
const NFTStaking: React.FC = () => {
  const { accountStore } = useStores();
  const vm = useStakingVM();
  return (
    <Root>
      <Card
        type="dark"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Column mainAxisSize="stretch">
          <Title type="light">NFT Staking</Title>
          <Text type="light" style={{ maxWidth: 195 }}>
            Buy and stake NFTs to get APY boost up to{" "}
            {vm.stats == null ? "—" : vm.stats?.ultra.toFormat(2).concat(" %")}
          </Text>
          <SizedBox height={16} />
          <Link to={accountStore.ROUTES.ULTRASTAKE}>
            <Button kind="secondary" style={{ color: "#7075E9" }} size="medium">
              Go to NFT Staking
            </Button>
          </Link>
        </Column>
        <Img src={eagle} alt="eagle" />
      </Card>
    </Root>
  );
};
export default observer(NFTStaking);
