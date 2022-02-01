import styled from "@emotion/styled";
import React from "react";
import Button from "@components/Button";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoggedInRewardInfo: React.FC<IProps> = () => {
  return (
    <Root>
      <Button fixed>Claim reward</Button>
    </Root>
  );
};
export default LoggedInRewardInfo;
