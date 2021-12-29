import styled from "@emotion/styled";
import React from "react";
import Home from "@screens/Landing/Home";
import About from "@screens/Landing/About";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Landing: React.FC = () => {
  return (
    <Root>
      <Home />
      <About />
    </Root>
  );
};
export default Landing;
