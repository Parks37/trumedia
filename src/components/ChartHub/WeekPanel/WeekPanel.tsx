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
  display: flex;
  flex-direction: column;
`;

const ChartRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  flex: 1;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const AreaWrapper = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
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
        {seasons.length > 0 ? (
          <>
            <AreaWrapper area="Chart1">
              {selectedTab === "getWeekSummary" ? (
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
              ) : (
                <PredictionColumn
                  datasets={getPredictionFromSeasons(
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
                  title="Passing Yards per Attempt"
                />
              )}
            </AreaWrapper>
            <AreaWrapper area="Chart2">
              {selectedTab === "getWeekSummary" ? (
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
              ) : (
                <PredictionColumn
                  datasets={getPredictionFromSeasons(
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
                  title="Completion Percentage"
                />
              )}
            </AreaWrapper>
            <AreaWrapper area="Chart3">
              {selectedTab === "getWeekSummary" ? (
                <BarChart
                  datasets={getBarChartDataFromLineChartData(datasets, title)}
                  labels={[title]}
                />
              ) : (
                <PredictionColumn
                  datasets={getPredictionFromLineChartData(datasets)}
                  title={title}
                />
              )}
            </AreaWrapper>
          </>
        ) : (
          <div>
            Select a player to see their performance on the most recent week.
          </div>
        )}
      </ChartRow>
    </WeekPanel>
  );
};
