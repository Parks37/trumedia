import React, { useEffect, useState } from "react";

import Toast from "@wedgekit/toast";

import { Wrapper, GlobalStyle } from "./styled";

import { LineChart, PlayerSelector, WeekPanel } from "./components";

import { Player, Seasons } from "./types";

const App = () => {
  const [seasons, setSeasons] = useState<Seasons>({});
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [toastContent, setToastContent] = useState({
    header: "",
    message: "",
    statusCode: 0,
  });
  const loadData = async (body, response) => {
    const message = (await body).message;
    if (!response.ok) {
      setToastContent({
        header: "Error",
        message,
        statusCode: response.status,
      });
      return;
    }
    setPlayers(message.players);
    setSeasons(message.seasons);
    setSelectedPlayers([message.players[0].playerId]);
  };

  useEffect(() => {
    fetch("/.netlify/functions/getPlayerData").then((d) => {
      loadData(d.json(), d);
    });
  }, []);

  return (
    <div>
      <GlobalStyle />

      <Wrapper>
        <PlayerSelector
          players={players}
          selectedIds={selectedPlayers}
          onSelectOption={(newSelectedPlayers: number[]) => {
            setSelectedPlayers(newSelectedPlayers);
          }}
        />
        <LineChart
          seasons={selectedPlayers.map((playerId) => seasons[playerId])}
        />
        <WeekPanel
          seasons={selectedPlayers.map((playerId) => seasons[playerId])}
        />
      </Wrapper>

      {toastContent.statusCode !== 0 && (
        <Toast
          domainColors={{
            bg: "R400",
            icon: "N050",
          }}
          header={toastContent.header}
          icon="close"
          message={toastContent.message}
          remove={() => {
            setToastContent({ ...toastContent, statusCode: 0 });
          }}
        />
      )}
    </div>
  );
};

export default App;
