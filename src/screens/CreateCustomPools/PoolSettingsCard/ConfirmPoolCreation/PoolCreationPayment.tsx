import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import NoPayment from "./NoPayment";
import SelectArtefact from "@screens/CreateCustomPools/PoolSettingsCard/ConfirmPoolCreation/SelectArtefact";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const PoolCreationPayment: React.FC<IProps> = () => {
  const isTherePayment = true;
  return (
    <Root>
      <Text type="secondary" weight={500}>
        Payment for creation
      </Text>
      <SizedBox height={8} />
      <Card>{isTherePayment ? <SelectArtefact /> : <NoPayment />}</Card>
    </Root>
  );
};
export default observer(PoolCreationPayment);
