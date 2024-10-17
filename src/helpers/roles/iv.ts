import { Role } from "../../types/role";

const IVve: Role = {
  primary: [
    "Deckung",
    "Kopfball",
    "Tackling",
    "Stellungsspiel",
    "Kraft",
    "Sprunghoehe",
  ],
  secondary: [
    "Aggressivitaet",
    "Antizipation",
    "Entscheidungen",
    "Konzentration",
    "Mut",
    "Nervenstaerke",
    "Schnelligkeit",
  ],
  physis: "abwehr",
};
const IVvo: Role = {
  primary: [
    "Kopfball",
    "Tackling",
    "Aggressivitaet",
    "Entscheidungen",
    "Mut",
    "Stellungsspiel",
    "Kraft",
    "Sprunghoehe",
  ],
  secondary: ["Deckung", "Antizipation", "Konzentration", "Nervenstaerke"],
  physis: "abwehr",
};

const IVru: Role = {
  primary: [
    "Deckung",
    "Tackling",
    "Antizipation",
    "Entscheidungen",
    "Konzentration",
    "Stellungsspiel",
    "Schnelligkeit",
  ],
  secondary: ["Kopfball", "Mut", "Nervenstaerke", "Kraft", "Sprunghoehe"],
  physis: "abwehr",
};

export const IV = {
  IVve,
  IVvo,
  IVru,
};
