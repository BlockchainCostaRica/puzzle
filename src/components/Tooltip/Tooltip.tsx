import styled from "@emotion/styled";
import React from "react";
import { TriggerType, usePopperTooltip } from "react-popper-tooltip";

interface IProps {
  trigger?: TriggerType;
  content: string | JSX.Element;
}

const Root = styled.div`
  display: flex;
  background: #ffffff;
  border-radius: 8px;
  max-width: 320px;
  width: max-content;
  box-sizing: border-box;
  padding: 8px 16px 12px;
  box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.06),
    0px 16px 28px rgba(0, 0, 0, 0.07);
`;
const Tooltip: React.FC<IProps> = ({
  children,
  content,
  trigger = "click",
}) => {
  const { getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ trigger, placement: "top" });
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
