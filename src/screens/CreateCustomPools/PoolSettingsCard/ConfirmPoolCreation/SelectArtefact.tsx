import styled from "@emotion/styled";
import React from "react";
import SquareTokenIcon from "@components/SquareTokenIcon";
import Text from "@components/Text";
import { Column, Row } from "@src/components/Flex";
import SizedBox from "@components/SizedBox";
import { ReactComponent as Arrow } from "@src/assets/icons/arrowDown.svg";

interface IProps {}

const Root = styled.div`
  display: flex;
  align-items: center;
`;

const SelectArtefact: React.FC<IProps> = () => {
  return (
    <Root>
      <Row>
        <SquareTokenIcon />
        <SizedBox width={8} />
        <Column>
          <Text weight={500}>Artefact is not selected</Text>
          <Text type="secondary">You have N artefacts</Text>
        </Column>
      </Row>
      <Arrow style={{ cursor: "pointer" }} />
    </Root>
  );
};
export default SelectArtefact;
