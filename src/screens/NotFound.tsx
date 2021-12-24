import styled from "@emotion/styled";
import React from "react";
import noPage from "@src/assets/404.svg";
import Text from "@components/Text";
import { Link } from "react-router-dom";
import { Row } from "@src/components/Flex";
import SizedBox from "@components/SizedBox";

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;
const Img = styled.img`
  max-width: 240px;
  height: auto;
  padding-bottom: 44px;
`;
const paths = [
  { title: "Explore", link: "" },
  { title: "Trade", link: "" },
  { title: "Invest", link: "" },
  { title: "Stake", link: "" },
];
const Path = styled(Link)`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #7075e9;
`;
const NotFound: React.FC<IProps> = () => {
  return (
    <Root>
      <Img src={noPage} alt="noPage" />
      <Text size="large">There is no such page</Text>
      <Text type="secondary" size="medium">
        But there are many other useful pages
      </Text>
      <SizedBox height={32} />
      <Row justifyContent="center">
        {paths.map((i, index) => (
          <>
            {index !== 0 && <SizedBox width={32} />}
            <Path to={i.link}>{i.title}</Path>
          </>
        ))}
      </Row>
    </Root>
  );
};
export default NotFound;
