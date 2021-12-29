import styled from "@emotion/styled";
import React from "react";
import { Column } from "@src/components/Flex";
import Text from "@components/Text";
import SizedBox from "@components/SizedBox";
import adv1 from "@src/assets/landing/adv1.svg";
import adv2 from "@src/assets/landing/adv1.svg";
import adv3 from "@src/assets/landing/adv1.svg";
import adv4 from "@src/assets/landing/adv1.svg";
interface IProps {}

const Wrapper = styled(Column)`
  align-items: center;
  background: #f1f2fe;
  width: 100%;
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 56px 16px 136px 16px;
  box-sizing: border-box;
  max-width: 1440px;
  //@media (min-width: 880px) {
  //  align-items: center;
  //  justify-content: center;
  //  padding: 72px 20px;
  //}
`;

const advantages = [
  {
    title: "Mega pools",
    subtitle:
      "Trade up to 10 tokens in one pool without extra fees and lower slippage risks. Any token can be exchanged to any other.",
    icon: adv1,
  },
  {
    title: "Portfolio pools",
    subtitle:
      "Create a custom trading pool and provide liquidity from your portfolio with any token which is suitable for you.",
    icon: adv2,
  },
  {
    title: "Fair routing",
    subtitle:
      "Suitable routing service between custom pools and AMM-exchanges on Waves — trade with the best fare.",
    icon: adv3,
  },
  {
    title: "Trading abonnements",
    subtitle:
      "Purchase abonnements with PUZZLE to pay less fees if you are a regular user.",
    icon: "",
  },
];

const Home: React.FC<IProps> = () => {
  return (
    <Wrapper>
      <Root>
        <Text style={{ color: "#7075E9", fontWeight: 500 }}>ABOUT</Text>
        <SizedBox height={8} />
        <Text size="large">Solving multiple pain points and market needs</Text>
      </Root>
    </Wrapper>
  );
};
export default Home;
