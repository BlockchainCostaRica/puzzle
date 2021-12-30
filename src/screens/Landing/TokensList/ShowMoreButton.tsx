import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";

interface IProps {
  onClick: () => void;
}

const Root = styled.tr`
  position: relative;
`;

const TextButton = styled(Text)`
  position: absolute;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ShowMoreButton: React.FC<IProps> = ({ onClick, children }) => {
  return (
    <Root onClick={onClick} style={{ position: "relative" }}>
      <td>
        <TextButton weight={500} type="secondary">
          {children}
        </TextButton>
      </td>
    </Root>
  );
};
export default ShowMoreButton;
