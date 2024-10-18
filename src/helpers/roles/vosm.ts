import { Role } from "../../types/role";

const VOSMun: Role = {
  primary: [
    "Ballannahme",
    "Passen",
    "Technik",
    "Entscheidungen",
    "Nervenstaerke",
    "OhneBall",
    "Teamwork",
    "Uebersicht",
  ],
  secondary: ["Dribbling", "Antizipation", "Flair", "Beweglichkeit"],
  physis: "mittelfeld",
};

const VOSMan: Role = {
  primary: [
    "Ballannahme",
    "Dribbling",
    "Passen",
    "Technik",
    "Entscheidungen",
    "Nervenstaerke",
    "OhneBall",
    "Teamwork",
    "Uebersicht",
  ],
  secondary: ["Antizipation", "Flair", "Antritt", "Beweglichkeit"],
  physis: "mittelfeld",
};

export const VOSM = {
  VOSMun,
  VOSMan,
};
