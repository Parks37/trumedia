import React, { useState } from "react";
import styled from "styled-components";

import { hexToRGBA } from "@wedgekit/color";

import { Dataset, Season } from "../../../types";
import { TabSelector, getRatio } from "../../shared";

import BarChart from "./BarChart";
import PredictionColumn from "./PredictionColumn";
import {
  getBarChartFromSeasons,
  getBarChartDataFromLineChartData,
  getPredictionFromSeasons,
  getPredictionFromLineChartData,
} from "./utils";

const WeekPanel = styled.div`
  background: ${hexToRGBA("#5f5f7d", 0.25)};
  border-radius: 5px;
  grid-area: QuickFacts;
  overflow: hidden;
  height: 35vh;
  display: flex;
  flex-direction: column;
`;

const ChartRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  align-items: center;
  flex: 1;
`;

const tabOptions = [
  {
    label: "Week summary",
    id: "getWeekSummary",
  },
  {
    label: "Next week prediction",
    id: "getPrediction",
  },
];

export default ({
  datasets,
  seasons,
  title,
}: {
  datasets: Dataset[];
  seasons: Season[];
  title: string;
}) => {
  const [selectedTab, setSelectedTab] = useState("getWeekSummary");
  return (
    <WeekPanel>
      <TabSelector
        options={tabOptions}
        value={selectedTab}
        onSelection={setSelectedTab}
      />

      <ChartRow>
        {selectedTab === "getWeekSummary" ? (
          <>
            <BarChart
              datasets={getBarChartFromSeasons(
                "Passing Yards per Attempt",
                seasons,
                (season: Season) =>
                  getRatio(
                    season,
                    {
                      label: "Passing Yards",
                      id: "PsYds",
                    },
                    {
                      label: "Attempts",
                      id: "Att",
                    }
                  )
              )}
              labels={["Passing Yards per Attempt"]}
            />
            <BarChart
              datasets={getBarChartFromSeasons(
                "Completion Percentage",
                seasons,
                (season: Season) =>
                  getRatio(
                    season,
                    {
                      label: "Completions",
                      id: "Cmp",
                    },
                    {
                      label: "Attempts",
                      id: "Att",
                    }
                  )
              )}
              labels={["Completion Percentage"]}
            />
            <BarChart
              datasets={getBarChartDataFromLineChartData(datasets, title)}
              labels={[title]}
            />
          </>
        ) : (
          <>
            <PredictionColumn
              datasets={getPredictionFromSeasons(seasons, (season: Season) =>
                getRatio(
                  season,
                  {
                    label: "Passing Yards",
                    id: "PsYds",
                  },
                  {
                    label: "Attempts",
                    id: "Att",
                  }
                )
              )}
              title="Passing Yards per Attempt"
            />
            <PredictionColumn
              datasets={getPredictionFromSeasons(seasons, (season: Season) =>
                getRatio(
                  season,
                  {
                    label: "Completions",
                    id: "Cmp",
                  },
                  {
                    label: "Attempts",
                    id: "Att",
                  }
                )
              )}
              title="Completion Percentage"
            />
            <PredictionColumn
              datasets={getPredictionFromLineChartData(datasets)}
              title={title}
            />
          </>
        )}
      </ChartRow>
    </WeekPanel>
  );
};
