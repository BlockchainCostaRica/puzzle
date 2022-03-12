import React from "react";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";
import { observer } from "mobx-react-lite";
import SelectsAssets from "./SelectAssets";
import PoolSettings from "./PoolSettings";

interface IProps {}

const PoolSettingsCard: React.FC<IProps> = () => {
  const vm = useCreateCustomPoolsVM();
  switch (vm.step) {
    case 0:
      return <SelectsAssets />;
    case 1:
      return <PoolSettings />;
    default:
      return null;
  }
};
export default observer(PoolSettingsCard);
