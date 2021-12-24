import React from "react";
import styled from "@emotion/styled";

const Root = styled.div<{ type?: "info" | "error" | "success" }>`
  min-height: 72px;
  max-height: 150px;
  overflow-y: auto;
  width: 300px;
  background: #ffffff;
  border: 1px solid ${({ type }) => (type ? colorMap[type] : "transparent")};
  box-sizing: border-box;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  position: relative;
  padding: 15px;
  display: flex;
`;

const Text = styled.div`
  margin-left: 12px;
  font-family: Graphik LCG;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 14px;
  max-width: 80%;
  color: #000000;
`;

const AlertTemplate = ({ style, options, message, close }: any) => (
  <Root type={options.type} style={style}>
    {options.type === "info" && iconsMap.info}
    {options.type === "success" && iconsMap.success}
    {options.type === "error" && iconsMap.error}
    <Text>{message}</Text>
    <Close onClick={close} />
  </Root>
);

const colorMap = {
  info: "#FF9900",
  error: "#FF0000",
  success: "#00D709",
};

const Close: React.FC<React.HTMLProps<HTMLDivElement>> = ({ ...rest }) => (
  <svg
    style={{ cursor: "pointer", position: "absolute", top: 15, right: 15 }}
    {...(rest as any)}
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.292894 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292894 1.70711C-0.0976305 1.31658 -0.0976305 0.683418 0.292894 0.292893Z"
      fill="#393D43"
    />
  </svg>
);

const iconsMap = {
  info: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10ZM10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM6.5 12C5.94772 12 5.5 12.4477 5.5 13C5.5 13.5523 5.94772 14 6.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13C14.5 12.4477 14.0523 12 13.5 12H6.5ZM8.5 7.58081C8.5 8.40924 7.82843 9.08081 7 9.08081C6.17157 9.08081 5.5 8.40924 5.5 7.58081C5.5 6.75238 6.17157 6.08081 7 6.08081C7.82843 6.08081 8.5 6.75238 8.5 7.58081ZM14.5 7.58081C14.5 8.40924 13.8284 9.08081 13 9.08081C12.1716 9.08081 11.5 8.40924 11.5 7.58081C11.5 6.75238 12.1716 6.08081 13 6.08081C13.8284 6.08081 14.5 6.75238 14.5 7.58081Z"
        fill="#FF9900"
      />
    </svg>
  ),
  error: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM9.54818 13.0455C8.54517 13.2088 7.67729 13.783 7.20711 14.2531C6.81658 14.6437 6.18342 14.6437 5.79289 14.2531C5.40237 13.8626 5.40237 13.2294 5.79289 12.8389C6.48938 12.1424 7.7215 11.3166 9.22682 11.0715C10.7942 10.8164 12.5766 11.2085 14.2071 12.8389C14.5976 13.2294 14.5976 13.8626 14.2071 14.2531C13.8166 14.6437 13.1834 14.6437 12.7929 14.2531C11.6234 13.0836 10.4892 12.8923 9.54818 13.0455ZM8.5 7.58081C8.5 8.40924 7.82843 9.08081 7 9.08081C6.17157 9.08081 5.5 8.40924 5.5 7.58081C5.5 6.75238 6.17157 6.08081 7 6.08081C7.82843 6.08081 8.5 6.75238 8.5 7.58081ZM13 9.08081C13.8284 9.08081 14.5 8.40924 14.5 7.58081C14.5 6.75238 13.8284 6.08081 13 6.08081C12.1716 6.08081 11.5 6.75238 11.5 7.58081C11.5 8.40924 12.1716 9.08081 13 9.08081Z"
        fill="#FF0000"
      />
    </svg>
  ),
  success: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM5.79289 11.7049C6.18342 11.3144 6.81658 11.3144 7.20711 11.7049C7.67729 12.1751 8.54517 12.7493 9.54818 12.9125C10.4892 13.0657 11.6234 12.8745 12.7929 11.7049C13.1834 11.3144 13.8166 11.3144 14.2071 11.7049C14.5976 12.0955 14.5976 12.7286 14.2071 13.1192C12.5766 14.7496 10.7942 15.1417 9.22682 14.8866C7.7215 14.6415 6.48938 13.8156 5.79289 13.1192C5.40237 12.7286 5.40237 12.0955 5.79289 11.7049ZM8.5 7.58081C8.5 8.40924 7.82843 9.08081 7 9.08081C6.17157 9.08081 5.5 8.40924 5.5 7.58081C5.5 6.75238 6.17157 6.08081 7 6.08081C7.82843 6.08081 8.5 6.75238 8.5 7.58081ZM13 9.08081C13.8284 9.08081 14.5 8.40924 14.5 7.58081C14.5 6.75238 13.8284 6.08081 13 6.08081C12.1716 6.08081 11.5 6.75238 11.5 7.58081C11.5 8.40924 12.1716 9.08081 13 9.08081Z"
        fill="#00D709"
      />
    </svg>
  ),
};

export default AlertTemplate;