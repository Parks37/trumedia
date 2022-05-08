import React from "react";

import { Dataset, Season } from "../../types";
import ChartSettingsPanel from "./ChartSettingsPanel";
import LineChart from "./LineChart";
import WeekPanel from "./WeekPanel";

const ChartHub = ({ seasons }: { seasons: Season[] }) => {
  const [datasets, setDatasets] = React.useState<Dataset[]>([]);
  const [title, setTitle] = React.useState("");

  return (
    <>
      <LineChart title={title} datasets={datasets} seasons={seasons} />
      <ChartSettingsPanel
        datasets={datasets}
        seasons={seasons}
        setDatasets={setDatasets}
        setTitle={setTitle}
      />
      <WeekPanel title={title} datasets={datasets} seasons={seasons} />
    </>
  );
};

export default ChartHub;
