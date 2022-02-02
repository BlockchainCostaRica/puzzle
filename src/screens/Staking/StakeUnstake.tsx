import styled from "@emotion/styled";
import React from "react";
import Card from "@components/Card";
import SwitchButtons from "@components/SwitchButtons";
import TokenInput from "@components/TokenInput/TokenInput";
import { observer } from "mobx-react-lite";
import { useStakingVM } from "@screens/Staking/StakingVM";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import { Row } from "@src/components/Flex";
import Button from "@components/Button";

interface IProps {}

const Root = styled(Card)`
  margin-top: 24px;
`;

const StakeUnstake: React.FC<IProps> = () => {
  const vm = useStakingVM();
  return (
    <Root>
      <SwitchButtons
        values={["Stake", "Unstake"]}
        active={vm.action}
        onActivate={vm.setAction}
        border
      />
      <SizedBox height={24} />
      <TokenInput {...vm.tokenInputInfo} />
      <SizedBox height={24} />
      <Row alignItems="center" justifyContent="space-between">
        <Text type="secondary">Transaction fee</Text>
        <Text textAlign="right">0.005 WAVES</Text>
      </Row>
      <SizedBox height={24} />
      <Button fixed>Stake Puzzle</Button>
    </Root>
  );
};
export default observer(StakeUnstake);
