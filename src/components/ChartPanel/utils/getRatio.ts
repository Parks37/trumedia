import { Game, Season, PlayerStat } from "../../../types";

export default (
  season: Season,
  antecedent: keyof PlayerStat,
  consequent: keyof PlayerStat | "Game"
) =>
  season.map((game) => ({
    x: `Week ${game.week}`,
    y:
      consequent === "Game"
        ? game[antecedent]
        : game[antecedent] / game[consequent],
  }));
