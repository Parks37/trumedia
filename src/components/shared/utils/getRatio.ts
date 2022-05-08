import { Antecedent, Consequent, Season } from "../../../types";

export default (
  season: Season,
  antecedent: Antecedent,
  consequent: Consequent
) =>
  season.map((game) => {
    const isRatio = consequent.id !== "game";

    const y = isRatio
      ? game[antecedent.id] / game[consequent.id]
      : game[antecedent.id];

    return {
      x: game.week,
      y,
    };
  });
