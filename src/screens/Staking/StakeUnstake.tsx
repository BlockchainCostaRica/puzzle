import styled from "@emotion/styled";
import React, { useState } from "react";
import Card from "@components/Card";
import SwitchButtons from "@components/SwitchButtons";
import TokenInput from "@components/TokenInput/TokenInput";
import { observer } from "mobx-react-lite";
import { useStakingVM } from "@screens/Staking/StakingVM";
import { mainnetTokens } from "@src/constants/mainnetConfig";
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
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  return (
    <Root>
      <SwitchButtons
        values={["Stake", "Unstake"]}
        active={activeTab}
        onActivate={setActiveTab}
        border
      />
      <SizedBox height={24} />
      <TokenInput
        selectable={false}
        decimals={8}
        amount={vm.puzzleAmount}
        setAmount={vm.setPuzzleAmount}
        assetId={mainnetTokens.PUZZLE.assetId}
        balances={[]}
      />
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
