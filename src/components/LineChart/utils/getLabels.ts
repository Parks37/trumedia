import { Game, Seasons } from "../../../types";

export default (seasons: Seasons) => {
  const numberOfWeeks = Object.keys(seasons).reduce((acc, playerId) => {
    const weeks = seasons[playerId].map((game: Game) => {
      return game.week;
    });
    const seasonLastWeek = Math.max(...weeks);
    return Math.max(acc, seasonLastWeek);
  }, 0);
  const labels = "week "
    .repeat(numberOfWeeks)
    .split(" ")
    .map((week, idx) => `Week ${idx + 1}`);
  return labels;
};
