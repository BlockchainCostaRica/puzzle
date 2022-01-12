import styled from "@emotion/styled";

const Card = styled.div<{
  maxWidth?: number;
  paddingDesktop?: string;
  paddingMobile?: string;
}>`
  display: flex;
  flex-direction: column;
  max-width: ${({ maxWidth }) => `${maxWidth}px` ?? "100%"};
  width: 100%;
  background: #ffffff;
  border: 1px solid #f1f2fe;
  border-radius: 16px;
  box-sizing: border-box;
  padding: ${({ paddingMobile }) => paddingMobile ?? "16px"};
  @media (min-width: 560px) {
    padding: ${({ paddingDesktop }) => paddingDesktop ?? "24px"};
  }
`;
export default Card;
