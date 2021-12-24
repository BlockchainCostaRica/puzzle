import styled from "@emotion/styled";
import React from "react";
import Text from "@components/Text";
import { Navigate } from "react-router-dom";
import { ROUTES } from "@src/App";
interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const NotFound: React.FC<IProps> = () => {
  return <Navigate to={ROUTES.ROOT} />;
  return (
    <Root>
      <Text size="large">Page not found</Text>
    </Root>
  );
};
export default NotFound;
