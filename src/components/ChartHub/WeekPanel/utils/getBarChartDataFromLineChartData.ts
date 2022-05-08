import { Dataset } from "../../../../types";

export default (datasets: Dataset[], label: string): Dataset[] => {
  const noRegressionDatases = datasets.filter(
    (dataset) => !dataset.label.includes("regression")
  ) as Dataset[];
  const playerMostRecentWeeks = noRegressionDatases.reduce(
    (acc, dataset, idx) => {
      const { data, ...rest } = dataset;
      const playerAvg =
        data.reduce((acc, curr) => acc + curr.y, 0) / data.length;

      return {
        datasets: [
          ...acc.datasets,
          {
            ...rest,
            backgroundColor: dataset.borderColor,
            data: [
              {
                x: label,
                y: dataset.data[dataset.data.length - 1].y,
              },
            ],
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
          y: playerMostRecentWeeks.leagueTotal / noRegressionDatases.length,
        },
      ],
      backgroundColor: "black",
    },
  ] as Dataset[];
};
