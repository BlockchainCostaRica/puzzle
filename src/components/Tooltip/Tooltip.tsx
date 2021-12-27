import styled from "@emotion/styled";
import React from "react";
import { usePopperTooltip } from "react-popper-tooltip";
import { Config } from "react-popper-tooltip/dist/types";

interface IProps {
  content: string | JSX.Element;
  config?: Config;
}

const Root = styled.div`
  display: flex;
  background: #ffffff;
  border-radius: 8px;
  max-width: 320px;
  width: max-content;
  box-sizing: border-box;
  padding: 8px 16px 12px;
  border: 1px solid #f1f2fe;
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.06),
    0px 16px 28px rgba(0, 0, 0, 0.07);
`;
const Tooltip: React.FC<IProps> = ({ children, content, config }) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ ...config });
  return (
    <div>
      <div ref={setTriggerRef} style={{ cursor: "pointer" }}>
        {children}
      </div>
      {visible && (
        <Root ref={setTooltipRef} {...getTooltipProps()}>
          {content}
        </Root>
      )}
    </div>
  );
};
export default Tooltip;
