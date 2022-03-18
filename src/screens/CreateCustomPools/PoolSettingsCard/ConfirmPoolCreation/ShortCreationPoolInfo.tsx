import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import Card from "@components/Card";
import { Column, Row } from "@components/Flex";
import SquareTokenIcon from "@components/SquareTokenIcon";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
const Tokens = styled.div`
  display: flex;
  max-width: 100%;
  flex-wrap: wrap;

  & > * {
    margin: 4px;
    margin-left: 0px;
  }
`;

const Tag = styled.div`
  background: #f1f2fe;
  border-radius: 6px;
  font-size: 12px;
  line-height: 16px;
  color: #363870;
  padding: 4px 8px;
`;
const ShortCreationPoolInfo: React.FC<IProps> = () => {
  const vm = useCreateCustomPoolsVM();
  return (
    <Root>
      <Text type="secondary" weight={500}>
        Your pool information
      </Text>
      <SizedBox height={8} />
      <Card style={{ width: "100%" }}>
        <Row>
          <SquareTokenIcon />
          <SizedBox width={8} />
          <Column>
            <Text weight={500}>Global Tokens Pool</Text>
            <Text type="secondary">Swap fees: 2%</Text>
          </Column>
        </Row>
        <SizedBox height={16} />
        <Tokens>
          {vm.poolsAssets.map((token) => (
            <Tag>
              <span>{token.asset.symbol}&nbsp;</span>
              <span style={{ color: "#8082C5" }}>{token.share}%</span>
            </Tag>
          ))}
        </Tokens>
      </Card>
    </Root>
  );
};
export default observer(ShortCreationPoolInfo);
