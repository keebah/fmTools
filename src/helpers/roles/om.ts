import { Role } from "../../types/role";

const OMun: Role = {
  primary: [
    "Ballannahme",
    "Passen",
    "Technik",
    "Weitschuesse",
    "Antizipation",
    "Entscheidungen",
    "Flair",
    "OhneBall",
  ],
  secondary: ["Dribbling", "Nervenstaerke", "Uebersicht", "Beweglichkeit"],
  physis: "mittelfeld",
};

const OMan: Role = {
  primary: [
    "Ballannahme",
    "Dribbling",
    "Passen",
    "Technik",
    "Weitschuesse",
    "Antizipation",
    "Entscheidungen",
    "Flair",
    "OhneBall",
  ],
  secondary: ["Abschluss", "Nervenstaerke", "Uebersicht", "Beweglichkeit"],
  physis: "mittelfeld",
};

export const OM = {
  OMun,
  OMan,
};
