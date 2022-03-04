import styled from "@emotion/styled";

type TTextType = "primary" | "secondary" | "light" | "blue500" | "error";
type TTextSize = "small" | "medium" | "large";
type TTextAlign = "center" | "left" | "right" | "justify";

const Text = styled.div<{
  type?: TTextType;
  weight?: 400 | 500;
  size?: TTextSize;
  fitContent?: boolean;
  nowrap?: boolean;
  textAlign?: TTextAlign;
}>`
  width: ${({ fitContent }) => (fitContent ? "fit-content" : "100%")};
  font-weight: ${({ weight }) => weight ?? 400};
  white-space: ${({ nowrap }) => (nowrap ? "nowrap" : "unset")};
  text-align: ${({ textAlign }) => textAlign ?? "default"};
  ${({ type }) =>
    (() => {
      switch (type) {
        case "primary":
          return "color: #363870;";
        case "secondary":
          return "color: #8082C5;";
        case "blue500":
          return "color: #7075E9;";
        case "light":
          return "color: #ffffff;";
        case "error":
          return "color: #ED827E;";
        default:
          return "color: #363870;";
      }
    })()}
  ${({ size }) =>
    (() => {
      switch (size) {
        case "small":
          return "font-size: 12px; line-height: 16px;";
        case "medium":
          return "font-size: 14px; line-height: 20px;";
        case "large":
          return "font-size: 32px;line-height: 40px;";
        default:
          return "font-size: 16px; line-height: 24px;";
      }
    })()}
`;

export default Text;
