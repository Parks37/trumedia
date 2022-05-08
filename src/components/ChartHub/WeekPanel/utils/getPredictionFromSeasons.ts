import { linearRegression, linearRegressionLine } from "simple-statistics";

import { DataPoint, PredictorDataSet, Season } from "../../../../types";
import { getTeamColors } from "../../../shared";

export default (
  seasons: Season[],
  dataFunction: (Season) => DataPoint[]
): PredictorDataSet[] =>
  seasons.map((season) => {
    const data = dataFunction(season);
    const regressionObject = linearRegression(data.map(({ x, y }) => [x, y]));
    const predictedVale = linearRegressionLine(regressionObject)(
      data[data.length - 1].x + 1
    );
    return {
      label: season[0].fullName,
      data: predictedVale,
      borderColor: getTeamColors()[season[0].team].light,
    };
  });
