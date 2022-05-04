import { Season } from "../../../types";

export default (season: Season) =>
  season.map((game) => {
    const completionPct = (game.Cmp / game.Att) * 100;
    const yardsPerAtt = game.PsYds / game.Att;
    const touchdownPct = (game.PsTD / game.Att) * 100;
    const interceptionPct = (game.Int / game.Att) * 100;

    const completionRating = Math.min((completionPct - 30) * 0.05, 2.375);
    const yardsRating = Math.min((yardsPerAtt - 3) * 0.25, 2.375);
    const touchdownRating = Math.min(touchdownPct * 0.2, 2.375);
    const interceptionRating = Math.max(2.375 - interceptionPct * 0.25, 0);

    return {
      x: `Week ${game.week}`,
      y:
        ((completionRating +
          yardsRating +
          touchdownRating +
          interceptionRating) /
          6) *
        100,
    };
  });
