import { linearRegression, linearRegressionLine } from "simple-statistics";

import { Dataset, PredictorDataSet } from "../../../../types";

export default (datasets: Dataset[]): PredictorDataSet[] =>
  datasets
    .filter((dataset) => !dataset.label.includes("regression"))
    .map((dataset) => {
      const { data, borderColor, label } = dataset;
      const regressionObject = linearRegression(
        data.map(({ x, y }) => [parseInt(x.split(" ")[1]), y])
      );
      const predictedValue = linearRegressionLine(regressionObject)(
        parseInt(data[data.length - 1].x.split(" ")[1]) + 1
      );
      return {
        label: label,
        data: predictedValue,
        borderColor,
      };
    });
