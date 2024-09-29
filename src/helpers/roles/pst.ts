import { Role } from "../../types/role";

const PSTve: Role = {
  primary: [
    "Aggressivitaet",
    "Antizipation",
    "Einsatzfreude",
    "Entscheidungen",
    "Mut",
    "Teamwork",
    "Antritt",
    "Ausdauer",
    "Schnelligkeit",
  ],
  secondary: [
    "Ballannahme",
    "Konzentration",
    "Nervenstaerke",
    "Balance",
    "Beweglichkeit",
    "Kraft",
  ],
  physis: "angriff",
};
const PSTun: Role = {
  primary: [
    "Aggressivitaet",
    "Antizipation",
    "Einsatzfreude",
    "Entscheidungen",
    "Mut",
    "Teamwork",
    "Antritt",
    "Ausdauer",
    "Schnelligkeit",
  ],
  secondary: [
    "Ballannahme",
    "Passen",
    "Konzentration",
    "Nervenstaerke",
    "OhneBall",
    "Balance",
    "Beweglichkeit",
    "Kraft",
  ],
  physis: "angriff",
};

const PSTan: Role = {
  primary: [
    "Aggressivitaet",
    "Antizipation",
    "Einsatzfreude",
    "Mut",
    "OhneBall",
    "Teamwork",
    "Antritt",
    "Ausdauer",
    "Schnelligkeit",
  ],
  secondary: [
    "Abschluss",
    "Ballannahme",
    "Entscheidungen",
    "Konzentration",
    "Nervenstaerke",
    "Balance",
    "Beweglichkeit",
    "Kraft",
  ],
  physis: "angriff",
};

export const PST = {
  PSTve,
  PSTun,
  PSTan,
};
