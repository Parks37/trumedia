import React from "react";

import styled from "styled-components";

import { hexToRGBA } from "@wedgekit/color";

import { TabSelector } from "../shared";
import { FantasyPanel } from "./FantasyPanel";
import { PasserRatingPanel } from "./PasserRatingPanel";
import { RatioPanel } from "./RatioPanel";
import { Dataset, Season } from "../../types";

const Wrapper = styled.div`
  background: ${hexToRGBA("#5f5f7d", 0.25)};
  border-radius: 5px;
  grid-area: ChartPanel;
`;

export default ({
  seasons,
  setDatasets,
}: {
  seasons: Season[];
  setDatasets: (datasets: Dataset[]) => void;
}) => {
  const [selectedTab, setSelectedTab] = React.useState("Raw Stats");
  return (
    <Wrapper>
      <TabSelector
        value={selectedTab}
        onSelection={setSelectedTab}
        options={["Raw Stats", "Fantasy Points", "Passer Rating"]}
      />
      {selectedTab === "Raw Stats" && (
        <RatioPanel seasons={seasons} setDatasets={setDatasets} />
      )}
      {selectedTab === "Fantasy Points" && (
        <FantasyPanel seasons={seasons} setDatasets={setDatasets} />
      )}
      {selectedTab === "Passer Rating" && (
        <PasserRatingPanel seasons={seasons} setDatasets={setDatasets} />
      )}
    </Wrapper>
  );
};
