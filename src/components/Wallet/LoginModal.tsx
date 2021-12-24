import React from "react";
import Dialog from "@components/Dialog";
import { LOGIN_TYPE } from "@stores/AccountStore";
import LoginType from "./LoginType";
import seed from "@src/assets/icons/seed.svg";
import email from "@src/assets/icons/email.svg";
import keeper from "@src/assets/icons/keeper.svg";

interface IProps {
  onClose: () => void;
  onSelect: (loginType: LOGIN_TYPE) => void;
}

const loginTypes = [
  {
    title: "Waves Exchange Email",
    icon: email,
    type: LOGIN_TYPE.SIGNER_EMAIL,
  },
  {
    title: "Waves Exchange Seed",
    icon: seed,
    type: LOGIN_TYPE.SIGNER_SEED,
  },
  {
    title: "Waves Keeper",
    icon: keeper,
    type: LOGIN_TYPE.KEEPER,
  },
];
const LoginModal: React.FC<IProps> = ({ onClose, onSelect }) => {
  return (
    <Dialog style={{ maxWidth: 360 }} onClose={onClose} title="Connect wallet">
      {loginTypes.map((t) => (
        <LoginType {...t} key={t.type} onClick={() => onSelect(t.type)} />
      ))}
    </Dialog>
  );
};
export default LoginModal;
