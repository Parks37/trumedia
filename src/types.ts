export type PlayerId = number;

export type Antecedent = {
  label: string;
  id: keyof PlayerStat;
};

export type Consequent = {
  label: string;
  id: keyof PlayerStat | "game";
};

export type DataPoint = {
  x: string;
  y: number;
};

export type Dataset = {
  label: string;
  data: DataPoint[];
  backgroundColor: string;
  borderColor: string;
  tension?: number;
  borderDash?: number[];
  pointRadius?: number;
};

export type Game = {
  playerId: PlayerId;
  fullName: string;
  playerImage: string;
  seasonYear: number;
  week: number;
  gameDate: string;
  team: string;
  teamImage: string;
  opponent: string;
  oponentImage: string;
  Att: number;
  Cmp: number;
  Sack: number;
  Int: number;
  PsYds: number;
  PsTD: number;
  Rush: number;
  RshYds: number;
  RshTD: number;
};

export type PlayerStat = Pick<
  Game,
  | "Att"
  | "Cmp"
  | "Sack"
  | "Int"
  | "PsYds"
  | "PsTD"
  | "Rush"
  | "RshYds"
  | "RshTD"
>;

export type Player = {
  playerId: PlayerId;
  fullName: string;
  playerImage: string;
};

export type Season = Game[];

export type Seasons = Record<PlayerId, Season>;
