import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";
import Text from "@components/Text";
import info from "@src/assets/icons/info.svg";
import warning from "@src/assets/icons/warning.svg";
import SizedBox from "@components/SizedBox";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  type: "warning" | "info";
  text: string | JSX.Element;
}

const Root = styled.div<{ warning?: boolean }>`
  display: flex;
  flex-direction: row;
  background: ${({ warning }) => (warning ? "#FCF4F1" : "#f1f2fe")};
  border-radius: 12px;
  padding: 18px;
  align-items: center;
  justify-content: flex-start;

  a {
    color: #6563dd;
    text-decoration: underline;
  }
`;

const Notification: React.FC<IProps> = ({ text, type, ...rest }) => {
  const icon = type === "warning" ? warning : info;
  return (
    <Root warning={type === "warning"} {...rest}>
      <img src={icon} alt="info" />
      <SizedBox width={10} />
      {typeof text === "string" ? <Text size="medium">{text}</Text> : text}
    </Root>
  );
};
export default Notification;
