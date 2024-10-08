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
  physis: "abwehr",
};

const BSVvo: Role = {
  primary: [
    "Kopfball",
    "Passen",
    "Tackling",
    "Aggressivitaet",
    "Entscheidungen",
    "Mut",
    "Nervenstaerke",
    "Stellungsspiel",
    "Kraft",
    "Sprunghoehe",
  ],
  secondary: [
    "Ballannahme",
    "Deckung",
    "Technik",
    "Antizipation",
    "Konzentration",
    "Uebersicht",
  ],
  physis: "abwehr",
};
const BSVru: Role = {
  primary: [
    "Deckung",
    "Passen",
    "Tackling",
    "Antizipation",
    "Entscheidungen",
    "Konzentration",
    "Nervenstaerke",
    "Stellungsspiel",
    "Schnelligkeit",
  ],
  secondary: [
    "Ballannahme",
    "Kopfball",
    "Technik",
    "Mut",
    "Uebersicht",
    "Kraft",
    "Sprunghoehe",
  ],
  physis: "abwehr",
};

export const BSV = {
  BSVve,
  BSVvo,
  BSVru,
};
