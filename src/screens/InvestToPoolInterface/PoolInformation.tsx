import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import { Column } from "@src/components/Flex";
import SizedBox from "@components/SizedBox";
import _Card from "@components/Card";
import { observer } from "mobx-react-lite";
import { useInvestToPoolInterfaceVM } from "@screens/InvestToPoolInterface/InvestToPoolInterfaceVM";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
`;
const Card = styled(_Card)`
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

const Info: React.FC<{ text: string; value?: string }> = ({ text, value }) => {
  return (
    <Column>
      <Text type="secondary" size="medium" style={{ paddingBottom: 4 }}>
        {text}
      </Text>
      <Text style={{ fontSize: 20 }}>{value ? value : "-"}</Text>
    </Column>
  );
};

const CCard = styled(Card)`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 880px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const PoolInformation: React.FC<IProps> = () => {
  const vm = useInvestToPoolInterfaceVM();
  const data = vm.stats;
  return (
    <Root>
      <Text weight={500} type="secondary">
        Pool Information
      </Text>
      <SizedBox height={8} />
      <CCard>
        <Info
          text="Pool liquidity"
          value={data?.liquidity && "$ " + data?.liquidity.toFormat(2)}
        />
        <Info
          text="Fees (30D)"
          value={data?.fees && "$ " + data?.fees.toFormat(2)}
        />
        <Info text="APY" value={data?.apy && data?.apy.toFormat(2) + " %"} />
      </CCard>
    </Root>
  );
};
export default observer(PoolInformation);
