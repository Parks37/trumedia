import React, { useEffect } from "react";
import styled from "styled-components";
import { Select } from "@wedgekit/select";

import { Antecedent, Consequent, PlayerStat } from "../../../types";

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
  {
    label: "Game",
    id: "game",
  },
];

export default ({
  antecedent,
  consequent,
  setTerms,
}: {
  antecedent: Antecedent;
  consequent: Consequent;
  setTerms: ([Antecdent, Consequent]) => void;
}) => {
  return (
    <div>
      <Select
        label="Antecedent"
        labelHidden
        options={statOptions.filter((u) => u.id !== "game")}
        value={antecedent.id}
        onChange={(id) =>
          setTerms([statOptions.find((o) => o.id === id), consequent])
        }
      />
      <h3 style={{ color: "white" }}>per</h3>
      <Select
        label="Consequent"
        labelHidden
        options={statOptions}
        value={consequent.id}
        onChange={(id) =>
          setTerms([antecedent, statOptions.find((o) => o.id === id)])
        }
      />
    </div>
  );
};
