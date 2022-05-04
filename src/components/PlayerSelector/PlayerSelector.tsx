import React from "react";

import styled from "styled-components";

import { hexToRGBA } from "@wedgekit/color";

import PlayerOption from "./PlayerOption";

import { Player } from "../../types";

type Props = {
  players: Player[];
  onSelectOption: (selectedPlayers: number[]) => void;
  selectedIds: number[];
};

const Wrapper = styled.div`
  background: ${hexToRGBA("#5f5f7d", 0.25)};
  border-radius: 5px;
  border: 5px solid ${hexToRGBA("#131014", 0.5)};
  display: flex;
  flex-direction: column;
  gap: 5px;
  grid-area: PlayerSelector;
  height: max-content;
`;

export default ({ players, onSelectOption, selectedIds }: Props) => {
  const handleSelect = (playerId: number) => {
    if (selectedIds.includes(playerId)) {
      onSelectOption(selectedIds.filter((id) => id !== playerId));
    } else {
      onSelectOption([...selectedIds, playerId]);
    }
  };

  return (
    <Wrapper>
      {players.map((player) => (
        <PlayerOption
          {...player}
          selected={selectedIds.includes(player.playerId)}
          onClick={handleSelect}
        />
      ))}
    </Wrapper>
  );
};
