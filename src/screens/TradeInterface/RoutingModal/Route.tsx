import styled from "@emotion/styled";
import React from "react";
import Token0Amount from "@screens/TradeInterface/RoutingModal/Token0Amount";
import { ISchemaRoute } from "@screens/TradeInterface/TradeVM";
import Asset from "./Asset";
import { ReactComponent as Arrow } from "@src/assets/icons/blackRightArrow.svg";

interface IProps extends ISchemaRoute {
  token0Logo: string;
}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 0;
`;

const Route: React.FC<IProps> = ({ percent, token0Logo, exchanges }) => {
  const per = percent.isInteger() ? percent.toFormat(0) : percent.toFormat(2);
  return (
    <Root>
      <Token0Amount percent={per} imgSrc={token0Logo} />
      {exchanges.map((item, index, array) => (
        <>
          <Asset {...item} key={index} singleAsset={array.length === 1} />
          {array.length - 1 !== index && (
            <div style={{ position: "relative" }}>
              <Arrow
                height="100%"
                style={{ position: "absolute", right: "-8px" }}
              />
            </div>
          )}
        </>
      ))}
    </Root>
  );
};
export default Route;
