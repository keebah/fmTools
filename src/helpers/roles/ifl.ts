import { Role } from "../../types/role";

const IFLun: Role = {
  primary: ["Passen", "Technik", "Entscheidungen", "Antritt"],
  secondary: [
    "Ballannahme",
    "Dribbling",
    "Flanken",
    "Weitschuesse",
    "Nervenstaerke",
    "OhneBall",
    "Uebersicht",
    "Beweglichkeit",
    "Schnelligkeit",
  ],
  physis: "mittelfeld",
};

const IFLan: Role = {
  primary: [
    "Dribbling",
    "Passen",
    "Technik",
    "Entscheidungen",
    "OhneBall",
    "Antritt",
    "Beweglichkeit",
  ],
  secondary: [
    "Abschluss",
    "Ballannahme",
    "Flanken",
    "Weitschuesse",
    "Antizipation",
    "Flair",
    "Nervenstaerke",
    "Uebersicht",
    "Schnelligkeit",
  ],
  physis: "mittelfeld",
};

export const IFL = {
  IFLun,
  IFLan,
};
