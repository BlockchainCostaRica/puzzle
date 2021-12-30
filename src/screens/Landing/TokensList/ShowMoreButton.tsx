import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";

interface IProps {
  onClick: () => void;
}

const Root = styled.tr`
  cursor: pointer;
`;

const TextButton = styled(Text)`
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

const ShowMoreButton: React.FC<IProps> = ({ onClick, children }) => {
  return (
    <Root onClick={onClick}>
      <td colSpan={3} style={{ width: "unset" }}>
        <TextButton weight={500} type="secondary">
          {children}
        </TextButton>
      </td>
    </Root>
  );
};
export default ShowMoreButton;
