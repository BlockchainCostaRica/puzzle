import React from "react";
import SizedBox from "@components/SizedBox";
import { Row } from "@components/Flex";
import Text from "@components/Text";
import Button from "@components/Button";
import { useStakingVM } from "@screens/Staking/StakingVM";
import TokenInput from "@components/TokenInput/TokenInput";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";
import Notification from "@components/Notification";
import { Link } from "react-router-dom";
import buildBuyTokenRoute from "@src/utils/buildBuyTokenRoute";

interface IProps {}

const Stake: React.FC<IProps> = () => {
  const { accountStore } = useStores();
  const vm = useStakingVM();
  const buyPuzzleRoute = buildBuyTokenRoute("trade", vm.puzzleToken.assetId);
  return (
    <>
      {accountStore.address != null && vm.puzzleBalance.balance?.eq(0) && (
        <React.Fragment>
          <Notification
            type="warning"
            text={
              <span>
                Your have low PUZZLE balance.{" "}
                <Link to={buyPuzzleRoute}>Buy PUZZLE</Link> to stake it.
              </span>
            }
          />
          <SizedBox height={24} />
        </React.Fragment>
      )}
      <TokenInput {...vm.tokenStakeInputInfo} />
      <SizedBox height={24} />
      <Row alignItems="center" justifyContent="space-between">
        <Text type="secondary">Transaction fee</Text>
        <Text textAlign="right">0.005 WAVES</Text>
      </Row>
      <SizedBox height={24} />
      <Button fixed onClick={vm.stake} disabled={!vm.canStake}>
        Stake Puzzle
      </Button>
    </>
  );
};
export default observer(Stake);
