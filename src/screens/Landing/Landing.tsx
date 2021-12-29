import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import landingImage from "@src/assets/landing/home-img.png";
import landingInvestImage from "@src/assets/landing/landing-invest-image.png";
import priceIcon from "@src/assets/landing/price-icon.svg";
import adv1 from "@src/assets/landing/adv1.png";
import adv2 from "@src/assets/landing/adv2.png";
import adv3 from "@src/assets/landing/adv3.png";
import adv4 from "@src/assets/landing/adv4.png";
import { loadMainData } from "@src/old_components/LandingModule";
import mediumLogo from "@src/assets/landing/medium-logo.svg";
import PriceRow from "@screens/Landing/PriceRow";
import Footer from "@components/Footer";
import "./styles.css";
import Home from "@screens/Landing/Home";
import Trade from "@screens/Landing/Trade/Trade";
import PuzzleToken from "@screens/Landing/PuzzleToken";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IToken {
  balance: number;
  contractAddress: string;
  decimals: number;
  logo: string;
  name: string;
  pool: string;
  price: number;
  share: number;
  tokenId: string;
}

const Landing: React.FC = () => {
  const [tokens, setTokens] = useState<IToken[] | null>(null);
  useEffect(() => {
    loadMainData().then((data) => setTokens(data.tokens));
  }, []);
  return (
    <Root>
      <Home />
      <Trade>
        <PuzzleToken />
      </Trade>
    </Root>
  );
};
export default Landing;
