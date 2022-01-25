import React from "react";
import Button from "@components/Button";
import { observer } from "mobx-react-lite";

interface IProps {}

const SwapButton: React.FC<IProps> = () => {
  return (
    <Button disabled fixed>
      Swap
    </Button>
  );
};
export default observer(SwapButton);
