import styled from "@emotion/styled";

type TButtonType = "primary" | "secondary";
type TButtonSize = "medium" | "large";

const Button = styled.button<{
  kind?: TButtonType;
  size?: TButtonSize;
  fixed?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: ${({ kind }) => (kind === "secondary" ? "#fff" : "#7075e9")};
  border: 1px solid
    ${({ kind }) => (kind === "secondary" ? "#F1F2FE" : "#7075e9")};
  border-radius: 12px;
  box-shadow: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${({ kind }) => (kind === "secondary" ? "#363870" : "#ffffff")};
  width: ${({ fixed }) => (fixed ? "100%" : "fit-content")};

  ${({ size }) =>
    (() => {
      switch (size) {
        case "medium":
          return "padding: 0 20px; height: 40px;";
        case "large":
          return "padding: 0 24px; height: 56px;";
        default:
          return "padding: 0 24px; height: 56px;";
      }
    })()}
  :hover {
    cursor: pointer;
    background: ${({ kind }) => (kind === "secondary" ? "#F1F2FE" : "#6563dd")};
    border: 1px solid
      ${({ kind }) => (kind === "secondary" ? "#F1F2FE" : "#6563dd")};
  }

  :disabled {
    opacity: ${({ kind }) => (kind === "secondary" ? 0.4 : 1)};
    background: ${({ kind }) => (kind === "secondary" ? "#fff" : "#c6c9f4")};
    border: 1px solid
      ${({ kind }) => (kind === "secondary" ? "#F1F2FE" : "#c6c9f4")};
    cursor: not-allowed;
  }
`;

export default Button;
