import React from "react";

import styled from "styled-components";

const LabelWrapper = styled.div<{ area: string }>`
  grid-area: ${(props) => props.area};
  justify-self: center;
  white-space: nowrap;
`;

const Label = styled.h5`
  margin: 0;
`;

const Cell = ({ area, label }: { area: string; label: string }) => {
  return (
    <LabelWrapper area={area}>
      <Label>{label}</Label>
    </LabelWrapper>
  );
};

export default Cell;
