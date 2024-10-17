import { Role } from "../../types/role";

const KIVve: Role = {
  primary: [
    "Deckung",
    "Kopfball",
    "Tackling",
    "Stellungsspiel",
    "Kraft",
    "Sprunghoehe",
  ],
  secondary: ["Aggressivitaet", "Antizipation", "Konzentration", "Mut"],
  physis: "abwehr",
};

const KIVvo: Role = {
  primary: [
    "Kopfball",
    "Tackling",
    "Aggressivitaet",
    "Mut",
    "Stellungsspiel",
    "Kraft",
    "Sprunghoehe",
  ],
  secondary: ["Deckung", "Antizipation", "Konzentration"],
  physis: "abwehr",
};
const KIVru: Role = {
  primary: [
    "Deckung",
    "Tackling",
    "Antizipation",
    "Konzentration",
    "Stellungsspiel",
    "Schnelligkeit",
  ],
  secondary: ["Kopfball", "Mut", "Kraft", "Sprunghoehe"],
  physis: "abwehr",
};

export const KIV = {
  KIVve,
  KIVvo,
  KIVru,
};
