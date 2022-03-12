import React from "react";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";
import { observer } from "mobx-react-lite";
import SelectAssets from "./SelectAssets";
import ConfirmPoolCreation from "./ConfirmPoolCreation";
import TitleAndDomainPoolSetting from "./TitleAndDomailPoolSetting";

interface IProps {}

const PoolSettingsCard: React.FC<IProps> = () => {
  const vm = useCreateCustomPoolsVM();
  switch (vm.step) {
    case 0:
      return <SelectAssets />;
    case 1:
      return <TitleAndDomainPoolSetting />;
    case 2:
      return <ConfirmPoolCreation />;
    default:
      return null;
  }
};
export default observer(PoolSettingsCard);
