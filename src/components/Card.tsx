import styled from "@emotion/styled";

const Card = styled.div<{ maxWidth?: number }>`
  display: flex;
  flex-direction: column;
  max-width: ${({ maxWidth }) => `${maxWidth}px` ?? "100%"};
  width: 100%;
  background: #ffffff;
  border: 1px solid #f1f2fe;
  border-radius: 16px;
  padding: 16px;
  box-sizing: border-box;
  @media (min-width: 560px) {
    padding: 32px;
  }
`;
export default Card;
