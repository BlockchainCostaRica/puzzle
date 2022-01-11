import styled from "@emotion/styled";

interface IProps {
  type?: "primary" | "default";
}

const Tag = styled.div<IProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  height: 24px;
  padding: 0 8px;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 16px;
  color: ${({ type }) => (type === "primary" ? "#fff" : "#363870")};
  background: ${({ type }) => (type === "primary" ? "#7075E9" : "#F1F2FE")};
  max-width: fit-content;
  border: none;
`;

export default Tag;
