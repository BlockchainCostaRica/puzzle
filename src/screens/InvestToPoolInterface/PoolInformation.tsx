import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import { Column } from "@src/components/Flex";
import SizedBox from "@components/SizedBox";
import WhiteCard from "@screens/InvestToPoolInterface/WhiteCard";
import { observer } from "mobx-react-lite";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;
const Card = styled(WhiteCard)`
  & > * {
    text-overflow: ellipsis;
    padding-bottom: 16px;
  }

  @media (min-width: 880px) {
    flex-direction: row;
    & > * {
      padding-bottom: unset;
    }
  }
`;

const Info: React.FC<{ text: string; value: string }> = ({ text, value }) => (
  <Column>
    <Text type="secondary" size="medium" style={{ paddingBottom: 4 }}>
      {text}
    </Text>
    <Text weight={500} size="large">
      {value}
    </Text>
  </Column>
);

const infornation = [
  { text: "Pool value", value: "$ 999,999" },
  { text: "Fees (24H)", value: "$ 1,234.00" },
  { text: "APY", value: "123.45 %" },
];
const PoolInformation: React.FC<IProps> = () => {
  // const { accountStore } = useStores();
  return (
    <Root>
      <Text weight={500} type="secondary">
        Pool Information
      </Text>
      <SizedBox height={8} />
      <Card>
        {infornation.map((i) => (
          <Info key={i.text} {...i} />
        ))}
      </Card>
    </Root>
  );
};
export default observer(PoolInformation);
