import styled from "@emotion/styled";

type TButtonType = "primary" | "secondary";

const Button = styled.button<{ kind?: TButtonType }>`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
  height: 56px;
  background: ${({ kind }) => (kind === "secondary" ? "#fff" : "#7075e9")};
  border: 1px solid
    ${({ kind }) => (kind === "secondary" ? "#F1F2FE" : "#7075e9")};
  border-radius: 12px;
  box-shadow: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${({ kind }) => (kind === "secondary" ? "#363870" : "#ffffff")};
  width: 100%;
  :hover {
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
