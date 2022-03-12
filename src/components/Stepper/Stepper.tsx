import styled from "@emotion/styled";
import React from "react";
import Step from "@components/Stepper/Step";

interface IProps {
  steps: string[];
  activeStep: number;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
`;

const RopeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 12px;
`;
const Rope = styled.div<{ done: boolean }>`
  width: 1px;
  height: 12px;
  background: ${({ done }) => (done ? "#F1F2FE" : "#C6C9F4")};
`;
const Stepper: React.FC<IProps> = ({ steps, activeStep }) => {
  return (
    <Root>
      {steps.map((name, index, array) => {
        const state =
          index === activeStep
            ? "current"
            : index > activeStep
            ? "next"
            : "previous";
        return (
          <>
            <Step
              title={name}
              state={state}
              index={index}
              key={index + name + "_step"}
            />
            {index !== array.length - 1 && (
              <RopeContainer>
                <Rope done={index >= activeStep} />
              </RopeContainer>
            )}
          </>
        );
      })}
    </Root>
  );
};
export default Stepper;
