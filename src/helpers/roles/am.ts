import { Role } from "../../types/role";

const AMve: Role = {
  primary: ["Passen"],
  secondary: ["Abschluss"],
  physis: "mittelfeld",
};
const AMun: Role = {
  primary: ["Passen"],
  secondary: ["Abschluss"],
  physis: "mittelfeld",
};

const AMan: Role = {
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

export const AM = {
  AMve,
  AMun,
  AMan,
};
