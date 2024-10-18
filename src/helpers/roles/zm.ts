import { Role } from "../../types/role";

const ZMve: Role = {
  primary: [
    "Tackling",
    "Entscheidungen",
    "Konzentration",
    "Stellungsspiel",
    "Teamwork",
  ],
  secondary: [
    "Ballannahme",
    "Deckung",
    "Passen",
    "Technik",
    "Aggressivitaet",
    "Antizipation",
    "Einsatzfreude",
    "Nervenstaerke",
    "Ausdauer",
  ],
  physis: "mittelfeld",
};
const ZMun: Role = {
  primary: ["Ballannahme", "Passen", "Tackling", "Entscheidungen", "Teamwork"],
  secondary: [
    "Technik",
    "Antizipation",
    "Einsatzfreude",
    "Konzentration",
    "Nervenstaerke",
    "OhneBall",
    "Uebersicht",
    "Ausdauer",
  ],
  physis: "mittelfeld",
};

const ZMan: Role = {
  primary: ["Ballannahme", "Passen", "Entscheidungen", "OhneBall"],
  secondary: [
    "Tackling",
    "Technik",
    "Weitschuesse",
    "Antizipation",
    "Einsatzfreude",
    "Nervenstaerke",
    "Teamwork",
    "Uebersicht",
    "Antritt",
    "Ausdauer",
  ],
  physis: "mittelfeld",
};

export const ZM = {
  ZMve,
  ZMun,
  ZMan,
};
