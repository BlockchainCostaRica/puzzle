import styled from "@emotion/styled";
import React from "react";

interface IProps extends React.HTMLProps<HTMLAnchorElement> {}

const Root = styled.a`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #7075e9;
  text-transform: uppercase;
`;

const NavigationTag: React.FC<IProps> = ({ children, href }) => {
  return <Root href={href}>{children}</Root>;
};
export default NavigationTag;
