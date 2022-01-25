import styled from "@emotion/styled";

type TokenIconSize = "default" | "small";

const SquareTokenIcon = styled.img<{ size?: TokenIconSize }>`
  border: 1px solid #f1f2fe;
  border-radius: 12px;
  box-sizing: border-box;
  box-shadow: none;
  color: transparent;
  ${({ size }) =>
    (() => {
      switch (size) {
        case "small":
          return "width: 40px; height: 40px;";
        default:
          return "width: 56px; height: 56px;";
      }
    })()}
`;

export default SquareTokenIcon;
