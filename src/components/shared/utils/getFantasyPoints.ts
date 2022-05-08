import { Season } from "../../../types";

export default (season: Season) =>
  season.map((game) => {
    const passingYardPts = game.PsYds * 0.04;
    const rushingYardPts = game.RshYds * 0.1;
    const passingTDPts = game.PsTD * 4;
    const rushingTDPts = game.RshTD * 6;
    const IntPts = game.Int * -2;

    const fantasyPoints =
      passingYardPts + rushingYardPts + passingTDPts + rushingTDPts + IntPts;
    return {
      x: game.week,
      y: fantasyPoints,
    };
  });
