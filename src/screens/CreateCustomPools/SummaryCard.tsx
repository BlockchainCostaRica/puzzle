import React from "react";
import styled from "@emotion/styled";
import Card from "@components/Card";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import { observer } from "mobx-react-lite";
import { useCreateCustomPoolsVM } from "@screens/CreateCustomPools/CreateCustomPoolsVm";
import { Row } from "@src/components/Flex";
import Divider from "@src/components/Divider";
import { Cell, Pie, PieChart } from "recharts";

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

const Legend = styled.div`
  display: flex;
  max-width: 155px;
  flex-wrap: wrap;
  justify-content: center;

  & > * {
    padding-right: 12px;
  }
`;
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
      <Card
        style={{ width: 258 }}
        justifyContent="center"
        alignItems="center"
        paddingDesktop="0px"
        paddingMobile="0px"
      >
        <PieChart width={110} height={150}>
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
        </PieChart>
        <Legend>
          {data.map(({ name }, index) => (
            <Row
              justifyContent="center"
              alignItems="center"
              mainAxisSize="fit-content"
            >
              <Dot color={COLORS[index % COLORS.length]} />
              <SizedBox width={4} />
              <Text size="small" type="secondary" fitContent>
                {name}
              </Text>
            </Row>
          ))}
        </Legend>
        <SizedBox height={24} />
        <Divider />
        <SizedBox height={14} />
        <Text type="secondary" fitContent>
          Max to provide
        </Text>
        <Text weight={500} fitContent>
          $0.00
        </Text>
        <SizedBox height={14} />
      </Card>
    </Root>
  );
};
export default observer(SummaryCard);

const Dot: React.FC<{ color: string }> = ({ color }) => (
  <svg
    width="9"
    height="8"
    viewBox="0 0 9 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="4.5" cy="4" r="4" fill={color} />
  </svg>
);
