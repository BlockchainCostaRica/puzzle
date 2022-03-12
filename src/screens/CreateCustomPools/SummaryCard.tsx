import React from "react";
import styled from "@emotion/styled";
import Card from "@components/Card";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { observer } from "mobx-react-lite";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";
import { Row } from "@src/components/Flex";
import Divider from "@src/components/Divider";
import { Cell, Legend, Pie, PieChart } from "recharts";

interface IProps {}

const Root = styled.div`
  display: none;
  @media (min-width: calc(880px + 40px)) {
    display: flex;
  }
  flex-direction: column;
  margin-left: 40px;
`;

const COLORS = ["#00FEB5", "#C6C9F4", "#FFBB28", "#FF8042"];

const SummaryCard: React.FC<IProps> = () => {
  const vm = useCreateCustomPoolsVM();
  const data = vm.poolsAssets.reduce<{ name: string; value: number }[]>(
    (acc, { asset, share }) => [...acc, { name: asset.symbol, value: share }],
    []
  );

  return (
    <Root>
      <Text type="secondary" weight={500}>
        Summary
      </Text>
      <SizedBox height={8} />
      <Card style={{ width: 258 }} justifyContent="center" alignItems="center">
        <Row justifyContent="center">
          <PieChart width={110} height={300}>
            <Pie
              data={data}
              innerRadius={40}
              outerRadius={50}
              fill="#C6C9F4"
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend iconType="circle" iconSize={8} layout="centric" />
          </PieChart>
        </Row>
        <SizedBox height={24} />
        <Divider />
        <SizedBox height={14} />
        <Text type="secondary" fitContent>
          Max to provide
        </Text>
        <Text weight={500} fitContent>
          $0.00
        </Text>
      </Card>
    </Root>
  );
};
export default observer(SummaryCard);
