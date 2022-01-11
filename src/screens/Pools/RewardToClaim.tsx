import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import WhiteCard from "@screens/Pools/WhiteCard";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
`;

const RewardToClaim: React.FC<IProps> = () => {
  return (
    <Root>
      <Text weight={500} type="secondary">
        Reward to claim
      </Text>
      <SizedBox height={8} />
      <WhiteCard style={{ height: 300 }} />
    </Root>
  );
};
export default RewardToClaim;
