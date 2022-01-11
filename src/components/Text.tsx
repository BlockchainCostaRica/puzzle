import styled from "@emotion/styled";

type TTextType = "primary" | "secondary";
type TTextSize = "small" | "medium" | "large";

const Text = styled.div<{
  type?: TTextType;
  weight?: 400 | 500;
  size?: TTextSize;
}>`
  font-weight: ${({ weight }) => weight ?? 400};
  color: ${({ type }) => (type === "secondary" ? "#8082C5" : "#363870")};
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
