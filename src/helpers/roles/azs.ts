import { Role } from "../../types/role";

const AZSun: Role = {
  primary: ["Kopfball", "Mut", "Teamwork", "Kraft", "Sprunghoehe"],
  secondary: [
    "Ballannahme",
    "Flanken",
    "Antizipation",
    "Einsatzfreude",
    "OhneBall",
    "Ausdauer",
    "Balance",
  ],
  physis: "mittelfeld",
};

const AZSan: Role = {
  primary: ["Kopfball", "Mut", "OhneBall", "Kraft", "Sprunghoehe"],
  secondary: [
    "Abschluss",
    "Ballannahme",
    "Flanken",
    "Antizipation",
    "Einsatzfreude",
    "Teamwork",
    "Ausdauer",
    "Balance",
  ],
  physis: "mittelfeld",
};

export const AZS = {
  AZSun,
  AZSan,
};
