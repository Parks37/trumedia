import React, { useEffect } from "react";

import styled from "styled-components";

import { hexToRGBA } from "@wedgekit/color";

import { TabSelector } from "../shared";
import { RatioSelects } from "./RatioSelects";
import { Antecedent, Consequent, Dataset, Season } from "../../types";
import {
  getFantasyPoints,
  getPasserRating,
  getRatio,
  getStyledData,
} from "./utils";
import SeasonSummary from "./SeasonSummary";

const Wrapper = styled.div`
  background: ${hexToRGBA("#5f5f7d", 0.25)};
  border-radius: 5px;
  grvalue-area: ChartPanel;
  height: min-content;
`;

const TabWrapper = styled.div`
  padding: 30px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const utilMap = {
  getRatio: getRatio,
  getFantasyPoints: getFantasyPoints,
  getPasserRating: getPasserRating,
};

const tabOptions = [
  {
    label: "Raw Stats",
    id: "getRatio",
  },
  {
    label: "Fantasy Points",
    id: "getFantasyPoints",
  },
  {
    label: "Passer Rating",
    id: "getPasserRating",
  },
];

export default ({
  datasets,
  seasons,
  setDatasets,
  setTitle,
}: {
  datasets: Dataset[];
  seasons: Season[];
  setDatasets: (datasets: Dataset[]) => void;
  setTitle: (title: string) => void;
}) => {
  const [selectedTab, setSelectedTab] = React.useState("getRatio");
  const [[antecedent, consequent], setTerms] = React.useState<
    [Antecedent, Consequent]
  >([
    {
      label: "Completions",
      id: "Cmp",
    },
    {
      label: "Attempts",
      id: "Att",
    },
  ]);

  const setNewTitle = (title: string) => {
    setSelectedTab(title);
    if (title === "getRatio") {
      setTitle(`${antecedent.label} per ${consequent.label}`);
    } else {
      setTitle(tabOptions.find((u) => u.id === title).label);
    }
  };

  const onTabSelect = (tab: string) => {
    setNewTitle(tab);
    setDatasets(
      seasons.reduce((acc, season) => {
        const data = getStyledData(
          season,
          utilMap[tab](season, antecedent, consequent)
        );
        return [...acc, ...data];
      }, [] as Dataset[])
    );
  };

  useEffect(() => {
    onTabSelect(selectedTab);
  }, [seasons, antecedent, consequent]);

  return (
    <Wrapper>
      <TabSelector
        value={selectedTab}
        onSelection={onTabSelect}
        options={tabOptions}
      />
      <TabWrapper>
        {selectedTab === "getRatio" && (
          <RatioSelects
            antecedent={antecedent}
            consequent={consequent}
            setTerms={setTerms}
          />
        )}
        {datasets.map(
          (dataset, i) =>
            !dataset.label.includes("regression") && (
              <SeasonSummary key={i} dataset={dataset} />
            )
        )}
      </TabWrapper>
    </Wrapper>
  );
};
