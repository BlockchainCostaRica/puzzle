import React from "react";
import Dialog from "@components/Dialog";

interface IProps {
  onClose: () => void;
  visible: boolean;
}

const ChangePoolModal: React.FC<IProps> = ({ ...rest }) => {
  return (
    <Dialog style={{ maxWidth: 360 }} title="Select a pool" {...rest}>
      choose poool
    </Dialog>
  );
};
export default ChangePoolModal;
