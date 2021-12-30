import styled from "@emotion/styled";

const BackgroundWrapper = styled.div<{
  background: string;
  position?: "top" | "right" | "left" | "bottom" | "center";
  isColor?: boolean;
  backgroundSize?: "contain" | "cover";
  backgroundRepeat?: "no-repeat" | "cover";
}>`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${({ isColor, background }) =>
    isColor ? background : `url(${background}) bottom right`};
  background-size: ${({ backgroundSize }) => backgroundSize ?? "contain"};
  background-repeat: ${({ backgroundRepeat }) => backgroundRepeat ?? "unset"};
  width: 100%;
`;
export default BackgroundWrapper;
