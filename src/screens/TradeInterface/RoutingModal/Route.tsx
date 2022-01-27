import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";
import Token0Amount from "@screens/TradeInterface/RoutingModal/Token0Amount";
import { ISchemaRoute } from "@screens/TradeInterface/TradeVM";
import Asset from "./Asset";
import { ReactComponent as Arrow } from "@src/assets/icons/blackRightArrow.svg";

interface IProps extends ISchemaRoute, HTMLAttributes<HTMLDivElement> {
  token0Logo: string;
  isAmount0Empty?: boolean;
}

const Root = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 0;
`;

const Route: React.FC<IProps> = ({
  percent,
  token0Logo,
  exchanges,
  isAmount0Empty,
}) => {
  const per = percent.isInteger() ? percent.toFormat(0) : percent.toFormat(2);
  return (
    <Root>
      <Token0Amount
        percent={per}
        imgSrc={token0Logo}
        displayPercent={!isAmount0Empty}
      />
      {exchanges.map((item, index, array) => (
        <>
          <Asset {...item} key={index} />
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
