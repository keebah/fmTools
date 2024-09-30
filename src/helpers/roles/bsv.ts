import { Role } from "../../types/role";

const BSVve: Role = {
  primary: [
    "Deckung",
    "Kopfball",
    "Passen",
    "Tackling",
    "Nervenstaerke",
    "Stellungsspiel",
    "Kraft",
    "Sprunghoehe",
  ],
  secondary: [
    "Ballannahme",
    "Technik",
    "Aggressivitaet",
    "Antizipation",
    "Entscheidungen",
    "Konzentration",
    "Mut",
    "Uebersicht",
    "Schnelligkeit",
  ],
  physis: "mittelfeld",
};

const BSVvo: Role = {
  primary: ["Passen"],
  secondary: ["Abschluss"],
  physis: "mittelfeld",
};
const BSVru: Role = {
  primary: ["Passen"],
  secondary: ["Abschluss"],
  physis: "mittelfeld",
};

export const BSV = {
  BSVve,
  BSVvo,
  BSVru,
};
