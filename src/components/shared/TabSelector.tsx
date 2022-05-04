import React from "react";

import styled from "styled-components";

import { SelectedOptionMixin } from "../shared";

const TabRow = styled.div`
  align-items: stretch;
  border-bottom: 1px solid #3f3f4f;
  display: flex;
`;

const Tab = styled.div`
  text-align: center;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${SelectedOptionMixin};
  &:last-child {
    border-top-right-radius: 5px;
  }
  &:first-child {
    border-top-left-radius: 5px;
  }
`;

export default ({
  options,
  value,
  onSelection,
}: {
  options: string[];
  value: string;
  onSelection: (string) => void;
}) => {
  return (
    <TabRow>
      {options.map((option, index) => (
        <Tab
          key={index}
          selected={value === option}
          onClick={() => onSelection(option)}
        >
          <h4>{option}</h4>
        </Tab>
      ))}
    </TabRow>
  );
};
