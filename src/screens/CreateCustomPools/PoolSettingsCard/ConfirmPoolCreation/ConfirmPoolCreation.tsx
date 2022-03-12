import styled from "@emotion/styled";
import React from "react";
import Card from "@components/Card";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ConfirmPoolCreation: React.FC<IProps> = () => {
  const vm = useCreateCustomPoolsVM();
  return (
    <Root>
      <Text type="secondary" weight={500}>
        Your pool information
      </Text>
      <SizedBox height={8} />
      <Card style={{ width: "100%" }}>helo</Card>
      <SizedBox height={24} />
      <Button fixed disabled={!vm.canContinue} onClick={() => vm.setStep(1)}>
        Create a pool
      </Button>
    </Root>
  );
};
export default observer(ConfirmPoolCreation);
