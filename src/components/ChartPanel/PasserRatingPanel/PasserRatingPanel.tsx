import React, { useEffect } from "react";

import { Dataset, Season } from "../../../types";
import { getPasserRating, getStyledData } from "../utils";

export default ({
  seasons,
  setDatasets,
}: {
  seasons: Season[];
  setDatasets: (datasets: Dataset[]) => void;
}) => {
  useEffect(() => {
    setDatasets(
      seasons.map((season) => getStyledData(season, getPasserRating(season)))
    );
  }, [seasons]);

  return <div>Filters</div>;
};
