import styled from "@emotion/styled";
import React from "react";
import Home from "./Home/Home";
import About from "./About/About";
import TokensList from "./TokensList";
import Invest from "./Invest";
import Footer from "./Footer";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  a {
    text-decoration: none;
  }
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
