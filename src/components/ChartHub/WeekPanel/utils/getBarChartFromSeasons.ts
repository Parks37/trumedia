import { DataPoint, Dataset, Season } from "../../../../types";

import { getTeamColors } from "../../../shared";

export default (
  label: string,
  seasons: Season[],
  dataFunction: (Season) => DataPoint[]
): Dataset[] => {
  const playerMostRecentWeeks = seasons.reduce(
    (acc, season) => {
      const data = dataFunction(season);
      const playerAvg =
        data.reduce((acc, curr) => acc + curr.y, 0) / data.length;
      return {
        datasets: [
          ...acc.datasets,
          {
            label: season[0].fullName,
            data: [
              {
                x: label,
                y: data[data.length - 1].y,
              },
            ],
            backgroundColor: getTeamColors()[season[0].team].light,
            borderColor: getTeamColors()[season[0].team].dark,
          },
        ],
        leagueTotal: acc.leagueTotal + playerAvg,
      };
    },
    {
      datasets: [] as Dataset[],
      leagueTotal: 0,
    }
  );
  return [
    ...playerMostRecentWeeks.datasets,
    {
      label: "Season Avg for Selected Players",
      data: [
        {
          x: label,
          y: playerMostRecentWeeks.leagueTotal / seasons.length,
        },
      ],
      backgroundColor: "black",
    },
  ] as Dataset[];
};
