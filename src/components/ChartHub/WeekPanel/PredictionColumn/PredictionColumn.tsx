import React from "react";
import styled from "styled-components";

import { PredictorDataSet } from "../../../../types";
import { Cell } from "../../../shared/";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  justify-self: start;
`;

const TitleWrapper = styled.div`
  text-align: center;
  white-space: nowrap;
`;

const Prediction = styled.div<{ borderColor: string }>`
  display: grid;
  grid-template-areas: "Player" "Prediction";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  border: 5px solid ${(props) => props.borderColor};
  border-radius: 5px;
  padding: 5px;
`;

export default ({
  datasets,
  title,
}: {
  datasets: PredictorDataSet[];
  title: string;
}) => {
  return (
    <Wrapper>
      <TitleWrapper>
        <h4>{title}</h4>
      </TitleWrapper>
      {datasets.map((dataset, idx) => (
        <Prediction key={idx} borderColor={dataset.borderColor}>
          <Cell area="Player" label={dataset.label} />
          <Cell area="Prediction" label={dataset.data.toFixed(2)} />
        </Prediction>
      ))}
    </Wrapper>
  );
};
