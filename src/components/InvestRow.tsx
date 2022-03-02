import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";
import { Column, Row } from "@src/components/Flex";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import SquareTokenIcon from "@components/SquareTokenIcon";
import Skeleton from "react-loading-skeleton";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  logo?: string;
  topLeftInfo?: string;
  topRightInfo?: string;
  bottomLeftInfo?: string;
  bottomRightInfo?: string;
  withClickLogic?: boolean;
}

const Root = styled.div<{ withClickLogic?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  cursor: ${({ withClickLogic }) => (withClickLogic ? "pointer" : "default")};
  padding: 8px 24px;

  :hover {
    background: ${({ withClickLogic }) => withClickLogic && "#f1f2fe;"};
  }
`;
const DefaultIcon = styled.div`
  width: 40px;
  height: 40px;
  color: #f1f2fe;
  border: 1px solid #f1f2fe;
  border-radius: 8px;
`;
const InvestRow: React.FC<IProps> = ({
  logo,
  topLeftInfo,
  topRightInfo,
  bottomLeftInfo,
  bottomRightInfo,
  withClickLogic,
  ...rest
}) => {
  return (
    <Root withClickLogic={withClickLogic} {...rest}>
      <Row>
        {logo ? <SquareTokenIcon size="small" src={logo} /> : <DefaultIcon />}
        <SizedBox width={8} />
        <Column>
          <Text weight={500} size="medium">
            {topLeftInfo}
          </Text>
          <Text size="medium" type="secondary">
            {bottomLeftInfo}
          </Text>
        </Column>
      </Row>
      <Column alignItems="flex-end">
        <Text
          weight={500}
          size="medium"
          style={{ whiteSpace: "nowrap" }}
          textAlign="right"
        >
          {topRightInfo}
        </Text>
        <Text
          style={{ whiteSpace: "nowrap" }}
          textAlign="right"
          type="secondary"
          size="small"
        >
          {bottomRightInfo}
        </Text>
      </Column>
    </Root>
  );
};

export default InvestRow;

export const InvestRowSkeleton = () => (
  <Root>
    <Row>
      <DefaultIcon />
      <SizedBox width={8} />
      <Column>
        <Skeleton height={14} width={260} />
        <Skeleton height={14} width={260} />
      </Column>
    </Row>
  </Root>
);
