import styled from "@emotion/styled";
import React from "react";
import Card from "@components/Card";
import { observer } from "mobx-react-lite";
import Layout from "@components/Layout";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 16px;
  min-width: 100%;
  min-height: 100%;
  margin-bottom: 24px;
  margin-top: 40px;
  @media (min-width: 880px) {
    margin-top: 56px;
  }
`;

const Invest: React.FC<IProps> = () => {
  return (
    <Layout>
      <Root>
        <Card>хуй</Card>
      </Root>
    </Layout>
  );
};

export default observer(Invest);
