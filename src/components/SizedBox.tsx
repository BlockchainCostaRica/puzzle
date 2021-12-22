import React from "react";

const SizedBox: React.FunctionComponent<{
  width?: number;
  height?: number;
}> = ({ width, height }) => (
  <div style={{ width, height, display: "flex", flex: "0 0 auto" }} />
);

export default SizedBox;
