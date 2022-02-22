import styled from "@emotion/styled";
import React from "react";
import Text from "@src/components/Text";

type ITab = {
  name: string;
  additionalInfo?: string | number;
};

interface IProps {
  tabs: ITab[];
  activeTab: number;
  setActive: (index: number) => void;
}

const Root = styled.div`
  display: flex;
  border-bottom: 1px solid #c6c9f4;
`;
const Tab = styled.div<{ active?: boolean }>`
  transition: all 0.3s ease;
  margin-right: 24px;
  padding-bottom: 12px;
  border-bottom: 4px solid #7075e9;
  cursor: pointer;
  border-bottom: ${({ active }) =>
    active ? "4px solid #7075e9" : "4px solid transparent"};
  margin-bottom: -1px;
  user-select: none;

  :hover {
    border-bottom: ${({ active }) => !active && "4px solid #c6c9f4"}
  }
}
`;
const Tabs: React.FC<IProps> = ({ tabs, activeTab, setActive }) => {
  return (
    <Root>
      {tabs.map(({ additionalInfo, name }, index) => (
        <Tab
          key={index}
          active={index === activeTab}
          onClick={() => setActive(index)}
        >
          <Text weight={500}>
            {name}
            {additionalInfo != null && additionalInfo !== 0 && (
              <span style={{ color: "#8082C5", marginLeft: 10 }}>
                {additionalInfo}
              </span>
            )}
          </Text>
        </Tab>
      ))}
    </Root>
  );
};
export default Tabs;
