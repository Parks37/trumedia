import React from "react";

import styled from "styled-components";

import { Dataset } from "../../../../types";
import { Cell } from "../../../shared";

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
  border-radius: 5px;
`;

export default ({ dataset }: { dataset: Dataset }) => {
  const rawHighValue = Math.max(
    ...dataset.data.map((dataPoint) => dataPoint.y)
  );
  const highWeek = dataset.data.find(
    (dataPoint) => dataPoint.y === rawHighValue
  ).x;
  const rawLowValue = Math.min(...dataset.data.map((dataPoint) => dataPoint.y));
  const lowWeek = dataset.data.find(
    (dataPoint) => dataPoint.y === rawLowValue
  ).x;

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
      <Cell area="LowWeek" label={lowWeek} />
      <Cell area="HighWeek" label={highWeek} />
    </Wrapper>
  );
};
