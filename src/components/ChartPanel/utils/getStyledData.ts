import { DataPoint, Season } from "../../../types";

import { getTeamColors } from "../../shared";

export default (season: Season, data: DataPoint[]) => ({
  label: season[0].fullName,
  data,
  borderColor: getTeamColors()[season[0].team].dark,
  backgroundColor: getTeamColors()[season[0].team].light,
  tension: 0.5,
});
