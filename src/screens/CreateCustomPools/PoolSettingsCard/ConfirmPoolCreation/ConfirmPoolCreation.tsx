import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";
import ShortCreationPoolInfo from "@screens/CreateCustomPools/PoolSettingsCard/ConfirmPoolCreation/ShortCreationPoolInfo";
import PoolCreationPayment from "@screens/CreateCustomPools/PoolSettingsCard/ConfirmPoolCreation/PoolCreationPayment";

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
      <ShortCreationPoolInfo />
      <SizedBox height={24} />
      <PoolCreationPayment />
      <SizedBox height={24} />
      <Button fixed disabled={!vm.canContinue} onClick={() => vm.setStep(1)}>
        Create a pool
      </Button>
    </Root>
  );
};
export default observer(ConfirmPoolCreation);
