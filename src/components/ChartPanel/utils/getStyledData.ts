import { linearRegression, linearRegressionLine } from "simple-statistics";

import { DataPoint, Dataset, Season } from "../../../types";

import { getTeamColors } from "../../shared";

export default (season: Season, data): Dataset[] => {
  const weekMax = data[data.length - 1].x;
  const regressionObject = linearRegression(data.map(({ x, y }) => [x, y]));
  const regressionLine = new Array(weekMax + 1).fill(0).map((_, i) => ({
    x: `Week ${i + 1}`,
    y: linearRegressionLine(regressionObject)(i + 1),
  }));
  return [
    {
      label: season[0].fullName,
      data: data.map(({ x, y }) => ({
        x: `Week ${x}`,
        y,
      })),
      borderColor: getTeamColors()[season[0].team].light,
      backgroundColor: getTeamColors()[season[0].team].dark,
    },
    {
      label: `${season[0].fullName} regression`,
      data: regressionLine,
      borderColor: getTeamColors()[season[0].team].light,
      backgroundColor: "transparent",
      borderDash: [5, 5],
      pointRadius: 0,
    },
  ];
};
