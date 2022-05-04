import React from "react";

import styled from "styled-components";

import { Player } from "../../types";

import { SelectedOptionMixin } from "../shared";

interface PlayerOption extends Player {
  selected: boolean;
  onClick: (playerId: number) => void;
}

const LabelWrapper = styled.div`
  border-radius: 5px;
  padding: 5px;
  width: max-content;
`;

const OptionWrapper = styled.div<{ selected: boolean }>`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding: 5px;

  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  &:first-child {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  ${SelectedOptionMixin};
`;

const PicWrapper = styled.div<{ borderColor: string }>`
    background: #1a1919;
    border: ${({ borderColor }) => `5px solid ${borderColor}`};
  border-radius: 50%;
  height: 6vh;
  min-width: 6vh
  overflow: hidden;
  position: relative;
  width: 6vh;

`;

const PlayerPic = styled.img`
  border: ${({ borderColor }) => `5px solid ${borderColor}`};
  height: 7vh;
  left: 50%;
  position: absolute;
  transform: translate(-50%, 0);
`;

export default ({
  fullName,
  playerId,
  playerImage,
  selected,
  onClick,
}: PlayerOption) => {
  return (
    <OptionWrapper
      onClick={() => {
        onClick(playerId);
      }}
      selected={selected}
    >
      <PicWrapper borderColor={selected ? "#51ce51" : "#554b58"}>
        <PlayerPic src={playerImage} />
      </PicWrapper>
      <LabelWrapper>
        <h3 style={{ margin: 0 }}>{fullName}</h3>
      </LabelWrapper>
    </OptionWrapper>
  );
};
