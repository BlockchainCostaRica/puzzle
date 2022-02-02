import React from "react";
import SizedBox from "@components/SizedBox";
import { Row } from "@components/Flex";
import Text from "@components/Text";
import Button from "@components/Button";
import { useStakingVM } from "@screens/Staking/StakingVM";
import TokenInput from "@components/TokenInput/TokenInput";
import { observer } from "mobx-react-lite";

interface IProps {}

const Stake: React.FC<IProps> = () => {
  const vm = useStakingVM();
  return (
    <>
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
