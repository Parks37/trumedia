import React, { useEffect } from "react";
import styled from "styled-components";
import { Select } from "@wedgekit/select";

import { Dataset, PlayerStat, Season } from "../../../types";

import { getRatio, getStyledData } from "../utils";

const Wrapper = styled.div`
  padding: 40px;
`;

const statOptions = [
  {
    label: "Attempts",
    id: "Att",
  },
  {
    label: "Completions",
    id: "Cmp",
  },
  {
    label: "Sacks",
    id: "Sack",
  },
  {
    label: "Interceptions",
    id: "Int",
  },
  {
    label: "Passing Yards",
    id: "PsYds",
  },
  {
    label: "Passing Touchdowns",
    id: "PsTD",
  },
  {
    label: "Rushing attempts",
    id: "Rush",
  },
  {
    label: "Rushing Yards",
    id: "RshYds",
  },
  {
    label: "Rushing Touchdowns",
    id: "RshTD",
  },
];

export default ({
  seasons,
  setDatasets,
}: {
  seasons: Season[];
  setDatasets: (datasets: Dataset[]) => void;
}) => {
  const [[antecedent, consequent], setTerms] = React.useState<
    [keyof PlayerStat, keyof PlayerStat]
  >(["Cmp", "Att"]);

  useEffect(() => {
    setDatasets(
      seasons.map((season) =>
        getStyledData(season, getRatio(season, antecedent, consequent))
      )
    );
  }, [antecedent, consequent, seasons]);

  return (
    <Wrapper>
      <Select
        label="Antecedent"
        labelHidden
        options={statOptions}
        value={antecedent}
        onChange={(value) => setTerms([value as keyof PlayerStat, consequent])}
      />
      <h3 style={{ color: "white" }}>per</h3>
      <Select
        label="Consequent"
        labelHidden
        options={[...statOptions, { label: "Game", id: "Game" }]}
        value={consequent}
        onChange={(value) => setTerms([antecedent, value as keyof PlayerStat])}
      />
    </Wrapper>
  );
};
