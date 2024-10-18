import { Role } from "../../types/role";

const ZSun: Role = {
  primary: ["Kopfball", "Mut", "Teamwork", "Balance", "Kraft", "Sprunghoehe"],
  secondary: [
    "Abschluss",
    "Ballannahme",
    "Aggressivitaet",
    "Antizipation",
    "Entscheidungen",
    "Nervenstaerke",
    "OhneBall",
  ],
  physis: "angriff",
};

const ZSan: Role = {
  primary: [
    "Abschluss",
    "Kopfball",
    "Mut",
    "Nervenstaerke",
    "OhneBall",
    "Balance",
    "Kraft",
    "Sprunghoehe",
  ],
  secondary: [
    "Ballannahme",
    "Aggressivitaet",
    "Antizipation",
    "Entscheidungen",
    "Teamwork",
  ],
  physis: "angriff",
};

export const ZS = {
  ZSun,
  ZSan,
};
