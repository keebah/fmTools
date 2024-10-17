import { Role } from "../../types/role";

const IASun: Role = {
  primary: [
    "Ballannahme",
    "Dribbling",
    "Passen",
    "Technik",
    "OhneBall",
    "Antritt",
    "Balance",
    "Beweglichkeit",
  ],
  secondary: [
    "Abschluss",
    "Weitschuesse",
    "Antizipation",
    "Flair",
    "Nervenstaerke",
    "Uebersicht",
    "Schnelligkeit",
  ],
  physis: "angriff",
};

const IASan: Role = {
  primary: [
    "Abschluss",
    "Ballannahme",
    "Dribbling",
    "Technik",
    "OhneBall",
    "Antritt",
    "Balance",
    "Beweglichkeit",
  ],
  secondary: [
    "Passen",
    "Weitschuesse",
    "Antizipation",
    "Flair",
    "Nervenstaerke",
    "Schnelligkeit",
  ],
  physis: "angriff",
};

export const IAS = {
  IASun,
  IASan,
};
