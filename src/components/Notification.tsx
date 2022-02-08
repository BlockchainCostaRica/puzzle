import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";
import Text from "@components/Text";
import info from "@src/assets/icons/info.svg";
import warning from "@src/assets/icons/warning.svg";
import SizedBox from "@components/SizedBox";
import { Column } from "./Flex";

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
      <Column>
        <img src={icon} alt="info" />
      </Column>
      <SizedBox width={10} />
      <Column justifyContent="center" mainAxisSize="stretch">
        {typeof text === "string" ? (
          <Text style={{ height: "100%" }} size="medium">
            {text}
          </Text>
        ) : (
          text
        )}
      </Column>
    </Root>
  );
};
export default Notification;
