import styled from "@emotion/styled";
import React from "react";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import Button from "@components/Button";
import { Column, Row } from "@src/components/Flex";
import DetailsButton from "@components/DetailsButton";
import { ReactComponent as LinkIcon } from "@src/assets/icons/link.svg";

interface IProps {
  name: string;
  src: string;
  price: string;
  boostAPY: number;
  isInOwn?: boolean;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 8px;
  width: fit-content;
  border-radius: 16px;
`;
const Img = styled.img`
  border: 1px solid #f1f2fe;
  border-radius: 12px;
  width: 262px;
  height: 262px;
`;
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;
const Buttons = styled.div`
  display: flex;
  //flex-direction: column;
  //padding: 16px;
`;

const NFTCard: React.FC<IProps> = ({ src, price, boostAPY, name, isInOwn }) => {
  return (
    <Root>
      <Img src={src} alt="nft" />
      <Bottom>
        <Row mainAxisSize="stretch" justifyContent="space-between">
          <Column>
            <Text>{name}</Text>
            <Text type="secondary">{boostAPY} boost APY</Text>
          </Column>
          <Column>
            <Text type="secondary">Floor price</Text>
            <Text type="secondary">{price}</Text>
          </Column>
        </Row>
        <SizedBox height={16} />
        <Buttons>
          <Button size="medium" fixed>
            Buy on SignArt
          </Button>
          {isInOwn && (
            <DetailsButton style={{ marginLeft: 8 }}>
              <Row alignItems="center">
                <LinkIcon />
                <SizedBox width={8} />
                <Text>View on SignArt</Text>
              </Row>
              <SizedBox height={20} />
              <Row alignItems="center">
                <LinkIcon />
                <SizedBox width={8} />
                <Text>View on Waves Explorer</Text>
              </Row>
            </DetailsButton>
          )}
        </Buttons>
      </Bottom>
    </Root>
  );
};
export default NFTCard;
