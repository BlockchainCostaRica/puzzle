import styled from "@emotion/styled";
import React from "react";
import Home from "@screens/Landing/Home/Home";
import About from "@screens/Landing/About/About";
import TokensList from "@screens/Landing/TokensList";
import Invest from "@screens/Landing/Invest";
import Footer from "@components/Footer";

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
      <TokensList />
      <Invest />
      <Footer />
    </Root>
  );
};
export default Landing;
