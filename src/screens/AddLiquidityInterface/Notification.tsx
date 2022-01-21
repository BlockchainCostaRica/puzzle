import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";
import Text from "@components/Text";
import info from "@src/assets/icons/info.svg";
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
  align-items: start;
  justify-content: center;
`;

const Notification: React.FC<IProps> = ({ text, type, ...rest }) => {
  return (
    <Root warning={type === "warning"} {...rest}>
      <img src={info} alt="info" />
      <SizedBox width={10} />
      {typeof text === "string" ? <Text size="medium">{text}</Text> : text}
    </Root>
  );
};
export default Notification;
