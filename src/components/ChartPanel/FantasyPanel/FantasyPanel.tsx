import React, { useEffect } from "react";

import { Dataset, Season } from "../../../types";
import { getFantasyPoints, getStyledData } from "../utils";

export default ({
  seasons,
  setDatasets,
}: {
  seasons: Season[];
  setDatasets: (datasets: Dataset[]) => void;
}) => {
  useEffect(() => {
    setDatasets(
      seasons.map((season) => getStyledData(season, getFantasyPoints(season)))
    );
  }, [seasons]);

  return <div>Fantasy</div>;
};
