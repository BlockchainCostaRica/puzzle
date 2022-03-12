import styled from "@emotion/styled";
import React from "react";
import Card from "@components/Card";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Stepper from "@src/components/Stepper";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";
import { observer } from "mobx-react-lite";

interface IProps {}

const Root = styled.div`
  display: none;
  @media (min-width: calc(880px + 40px)) {
    display: flex;
  }
  flex-direction: column;
  margin-right: 40px;
`;

const CreatePoolsStepper: React.FC<IProps> = () => {
  const steps = [
    "Select the composition",
    "Set up a title and an icon",
    "Confirm pool creation",
    "Add your liquidity",
  ];
  const vm = useCreateCustomPoolsVM();

  return (
    <Root>
      <Text type="secondary" weight={500}>
        Steps
      </Text>
      <SizedBox height={8} />
      <Card style={{ width: 260, height: 180 }}>
        <Stepper activeStep={vm.step} steps={steps} />
      </Card>
    </Root>
  );
};
export default observer(CreatePoolsStepper);
