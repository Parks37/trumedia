import React from "react";

import styled from "styled-components";

import { hexToRGBA } from "@wedgekit/color";

const Wrapper = styled.div<{ borderColor: string }>`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas:
    " Player Player Player "
    " LowLabel MeanLabel HighLabel "
    " Low   Mean    High    "
    " LowWeek .     HighWeek ";
  border: 5px solid ${(props) => props.borderColor};
  padding: 5px;
  grid-gap: 5px;
`;

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

import { Dataset } from "../../../types";

export default ({ dataset }: { dataset: Dataset }) => {
  const rawHighValue = Math.max(
    ...dataset.data.map((dataPoint) => dataPoint.y)
  );
  const lowWeek = dataset.data.findIndex(
    (dataPoint) => dataPoint.y === rawHighValue
  );
  const rawLowValue = Math.min(...dataset.data.map((dataPoint) => dataPoint.y));
  const highWeek = dataset.data.findIndex(
    (dataPoint) => dataPoint.y === rawLowValue
  );

  return (
    <Wrapper borderColor={dataset.borderColor}>
      <Cell area="Player" label={dataset.label} />
      <Cell area="LowLabel" label="Low" />
      <Cell area="MeanLabel" label="Mean" />
      <Cell area="HighLabel" label="High" />
      <Cell area="Low" label={rawLowValue.toFixed(2)} />
      <Cell
        area="Mean"
        label={(
          dataset.data.reduce((acc, dataPoint) => acc + dataPoint.y, 0) /
          dataset.data.length
        ).toFixed(2)}
      />
      <Cell area="High" label={rawHighValue.toFixed(2)} />
      <Cell area="LowWeek" label={`Week ${lowWeek.toString()}`} />
      <Cell area="HighWeek" label={`Week ${highWeek.toString()}`} />
    </Wrapper>
  );
};
